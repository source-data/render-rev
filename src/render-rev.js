import { html, LitElement } from 'lit';
import { markdown } from '../lib/drawdown.js';

import { getReviewProcess } from './store.js';
import './render-rev-timeline.js';

function findHighlightItem(reviewProcess, highlightDoi) {
  for (const group of reviewProcess.timeline.groups) {
    for (const item of group.items) {
      if (item.contents) {
        for (const content of item.contents) {
          if (content.doi === highlightDoi) {
            return { group, item, content };
          }
        }
      }
    }
  }
  return null;
}

/**
 * Renders the peer review process of a preprint.
 */
export class RenderRev extends LitElement {
  static properties = {
    /**
     * The DOI of the preprint whose review process should be rendered.
     */
    doi: { type: String },
    /**
     * Additional configuration, optional.
     */
    options: { type: Object },

    /**
     * The internal object that holds all configuration options.
     */
    _config: { state: true, type: Object },
    /**
     * The internal representation of the review process that is being rendered.
     */
    _reviewProcess: { state: true, type: Object },
    /**
     * The item in the review process that should be highlighted by default.
     */
    _highlightItem: { state: true, type: Object },
    /**
     * The internal status of fetching and parsing the review process data.
     */
    _status: { state: true, type: Number },
  };

  Ready = 0;

  Loading = 1;

  Failed = 2;

  constructor() {
    super();
    this._config = {};
    this._reviewProcess = null;
    this._highlightItem = null;
    this._status = this.Loading;
  }

  connectedCallback() {
    super.connectedCallback();
    // use either the passed-in options or the default ones if nothing was passed in.
    const externalOptions = this.options || {};
    // if the DOI parameter was set use that one, otherwise use the one from the passed-in options.
    externalOptions.doi = this.doi || externalOptions.doi;
    this._updateReviewProcess(externalOptions);
  }

  configure(externalOptions) {
    this._updateReviewProcess(externalOptions);
  }

  _updateReviewProcess(externalOptions) {
    const defaultConfig = {
      debug: false,
      doi: null,
      docmaps: null,
      display: {
        publisherName: name => {
          const nameMap = {
            development: 'Development',
            elife: 'eLife',
            'embo press': 'EMBO Press',
            'embo reports': 'EMBOR',
            'life science alliance': 'LSA',
            'peerage of science': 'Peerage of Science',
            'peer ref': 'Peer Ref',
            'plos one': 'PLOS ONE',
            'review commons': 'Review Commons',
            'the embo journal': 'EMBOJ',
          };
          return nameMap[name] || name;
        },
        publisherLogo: () => null,
        renderMarkdown: markdown,
        formatDate: date =>
          date.toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          }),
      },
      highlightDoi: null,
    };
    // use the default config as the basis and let the external options override any settings it provides.
    const config = { ...defaultConfig, ...externalOptions };
    config.display = { ...defaultConfig.display, ...externalOptions.display };

    this._config = config;
    getReviewProcess(this._config)
      .then(reviewProcess => {
        if (this._config.highlightDoi) {
          this._highlightItem = findHighlightItem(
            reviewProcess,
            this._config.highlightDoi
          );
        }
        this._reviewProcess = reviewProcess;
        this._status = this.Ready;
      })
      .catch(() => {
        this._status = this.Failed;
      });
  }

  loading() {
    return html`Loading review
    process${this._config.doi ? ` for ${this._config.doi}` : ''}...`;
  }

  error() {
    return html`Failed to load review
    process${this._config.doi ? ` for ${this._config.doi}` : ''}`;
  }

  render() {
    switch (this._status) {
      case this.Ready:
        return html`
          <render-rev-timeline
            .reviewProcess=${this._reviewProcess}
            .config=${this._config.display}
            .highlightItem=${this._highlightItem}
          ></render-rev-timeline>
        `;
      case this.Loading:
        return this.loading();
      default:
        return this.error();
    }
  }
}
window.customElements.define('render-rev', RenderRev);
