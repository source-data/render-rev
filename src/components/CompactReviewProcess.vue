<script setup lang="ts">
import type ReviewProcess from "@/typings/review-process";
import type { DetailedReviewRound } from "@/typings/review-process";
defineProps<{
  reviewProcess: ReviewProcess;
}>();

function describe(reviewRound: DetailedReviewRound) {
  const authorReplyDescription = reviewRound.authorReply
      ? "1 reply"
      : "no reply",
    numReviews = reviewRound.reviews.length,
    reviewsDescription = numReviews == 1 ? "1 review" : `${numReviews} reviews`;
  return `${reviewsDescription}, ${authorReplyDescription}`;
}
</script>

<template>
  <div class="review-process review-process-compact">
    <h5>Peer reviewed by:</h5>

    <ol>
      <li
        class="review-round"
        :class="'review-round-' + reviewRound.id"
        v-for="reviewRound in reviewProcess.reviewRounds"
        :key="reviewRound.id"
      >
        <span
          class="review-service"
          :class="'review-service-' + reviewRound.publisher.id"
        >
          {{ reviewRound.publisher.name }}
        </span>

        <span class="review-round-description">
          {{ describe(reviewRound.process) }}
        </span>
      </li>
    </ol>
  </div>
</template>

<style scoped>
.review-process {
  margin: 0.5rem;
  max-width: 400px;
}

ol {
  list-style: none;
  padding: 0;
}

.review-round {
  margin-top: 0.5rem;
  display: grid;
  grid-template-columns: 50% 50%;
  gap: 0.25rem;
}

.review-service,
.review-round-description {
  padding: 0.25rem 0.5rem;
}
.review-service {
  background-color: blue;
  border-radius: 0.25rem;
  color: white;
  text-align: center;
}
</style>
