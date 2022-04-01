export default interface Docmap {
  created: string;
  "first-step": string;
  generatedAt: string;
  id: string;
  provider: string;
  publisher: Publisher;
  type: string;
  steps: {
    [step_id: string]: Step;
  };
}

export interface Publisher {
  name: string;
  peer_review_policy: string;
  url: string;
}

export interface Step {
  "next-step"?: string;
  actions: Action[];
  assertions: Assertion[];
  inputs: Input[];
}

export interface Action {
  outputs: Output & Output[];
  participants: Participant[];
}

export interface Output {
  content: Content[];
  published: string;
  type: string;
  uri: string;
}

export interface Content {
  id: string;
  service: string;
  type: string;
  url: string;
}

export interface Participant {
  actor: Actor & Anonymous;
  role: string;
}

export interface Actor {
  familyName: string;
  firstName: string;
  type: string;
}
export interface Anonymous {
  name: string;
  type: string;
}

export interface Assertion {
  item: string;
  status: string;
}

export interface Input {
  doi: string;
  published: string;
  uri: string;
}
