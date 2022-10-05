function* stepsGenerator(idFirstStep, stepsById) {
  let idNextStep = idFirstStep;
  while (idNextStep in stepsById) {
    const nextStep = stepsById[idNextStep];
    idNextStep = nextStep['next-step'];
    yield nextStep;
  }
}

function getOutput(action) {
  return action.outputs.length ? action.outputs[0] : action.outputs;
}

function parseStep(items, step) {
  const { actions, assertions } = step;

  const isReviewStep =
    assertions && assertions.length > 0 && assertions[0].status === 'reviewed';
  const isResponseStep =
    actions &&
    actions.length > 0 &&
    'type' in actions[0].outputs &&
    actions[0].outputs.type === 'author-response';
  if (!isReviewStep && !isResponseStep) {
    return;
  }

  const dates = actions.map(action => getOutput(action).published).sort();
  const date = new Date(dates[0]);
  const contents = actions.map(() => 'Loading...');
  const item = { date, type: 'unknown', contents };
  if (isReviewStep) {
    item.type = 'reviews';
  } else if (isResponseStep) {
    item.type = 'response';
  }
  items.push(item);

  Promise.all(
    actions.map(action =>
      fetch(getOutput(action).uri)
        .then(data => data.json())
        .then(data => data[0].docmap)
    )
  ).then(contentDocmaps => {
    item.contents = contentDocmaps
      .sort((a, b) => a.runningNumber > b.runningNumber)
      .map(docmap => docmap.content);
  });
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
    parseStep(items, step);
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
