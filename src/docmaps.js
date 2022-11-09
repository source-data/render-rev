function* stepsGenerator(idFirstStep, stepsById) {
  let idNextStep = idFirstStep;
  while (idNextStep in stepsById) {
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
        .then(data => data[0].docmap)
    )
  ).then(contentDocmaps => {
    /* eslint no-param-reassign: ["error", { "props": false }] */
    item.contents = contentDocmaps
      .sort((a, b) => a.runningNumber > b.runningNumber)
      .map(docmap => docmap.content);
  });
}

function parseStep(items, step) {
  const { actions } = step;

  const isResponseStep =
    actions &&
    actions.length === 1 &&
    'type' in actions[0].outputs &&
    actions[0].outputs.type === 'author-response';
  if (isResponseStep) {
    const output = actions[0].outputs;
    const item = {
      contents: ['Loading...'],
      date: getDate(output.published),
      type: 'response',
    };
    items.push(item);
    fetchContents(item, [output.uri]);
  }

  const isReviewStep =
    actions &&
    actions.length >= 1 &&
    actions.every(
      action =>
        action.outputs &&
        action.outputs.length === 1 &&
        'type' in action.outputs[0] &&
        action.outputs[0].type === 'review'
    );
  if (isReviewStep) {
    const contents = [];
    const dates = [];
    const uris = [];
    actions.forEach((action, idx) => {
      contents[idx] = 'Loading...';
      const output = action.outputs[0];
      dates[idx] = getDate(output.published);
      uris[idx] = output.uri;
    });
    dates.sort();
    const item = {
      contents,
      date: dates[0],
      type: 'reviews',
    };
    items.push(item);
    fetchContents(item, uris);
  }

  const isReviewArticleStep =
    actions &&
    actions.length >= 1 &&
    actions.every(
      action =>
        action.outputs &&
        action.outputs.length === 1 &&
        'type' in action.outputs[0] &&
        action.outputs[0].type === 'review-article'
    );
  if (isReviewArticleStep) {
    items.push(
      ...actions.map(action => {
        const output = action.outputs[0];
        const content = output.content[0];
        return {
          date: getDate(output.published),
          type: 'review-article',
          uri: content.url,
        };
      })
    );
  }
}

const publishersByDoiPrefix = {
  10.1101: {
    name: 'bioRxiv',
    uri: 'https://www.biorxiv.org',
  },
  10.21203: {
    name: 'Research Square',
    uri: 'https://www.biorxiv.org',
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
        type: 'preprint-posted',
        uri: input.uri || input.url,
      },
    ],
  };
}

function parseDocmap(timeline, docmap) {
  const steps = Array.from(stepsGenerator(docmap['first-step'], docmap.steps));
  if (timeline.groups.length === 0) {
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
  timeline.groups.sort((a, b) => {
    const datesInA = a.items.map(item => item.date).sort();
    const earliestDateInA = datesInA[0];
    const latestDateInA = datesInA.at(-1);

    const datesInB = b.items.map(item => item.date).sort();
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

export async function parse(docmaps) {
  return {
    summary: '',
    timeline: reduce(docmaps.map(unpack)),
  };
}
