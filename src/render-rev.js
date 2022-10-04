import { html, LitElement } from 'lit';

import { getReviewProcess } from './store.js';
import './render-rev-timeline.js';

export class RenderRev extends LitElement {
  static properties = {
    doi: { type: String },
    options: { type: Object },
    _reviewProcess: { state: true },
  };

  constructor() {
    super();
    this._reviewProcess = null;
  }

  connectedCallback() {
    super.connectedCallback();
    getReviewProcess(this.doi, this.options).then(reviewProcess => {
      this._reviewProcess = reviewProcess;
    });
  }

  loading() {
    return html`Loading review process for ${this.doi}...`;
  }

  render() {
    if (!this._reviewProcess) {
      return this.loading();
    }

    return html`
      <render-rev-timeline
        .reviewProcess=${this._reviewProcess}
      ></render-rev-timeline>
    `;
  }
}
window.customElements.define('render-rev', RenderRev);
