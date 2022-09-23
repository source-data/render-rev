import { expect } from '@open-wc/testing';

import { parse } from '../src/docmaps.js';
import { docmapsByDoi, reviewProcessByDoi } from './resources/sampleDocmaps.js';

describe('docmaps', () => {
  for (const [doi, docmaps] of Object.entries(docmapsByDoi)) {
    it(`parses the docmaps for ${doi} into the correct ReviewProcess object`, async () => {
      const expectedReviewProcess = reviewProcessByDoi[doi];
      const actualReviewProcess = await parse(docmaps);
      expect(expectedReviewProcess).to.deep.equal(actualReviewProcess);
    });
  }
});
