<script setup lang="ts">
import { reactive } from "vue";
import CompactReviewProcess from "@/components/CompactReviewProcess.vue";
import type ReviewProcess from "@/typings/review-process";
import type Docmap from "@/typings/docmap";
import getReviewProcess from "@/transformers/docmap";

const reviewProcesses: ReviewProcess[] = [],
  reviewProcessesFromDocmaps: ReviewProcess[] = [];
const state = reactive({
  reviewProcesses: reviewProcesses,
  reviewProcessesFromDocmaps: reviewProcessesFromDocmaps,
});

fetch("/review-processes.json")
  .then((data) => data.json())
  .then((reviewProcesses) => {
    state.reviewProcesses = reviewProcesses;
  });
fetch("/docmaps.json")
  .then((response) => response.json())
  .then((data: { docmap: Docmap }[]) => {
    return data.map((item) => item.docmap);
  })
  .then((docmaps) => {
    state.reviewProcessesFromDocmaps = docmaps.map((docmap) =>
      getReviewProcess(docmap)
    );
  });
</script>

<template>
  <header>
    <h1>RenderRev</h1>
  </header>

  <main>
    <h2>Example</h2>
    <ul>
      <li
        v-for="reviewProcess in state.reviewProcesses"
        :key="reviewProcess.preprint.doi"
      >
        <CompactReviewProcess :review-process="reviewProcess" />
      </li>
    </ul>

    <h2>Examples from DocMaps</h2>
    <ul>
      <li
        v-for="reviewProcess in state.reviewProcessesFromDocmaps"
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
