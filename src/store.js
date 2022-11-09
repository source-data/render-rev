import { parse as parseDocmap } from './docmaps.js';

export async function getReviewProcess(docmaps, doi, options) {
  if (docmaps) {
    return parseDocmap(docmaps);
  }

  if (doi) {
    const { source } = options || { source: 'eeb-docmaps' };
    switch (source) {
      case 'eeb-docmaps':
        return fetch(`https://eeb.embo.org/api/v2/docmap/${doi}`)
          .then(data => data.json())
          .then(parseDocmap);
      default:
        return new Promise((_, reject) => reject());
    }
  }

  return new Promise((_, reject) => reject());
}
