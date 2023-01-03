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

function fetchContents(item, uris) {
  Promise.all(
    uris.map(uri =>
      fetch(uri)
        .then(data => data.json())
        .then(data => (data && data.length ? data[0].docmap : []))
    )
  ).then(contentDocmaps =>
    contentDocmaps
      .sort((a, b) => a.runningNumber > b.runningNumber)
      .forEach((docmap, idx) => {
        /* eslint no-param-reassign: ["error", { "props": false }] */
        item.contents[idx].src = docmap.content;
      })
  );
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

function parseStep(items, step) {
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
          src: 'Loading...',
          doi: output.doi,
        },
      ],
      date,
      type: TimelineItemTypes.Response,
    };
    items.push(item);
    fetchContents(item, [output.uri]);
    log('added response item', item);
    return;
  }

  const isReviewStep =
    isSingleOrMultiActionStep(step) &&
    step.actions.every(action =>
      hasSingleOutputOfType(action, DocmapOutputTypes.Review)
    );
  if (isReviewStep) {
    const contents = [];
    const dates = [];
    const uris = [];
    step.actions.forEach((action, idx) => {
      const output = action.outputs[0];
      const date = getDate(output.published);
      contents[idx] = {
        date,
        doi: output.doi,
        src: 'Loading...',
      };
      dates[idx] = date;
      uris[idx] = output.uri;
    });
    dates.sort();
    const item = {
      contents,
      date: dates[0],
      type: TimelineItemTypes.Reviews,
    };
    items.push(item);
    fetchContents(item, uris);
    log('added review item', item);
    return;
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
    items.push(...newItems);
    log('added review article items', newItems);
    return;
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
    items.push(item);
    log('added journal publication item', item);
    return;
  }
  log('no item added for step');
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

function parseDocmap(timeline, docmap) {
  log('parsing docmap', docmap);
  const steps = Array.from(stepsGenerator(docmap['first-step'], docmap.steps));
  if (timeline.groups.length === 0) {
    log('adding first group to empty timeline');
    timeline.groups.push(getFirstGroup(steps[0].inputs));
  }

  const items = [];
  for (const step of steps) {
    parseStep(items, step);
  }
  timeline.groups.push({
    publisher: {
      name: docmap.publisher.name,
      uri:
        docmap.publisher.uri ||
        docmap.publisher.url ||
        docmap.publisher.homepage,
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

function reduce(docmaps) {
  const timeline = {
    groups: [],
  };
  for (const docmap of docmaps) {
    parseDocmap(timeline, docmap);
  }
  log('sorting %d timeline groups', timeline.groups.length);
  timeline.groups.sort((a, b) => {
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
  });
  return timeline;
}

export async function parse(docmaps, config) {
  debug = config ? Boolean(config.debug) : debug;
  const unpackedDocmaps = docmaps.map(unpack);
  log('parsing %d docmaps', unpackedDocmaps.length, unpackedDocmaps);
  return {
    summary: '',
    timeline: reduce(unpackedDocmaps),
  };
}
