/**
 * Models the full peer review process, from preprint to published paper.
 */
export default interface ReviewProcess {
  preprint: Print;
  reviewRounds: ReviewRound[];
  publishedPrint?: Print;
}

export interface Print {
  doi: string;
  publisher: Publisher;
  published: string;
  uri: string;
}

export interface Publisher {
  id: string;
  name: string;
}

export interface ReviewRound {
  id: string;
  process: DetailedReviewRound;
  publisher: Publisher;
}

export interface DetailedReviewRound {
  reviews: Review[];
  authorReply?: AuthorReply;
}

export interface Review {
  id: string;
  uri: string;
  published: string;
  participants: Participant[];
}

export interface AuthorReply {
  uri: string;
  published: string;
  participants: Participant[];
}

export interface Participant {
  name: string;
  role: string;
}
