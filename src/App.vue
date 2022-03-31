<script setup lang="ts">
import CompactReviewProcess from "@/components/CompactReviewProcess.vue";
import type ReviewProcess from "@/typings/review-process";
import { reactive } from "vue";

const reviewProcesses: ReviewProcess[] = [];
const state = reactive({ reviewProcesses: reviewProcesses });

fetch("/review-processes.json")
  .then((data) => data.json())
  .then((json) => {
    state.reviewProcesses = json;
  });
</script>

<template>
  <header>
    <h1>RenderRev</h1>
  </header>

  <main>
    <ul>
      <li
        v-for="reviewProcess in state.reviewProcesses"
        :key="reviewProcess.preprint.doi"
      >
        <CompactReviewProcess :review-process="reviewProcess" />
      </li>
    </ul>
  </main>
</template>

<style>
@import "./assets/base.css";

#app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;

  font-weight: normal;
}

header {
  line-height: 1.5;
}

ul {
  list-style: none;
}
</style>
