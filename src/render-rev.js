import { html, LitElement } from 'lit';

import { getReviewProcess } from './store.js';
import './render-rev-timeline.js';

export class RenderRev extends LitElement {
  static properties = {
    doi: { type: String },
    config: { type: Object },
    _config: { state: true, type: Object },
    _reviewProcess: { state: true, type: Object },
  };

  constructor() {
    super();
    this._config = {};
    this._reviewProcess = null;
  }

  connectedCallback() {
    super.connectedCallback();
    this._config = this.config || this._config;
    if (this.doi) {
      this._config.doi = this.doi;
      getReviewProcess(this._config).then(reviewProcess => {
        this._reviewProcess = reviewProcess;
      });
    }
  }

  configure(config) {
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
