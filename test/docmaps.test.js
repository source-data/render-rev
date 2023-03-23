import { expect } from '@open-wc/testing';
import fetchMock from 'fetch-mock/esm/client';
import { parse } from '../src/docmaps.js';
import {
  docmapsByDoi,
  reviewProcessByDoi,
} from './resources/sample-docmaps.js';

describe('docmaps', () => {
  fetchMock.mock('*', 500);

  for (const [doi, docmaps] of Object.entries(docmapsByDoi)) {
    it(`parses the docmaps for ${doi} into the correct ReviewProcess object`, async () => {
      const expectedReviewProcess = reviewProcessByDoi[doi];
      const actualReviewProcess = await parse(docmaps);
      expect(expectedReviewProcess).to.deep.equal(actualReviewProcess);
      expect(fetchMock.called()).to.be.false;
    });
  }
});
