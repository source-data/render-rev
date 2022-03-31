import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import CompactReviewProcess from "@/components/CompactReviewProcess.vue";
import type ReviewProcess from "@/typings/review-process";

const reviewProcess: ReviewProcess = {
  preprint: {
    doi: "10.1101/12345678",
    publisher: {
      id: "biorxiv",
      name: "BiorXiv",
    },
    published: "2021-04-21",
    uri: "www.example.org",
  },
  reviewRounds: [
    {
      id: "1",
      process: {
        reviews: [
          {
            id: "1",
            uri: "www.example.org",
            published: "2021-04-24",
            participants: [
              {
                name: "Anonymous",
                role: "reviewer",
              },
            ],
          },
        ],
      },
      publisher: {
        id: "review-commons",
        name: "Review Commons",
      },
    },
    {
      id: "2",
      process: {
        reviews: [
          {
            id: "1",
            uri: "www.example.org",
            published: "2021-05-4",
            participants: [
              {
                name: "Anonymous",
                role: "reviewer",
              },
            ],
          },
          {
            id: "2",
            uri: "www.example.org",
            published: "2021-05-6",
            participants: [
              {
                name: "Anonymous",
                role: "reviewer",
              },
            ],
          },
          {
            id: "3",
            uri: "www.example.org",
            published: "2021-05-10",
            participants: [
              {
                name: "Anonymous",
                role: "reviewer",
              },
            ],
          },
        ],
        authorReply: {
          uri: "www.example.org/author-reply",
          published: "2021-05-15",
          participants: [
            {
              name: "Author 1 & Author 2",
              role: "corresponding author",
            },
          ],
        },
      },
      publisher: {
        id: "embo-press",
        name: "EMBO Press",
      },
    },
  ],
};

describe("CompactReviewProcess", () => {
  const wrapper = mount(CompactReviewProcess, {
    props: { reviewProcess: reviewProcess },
  });
  it("has the right title text", () => {
    expect(wrapper.text()).toContain("Peer reviewed by:");
  });

  it("displays all review rounds", () => {
    const numReviewRounds = reviewProcess.reviewRounds.length;
    const displayedReviewRounds = wrapper.findAll(".review-round");
    expect(displayedReviewRounds).toHaveLength(numReviewRounds);

    for (let i = 0; i < numReviewRounds; i++) {
      const displayedReviewRound = displayedReviewRounds[i],
        reviewRound = reviewProcess.reviewRounds[i];

      expect(displayedReviewRound.get(".review-service").text()).toEqual(
        reviewRound.publisher.name
      );
    }
  });
});
