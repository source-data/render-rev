let debug = false;
function log(message, ...optionalParams) {
  if (debug) {
    // eslint-disable-next-line no-console
    console.log(message, ...optionalParams);
  }
}

function* stepsGenerator(idFirstStep, stepsById) {
  const visitedSteps = new Set();
  let idNextStep = idFirstStep;
  while (idNextStep in stepsById) {
    if (visitedSteps.has(idNextStep)) {
      log('loop detected, aborting step iterator at %s', idNextStep);
      return;
    }
    visitedSteps.add(idNextStep);
    const nextStep = stepsById[idNextStep];
    idNextStep = nextStep['next-step'];
    yield nextStep;
  }
}

function getDate(dateString) {
  const dateStamp = Date.parse(dateString);
  if (Number.isNaN(dateStamp)) {
    return null;
  }
  return new Date(dateStamp);
}

function getText(output) {
  const textContent = output.content.find(c => c.type === 'text');
  if (!textContent) {
    return null;
  }
  return textContent.text;
}

const TimelineItemTypes = {
  JournalPublication: 'journal-publication',
  Preprint: 'preprint-posted',
  Response: 'response',
  Reviews: 'reviews',
  ReviewArticle: 'review-article',
};
const DocmapOutputTypes = {
  JournalPublication: 'journal-publication',
  Response: 'author-response',
  Review: 'review',
  ReviewArticle: 'review-article',
};

async function parseStep(step) {
  log('parsing step', step);
  const isSingleActionStep = ({ actions }) => actions && actions.length === 1;
  const isSingleOrMultiActionStep = ({ actions }) =>
    actions && actions.length >= 1;

  const hasSingleOutputOfType = (action, expectedType) =>
    action.outputs &&
    action.outputs.length === 1 &&
    'type' in action.outputs[0] &&
    action.outputs[0].type === expectedType;

  const isResponseStep =
    isSingleActionStep(step) &&
    hasSingleOutputOfType(step.actions[0], DocmapOutputTypes.Response);
  if (isResponseStep) {
    const output = step.actions[0].outputs[0];
    const date = getDate(output.published);
    const item = {
      contents: [
        {
          date,
          doi: output.doi,
          src: getText(output),
        },
      ],
      date,
      type: TimelineItemTypes.Response,
    };
    log('added response item', item);
    return [item];
  }

  const isReviewStep =
    isSingleOrMultiActionStep(step) &&
    step.actions.every(action =>
      hasSingleOutputOfType(action, DocmapOutputTypes.Review)
    );
  if (isReviewStep) {
    const contents = step.actions
      .map(action => {
        const output = action.outputs[0];
        return {
          date: getDate(output.published),
          doi: output.doi,
          runningNumber: output.runningNumber,
          src: getText(output),
        };
      })
      .sort((a, b) => a.runningNumber - b.runningNumber);
    const earliestDate = contents.map(c => c.date).sort()[0];
    const item = {
      contents,
      date: earliestDate,
      type: TimelineItemTypes.Reviews,
    };
    log('added review item', item);
    return [item];
  }

  const isReviewArticleStep =
    isSingleOrMultiActionStep(step) &&
    step.actions.every(action =>
      hasSingleOutputOfType(action, DocmapOutputTypes.ReviewArticle)
    );
  if (isReviewArticleStep) {
    const newItems = step.actions.map(action => {
      const output = action.outputs[0];
      const content = output.content[0];
      return {
        date: getDate(output.published),
        doi: output.doi,
        type: TimelineItemTypes.ReviewArticle,
        uri: content.url,
      };
    });
    log('added review article items', newItems);
    return newItems;
  }

  const isJournalPublicationStep =
    isSingleActionStep(step) &&
    hasSingleOutputOfType(
      step.actions[0],
      DocmapOutputTypes.JournalPublication
    );
  if (isJournalPublicationStep) {
    const output = step.actions[0].outputs[0];
    const item = {
      date: getDate(output.published),
      doi: output.doi,
      type: TimelineItemTypes.JournalPublication,
      uri: output.uri,
    };
    log('added journal publication item', item);
    return [item];
  }
  log('no item added for step');
  return [];
}

const publishersByDoiPrefix = {
  10.1101: {
    name: 'bioRxiv',
    uri: 'https://www.biorxiv.org',
  },
  10.21203: {
    name: 'Research Square',
    uri: 'https://www.researchsquare.com',
  },
};
function getPublisher(input) {
  const doiPrefix = input.doi.split('/')[0];
  return (
    publishersByDoiPrefix[doiPrefix] || {
      name: null,
      uri: null,
    }
  );
}

function getFirstGroup(inputs) {
  const input = inputs[0];
  return {
    publisher: getPublisher(input),
    items: [
      {
        date: getDate(input.published),
        type: TimelineItemTypes.Preprint,
        uri: input.uri || input.url,
      },
    ],
  };
}

async function parseDocmapIntoGroups(timeline, docmap) {
  log('parsing docmap', docmap);
  const steps = Array.from(stepsGenerator(docmap['first-step'], docmap.steps));
  if (timeline.groups.length === 0) {
    log('adding first group to empty timeline');
    timeline.groups.push(getFirstGroup(steps[0].inputs));
  }

  const publisherUri =
    docmap.publisher.uri || docmap.publisher.url || docmap.publisher.homepage;
  const parsedSteps = await Promise.all(steps.map(parseStep));
  const items = parsedSteps.flat();
  timeline.groups.push({
    publisher: {
      name: docmap.publisher.name,
      peerReviewPolicy: docmap.publisher.peer_review_policy,
      uri: publisherUri,
    },
    items,
  });
}

function unpack(docmap) {
  if ('docmap' in docmap) {
    return docmap.docmap;
  }
  return docmap;
}

function compareTimelineGroups(a, b) {
  function extractDates(items) {
    return items
      .map(item => item.date)
      .filter(Boolean) // remove nulls, i.e. unknown dates
      .sort();
  }
  function extractTypes(items) {
    return new Set(items.map(item => item.type));
  }
  const datesInA = extractDates(a.items);
  const datesInB = extractDates(b.items);
  if (datesInA.length === 0 || datesInB.length === 0) {
    const itemTypesInA = extractTypes(a.items);
    const itemTypesInB = extractTypes(b.items);
    if (itemTypesInA.has(TimelineItemTypes.Preprint)) {
      return -1;
    }
    if (itemTypesInB.has(TimelineItemTypes.Preprint)) {
      return 1;
    }
    if (itemTypesInA.has(TimelineItemTypes.JournalPublication)) {
      return 1;
    }
    if (itemTypesInB.has(TimelineItemTypes.JournalPublication)) {
      return -1;
    }
    return 0;
  }

  const earliestDateInA = datesInA[0];
  const latestDateInA = datesInA.at(-1);

  const earliestDateInB = datesInB[0];
  const latestDateInB = datesInB.at(-1);

  if (latestDateInA < earliestDateInB) {
    return -1;
  }
  if (latestDateInB < earliestDateInA) {
    return 1;
  }
  return 0;
}

async function convertToTimeline(docmaps) {
  const timeline = {
    groups: [],
  };
  await Promise.all(
    docmaps.map(docmap => parseDocmapIntoGroups(timeline, docmap))
  );
  log('sorting %d timeline groups', timeline.groups.length);
  timeline.groups.sort(compareTimelineGroups);
  return timeline;
}

/**
 * Parse a list of docmaps that describe the review process of a preprint into a timeline.
 *
 * @param {Array} docmaps - A list of docmaps. All docmaps are treated as belonging to the same preprint.
 * @param {Object} config - [optional] A configuration object. The only currently supported option is `debug`, which enables logging if truthy.
 * @returns {Object} A timeline object.
 */
export async function parse(docmaps, config) {
  debug = config ? Boolean(config.debug) : debug;
  const unpackedDocmaps = docmaps.map(unpack);
  log('parsing %d docmaps', unpackedDocmaps.length, unpackedDocmaps);
  const timeline = await convertToTimeline(unpackedDocmaps);
  return {
    summary: '',
    timeline,
  };
}
