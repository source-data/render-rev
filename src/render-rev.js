import { html, LitElement } from 'lit';
import { markdown } from '../lib/drawdown.js';

import { getReviewProcess } from './store.js';
import './render-rev-timeline.js';

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
      doi: null,
      docmaps: null,
      display: {
        publisherName: name => name,
        renderMarkdown: markdown,
      },
    };
    // use the default config as the basis and let the external options override any settings it provides.
    const config = { ...defaultConfig, ...externalOptions };
    config.display = { ...defaultConfig.display, ...externalOptions.display };

    this._config = config;
    getReviewProcess(this._config)
      .then(reviewProcess => {
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
