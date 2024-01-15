import { expect } from '@open-wc/testing';
import fetchMock from 'fetch-mock/esm/client';
import { parse } from '../src/docmaps.js';
import { docmapsAndReviewProcesses } from './resources/sample-docmaps.js';

describe('docmaps', () => {
  fetchMock.mock('*', 500);

  for (const [doi, { docmaps, reviewProcess }] of Object.entries(
    docmapsAndReviewProcesses
  )) {
    it(`parses the docmaps for ${doi} into the correct ReviewProcess object`, async () => {
      const actualReviewProcess = await parse(docmaps);
      expect(reviewProcess).to.deep.equal(actualReviewProcess);
      expect(fetchMock.called()).to.be.false;
    });
  }
});
