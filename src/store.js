import { parse as parseDocmap } from './docmaps.js';

export async function getReviewProcess(config) {
  if (config.docmaps) {
    return parseDocmap(config.docmaps, config);
  }

  if (config.doi) {
    const source = config.source || 'eeb-docmaps';
    switch (source) {
      case 'eeb-docmaps':
        return fetch(`https://eeb.embo.org/api/v2/docmap/${config.doi}`)
          .then(data => data.json())
          .then(docmaps => parseDocmap(docmaps, config));
      default:
        return new Promise((_, reject) => reject());
    }
  }

  return new Promise((_, reject) => reject());
}
