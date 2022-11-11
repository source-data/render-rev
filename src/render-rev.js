import { html, LitElement } from 'lit';

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
  };

  constructor() {
    super();
    this._config = {};
    this._reviewProcess = null;
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
      },
    };
    // use the default config as the basis and let the external options override any settings it provides.
    const config = { ...defaultConfig, ...externalOptions };
    this._config = config;
    getReviewProcess(this._config).then(reviewProcess => {
      this._reviewProcess = reviewProcess;
    });
  }

  loading() {
    return html`Loading review
    process${this._config.doi ? ` ${this._config.doi}` : ''}...`;
  }

  render() {
    if (!this._reviewProcess) {
      return this.loading();
    }

    return html`
      <render-rev-timeline
        .reviewProcess=${this._reviewProcess}
        .config=${this._config.display}
      ></render-rev-timeline>
    `;
  }
}
window.customElements.define('render-rev', RenderRev);
