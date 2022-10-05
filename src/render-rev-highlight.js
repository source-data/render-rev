import { css, html, LitElement } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { marked } from 'marked';

import { Icons } from './icons.js';
import './render-rev-modal.js';

export class RenderRevHighlight extends LitElement {
  static properties = {
    _highlight: { state: true, type: Object },
  };

  show(item) {
    this._highlight = {
      item,
      contentIdx: 0,
    };
    this.shadowRoot.querySelector('render-rev-modal').show();
  }

  static styles = css`
    .render-rev-highlight {
      background-color: #fff;
      border: 1px solid rgba(0, 0, 0, 0.2);
      border-radius: 0.5em;
      height: 100%;
      outline: 0;
      overflow: hidden;
    }
    .highlight-actions {
      height: 5%;
    }
    .highlight-content {
      display: grid;
      grid-template-columns: 32px auto 32px;
      height: 93%;
    }
    .item-content {
      height: 100%;
      overflow: scroll;
    }
    .sidebar {
      padding: 8px;
      position: relative;
    }
    .sidebar button {
      all: unset;
      position: absolute;
      bottom: 0px;
      cursor: pointer;
    }
    .sidebar button.scroll-to-top {
      bottom: 30%;
    }
    .sidebar button:focus,
    .sidebar button:hover {
      filter: invert(50%);
    }
  `;

  getHighlightContent() {
    if (!this._highlight) {
      return null;
    }
    const { item, contentIdx } = this._highlight;
    const content = item.contents[contentIdx];
    return unsafeHTML(marked.parse(content));
  }

  getControlButton(isEnabled, getNewContentIdx, icon) {
    if (!this._highlight || !isEnabled(this._highlight)) {
      return null;
    }

    const self = this;
    function switchHighlight() {
      if (isEnabled(this._highlight)) {
        const { item, contentIdx } = self._highlight;
        self._highlight = {
          item,
          contentIdx: getNewContentIdx(contentIdx),
        };
      }
    }
    return html` <button @click="${switchHighlight}">${icon}</button> `;
  }

  previousContentButton() {
    const isEnabled = ({ contentIdx }) => contentIdx > 0;
    const getNewContentIdx = idx => idx - 1;
    const icon = Icons.skipBackward;
    return this.getControlButton(isEnabled, getNewContentIdx, icon);
  }

  nextContentButton() {
    const isEnabled = ({ item, contentIdx }) =>
      contentIdx + 1 < item.contents.length;
    const getNewContentIdx = idx => idx + 1;
    const icon = Icons.skipForward;
    return this.getControlButton(isEnabled, getNewContentIdx, icon);
  }

  backToTopButton() {
    const scrollingElement = this.shadowRoot.querySelector('.item-content');
    function scrollToTop() {
      scrollingElement.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    }
    return html`
      <button class="scroll-to-top" @click="${scrollToTop}">
        ${Icons.arrowUp}
      </button>
    `;
  }

  render() {
    return html`
      <render-rev-modal>
        <div class="render-rev-highlight">
          <div class="highlight-actions"></div>
          <div class="highlight-content">
            <div class="sidebar">${this.previousContentButton()}</div>
            <div class="item-content">${this.getHighlightContent()}</div>
            <div class="sidebar">
              ${this.backToTopButton()} ${this.nextContentButton()}
            </div>
          </div>
        </div>
      </render-rev-modal>
    `;
  }
}
window.customElements.define('render-rev-highlight', RenderRevHighlight);
