import { parse as parseDocmap } from './docmaps.js';

export async function getReviewProcess(doi, options) {
  if (!doi) {
    return new Promise((_, reject) => reject());
  }
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
