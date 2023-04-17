import { parse as parseDocmap } from './docmaps.js';

export async function getReviewProcess(config) {
  if (config.docmaps) {
    return parseDocmap(config.docmaps, config);
  }

  if (config.doi) {
    const url = config.docmapsUrl(config.doi);
    return fetch(url)
      .then(data => data.json())
      .then(docmaps => parseDocmap(docmaps, config));
  }

  return new Promise((_, reject) => reject());
}
