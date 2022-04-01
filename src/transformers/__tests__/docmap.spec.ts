import { describe, it, expect } from "vitest";

import type Docmap from "@/typings/docmap";
import type ReviewProcess from "@/typings/review-process";
import getReviewProcess from "@/transformers/docmap";

describe("transformers/docmap", () => {
  it("transforms a Docmap to a review process object", () => {
    const transformedDocmap = getReviewProcess(docmap);
    expect(transformedDocmap).toEqual(expectedReviewProcess);
  });
});

const docmap: Docmap = {
  "first-step": "_:b-f166eb49-1877-40c2-b5e1-789204501587",
  provider: "https://eeb.embo.org",
  created: "2022-03-30T08:12:35.249Z",
  generatedAt: "2022-03-30T08:12:35.249Z",
  publisher: {
    peer_review_policy: "https://reviewcommons.org/reviewers",
    name: "review commons",
    url: "https://reviewcommons.org",
  },
  id: "https://eeb.embo.org/api/v2/docmap/10.1101/2020.07.17.208082",
  type: "docmap",
  steps: {
    "_:b-f166eb49-1877-40c2-b5e1-789204501587": {
      "next-step": "_:b-6492d6b1-2ccd-4e46-9054-031c682cb46c",
      assertions: [
        {
          item: "https://doi.org/10.1101/2020.07.17.208082",
          status: "reviewed",
        },
      ],
      actions: [
        {
          outputs: [
            {
              published: "2020-07-23T19:22:19.556792+00:00",
              type: "review",
              uri: "https://eeb.embo.org/api/v2/review_material/1837723",
              content: [
                {
                  id: "10.1101/2020.07.17.208082",
                  type: "web-page",
                  service: "https://biorxiv.org",
                  url: "https://biorxiv.org/content/10.1101/2020.07.17.208082#review",
                },
                {
                  id: "07Ed-M0ZEeqONysTQKLaJg",
                  type: "web-page",
                  service: "https://hypothes.is/",
                  url: "https://hypothes.is/a/07Ed-M0ZEeqONysTQKLaJg",
                },
                {
                  id: "1837723",
                  type: "web-page",
                  service: "https://eeb.embo.org/",
                  url: "https://eeb.embo.org/api/v2/review_material/1837723",
                },
              ],
            },
          ],
          participants: [
            {
              actor: {
                name: "anonymous",
                type: "person",
              },
              role: "peer-reviewer",
            },
          ],
        },
        {
          outputs: [
            {
              published: "2020-07-23T19:22:19.238285+00:00",
              type: "review",
              uri: "https://eeb.embo.org/api/v2/review_material/1837724",
              content: [
                {
                  id: "10.1101/2020.07.17.208082",
                  type: "web-page",
                  service: "https://biorxiv.org",
                  url: "https://biorxiv.org/content/10.1101/2020.07.17.208082#review",
                },
                {
                  id: "1837724",
                  type: "web-page",
                  service: "https://eeb.embo.org/",
                  url: "https://eeb.embo.org/api/v2/review_material/1837724",
                },
                {
                  id: "02g8ls0ZEeqEDq9S3yK4Jw",
                  type: "web-page",
                  service: "https://hypothes.is/",
                  url: "https://hypothes.is/a/02g8ls0ZEeqEDq9S3yK4Jw",
                },
              ],
            },
          ],
          participants: [
            {
              actor: {
                name: "anonymous",
                type: "person",
              },
              role: "peer-reviewer",
            },
          ],
        },
        {
          outputs: [
            {
              published: "2020-07-23T19:22:19.976508+00:00",
              type: "review",
              uri: "https://eeb.embo.org/api/v2/review_material/1837722",
              content: [
                {
                  id: "1837722",
                  type: "web-page",
                  service: "https://eeb.embo.org/",
                  url: "https://eeb.embo.org/api/v2/review_material/1837722",
                },
                {
                  id: "10.1101/2020.07.17.208082",
                  type: "web-page",
                  service: "https://biorxiv.org",
                  url: "https://biorxiv.org/content/10.1101/2020.07.17.208082#review",
                },
                {
                  id: "0-sHjs0ZEeqlTrPEmDQG8g",
                  type: "web-page",
                  service: "https://hypothes.is/",
                  url: "https://hypothes.is/a/0-sHjs0ZEeqlTrPEmDQG8g",
                },
              ],
            },
          ],
          participants: [
            {
              actor: {
                name: "anonymous",
                type: "person",
              },
              role: "peer-reviewer",
            },
          ],
        },
      ],
      inputs: [
        {
          published: "2020-07-17T00:00:00Z",
          uri: "https://doi.org/10.1101/2020.07.17.208082",
          doi: "10.1101/2020.07.17.208082",
        },
      ],
    },
    "_:b-6492d6b1-2ccd-4e46-9054-031c682cb46c": {
      assertions: [
        {
          item: "https://doi.org/10.1101/2020.07.17.208082",
          status: "",
        },
      ],
      actions: [
        {
          outputs: {
            published: "2020-07-23T19:22:20.994067+00:00",
            type: "author-response",
            uri: "https://eeb.embo.org/api/v2/review_material/1837720",
            content: [
              {
                id: "1837720",
                type: "web-page",
                service: "https://eeb.embo.org",
                url: "https://eeb.embo.org/api/v2/review_material/1837720",
              },
              {
                id: "10.1101/2020.07.17.208082",
                type: "web-page",
                service: "https://biorxiv.org",
                url: "https://biorxiv.org/content/10.1101/2020.07.17.208082#review",
              },
              {
                id: "1J1Ims0ZEeqUvb_53N_Vag",
                type: "web-page",
                service: "https://hypothes.is",
                url: "https://hypothes.is/a/1J1Ims0ZEeqUvb_53N_Vag",
              },
            ],
          },
          participants: [
            {
              actor: {
                firstName: "Georgios N",
                type: "person",
                familyName: "Hatzopoulos",
              },
              role: "author",
            },
            {
              actor: {
                firstName: "Davide",
                type: "person",
                familyName: "Demurtas",
              },
              role: "author",
            },
            {
              actor: {
                firstName: "Maeva",
                type: "person",
                familyName: "Le Guennec",
              },
              role: "author",
            },
            {
              actor: {
                firstName: "Pierre",
                type: "person",
                familyName: "Gönczy",
              },
              role: "author",
            },
            {
              actor: {
                firstName: "Veronika Nemčíková",
                type: "person",
                familyName: "Villímová",
              },
              role: "author",
            },
            {
              actor: {
                firstName: "Sergey",
                type: "person",
                familyName: "Nazarov",
              },
              role: "author",
            },
            {
              actor: {
                firstName: "Paul",
                type: "person",
                familyName: "Guichard",
              },
              role: "author",
            },
            {
              actor: {
                firstName: "Alexandra",
                type: "person",
                familyName: "Bezler",
              },
              role: "author",
            },
          ],
        },
      ],
      inputs: [
        {
          uri: "https://eeb.embo.org/api/v2/review_material/1837723",
        },
        {
          uri: "https://eeb.embo.org/api/v2/review_material/1837724",
        },
        {
          uri: "https://eeb.embo.org/api/v2/review_material/1837722",
        },
      ],
    },
  },
};

const expectedReviewProcess: ReviewProcess = {
  preprint: {
    doi: "10.1101/2020.07.17.208082",
    published: "2020-07-17T00:00:00Z",
    publisher: {
      id: "Unknown",
      name: "Unknown",
    },
    uri: "https://doi.org/10.1101/2020.07.17.208082",
  },
  reviewRounds: [
    {
      id: "1",
      process: {
        reviews: [
          {
            id: "0",
            published: "2020-07-23T19:22:19.556792+00:00",
            participants: [
              {
                name: "anonymous",
                role: "peer-reviewer",
              },
            ],
            uri: "https://eeb.embo.org/api/v2/review_material/1837723",
          },
          {
            id: "1",
            published: "2020-07-23T19:22:19.238285+00:00",
            participants: [
              {
                name: "anonymous",
                role: "peer-reviewer",
              },
            ],
            uri: "https://eeb.embo.org/api/v2/review_material/1837724",
          },
          {
            id: "2",
            published: "2020-07-23T19:22:19.976508+00:00",
            participants: [
              {
                name: "anonymous",
                role: "peer-reviewer",
              },
            ],
            uri: "https://eeb.embo.org/api/v2/review_material/1837722",
          },
        ],
        authorReply: {
          participants: [
            {
              name: "Georgios N Hatzopoulos",
              role: "author",
            },
            {
              name: "Davide Demurtas",
              role: "author",
            },
            {
              name: "Maeva Le Guennec",
              role: "author",
            },
            {
              name: "Pierre Gönczy",
              role: "author",
            },
            {
              name: "Veronika Nemčíková Villímová",
              role: "author",
            },
            {
              name: "Sergey Nazarov",
              role: "author",
            },
            {
              name: "Paul Guichard",
              role: "author",
            },
            {
              name: "Alexandra Bezler",
              role: "author",
            },
          ],
          published: "2020-07-23T19:22:20.994067+00:00",
          uri: "https://eeb.embo.org/api/v2/review_material/1837720",
        },
      },
      publisher: {
        id: "Unknown",
        name: "Unknown",
      },
    },
  ],
  publishedPrint: undefined,
};
