function* stepsGenerator(idFirstStep, stepsById) {
  let idNextStep = idFirstStep;
  while (idNextStep in stepsById) {
    const nextStep = stepsById[idNextStep];
    idNextStep = nextStep['next-step'];
    yield nextStep;
  }
}

function parseStep(timeline, items, step) {
  const assertion = step.assertions[0].status;
  const { actions } = step;
  if (assertion === 'reviewed') {
    const dates = actions.map(action => action.outputs[0].published).sort();
    items.push({
      date: new Date(dates[0]),
      type: 'reviews',
      uris: actions.map(action => action.outputs[0].uri),
    });
  } else if (
    'type' in actions[0].outputs &&
    actions[0].outputs.type === 'author-response'
  ) {
    const response = actions[0].outputs;
    items.push({
      date: new Date(response.published),
      type: 'response',
      uri: response.uri,
    });
  }
}

function getPublisher(input) {
  const isBiorxiv = input.doi.startsWith('10.1101');
  const name = isBiorxiv ? 'biorxiv' : 'unknown';
  const uri = isBiorxiv ? 'https://www.biorxiv.org' : null;
  return {
    name,
    uri,
  };
}

function getFirstGroup(inputs) {
  const input = inputs[0];
  return {
    publisher: getPublisher(input),
    items: [
      {
        date: new Date(input.published),
        type: 'preprint-posted',
        uri: input.uri,
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
    parseStep(timeline, items, step);
  }
  timeline.groups.push({
    publisher: {
      name: docmap.publisher.name,
      uri: docmap.publisher.url,
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
