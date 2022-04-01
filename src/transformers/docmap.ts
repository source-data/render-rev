import type Docmap from "@/typings/docmap";
import type { Action, Step } from "@/typings/docmap";
import type ReviewProcess from "@/typings/review-process";
import type { Publisher, Review, ReviewRound } from "@/typings/review-process";

export default function getReviewProcess(docmap: Docmap) {
  const steps = getStepsList(docmap),
    publisher: Publisher = {
      id: docmap.publisher.name,
      name: docmap.publisher.name,
    };
  assert(steps.length > 0, "no steps in docmap", docmap);

  const reviewProcess: ReviewProcess = {
    preprint: getPreprint(publisher, steps),
    reviewRounds: getReviewRounds(publisher, steps),
    publishedPrint: getPublishedPrint(steps),
  };

  return reviewProcess;
}

function getStepsList(docmap: Docmap) {
  const idFirstStep = docmap["first-step"],
    stepsDict = docmap.steps,
    steps: [string, Step][] = [];

  let idNextStep: string | undefined = idFirstStep;
  while (idNextStep) {
    const nextStep: Step = stepsDict[idNextStep];
    steps.push([idNextStep, nextStep]);
    idNextStep = nextStep["next-step"];
  }
  return steps;
}

function getPreprint(publisher: Publisher, steps: [string, Step][]) {
  const [, firstStep] = steps[0],
    inputsFirstStep = firstStep.inputs;
  assert(
    inputsFirstStep.length == 1,
    "first step doesn't have exactly one input",
    inputsFirstStep
  );
  const inputFirstStep = inputsFirstStep[0];
  return {
    doi: inputFirstStep.doi,
    published: inputFirstStep.published,
    publisher: publisher,
    uri: inputFirstStep.uri,
  };
}

function assert(condition: boolean, message: string, object: unknown) {
  if (!condition) {
    throw Error(message + ":" + JSON.stringify(object));
  }
}

function getReviewRounds(publisher: Publisher, steps: [string, Step][]) {
  const reviewRounds: ReviewRound[] = [];
  for (let index = 1; index < steps.length; index += 2) {
    const [, reviews] = steps[index - 1],
      [, response] = steps[index];

    const reviewRound: ReviewRound = {
      id: index.toString(),
      process: {
        reviews: getReviews(reviews),
        authorReply: getAuthorReply(response),
      },
      publisher: publisher,
    };
    reviewRounds.push(reviewRound);
  }
  return reviewRounds;
}

function getReviews(reviewsStep: Step) {
  const reviews: Review[] = [];
  let reviewIdx = 0;
  for (const action of reviewsStep.actions) {
    const participants = getParticipants(action);
    for (const output of action.outputs) {
      assert(
        output.type == "review",
        "reviews output is not of type 'review'",
        output
      );
      reviews.push({
        id: reviewIdx.toString(),
        published: output.published,
        participants: participants,
        uri: output.uri,
      });
      reviewIdx++;
    }
  }
  return reviews;
}

function getParticipants(action: Action) {
  return action.participants.map((participant) => {
    const actor = participant.actor;
    return {
      name: actor.name ? actor.name : `${actor.firstName} ${actor.familyName}`,
      role: participant.role,
    };
  });
}

function getAuthorReply(reply: Step) {
  assert(
    reply.actions.length == 1,
    "reply doesn't have exactly one action",
    reply
  );
  const action = reply.actions[0];
  const output = action.outputs;
  assert(
    output.type == "author-response",
    "response output is not of type 'author-response'",
    output
  );

  return {
    participants: getParticipants(action),
    published: output.published,
    uri: output.uri,
  };
}

function getPublishedPrint(steps: [string, Step][]) {
  return undefined;
}
