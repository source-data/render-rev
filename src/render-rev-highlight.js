import { css, html, LitElement } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { marked } from 'marked';

import { Icons } from './icons.js';
import './render-rev-modal.js';
import { GlobalStyles } from './styles.js';

export class RenderRevHighlight extends LitElement {
  static properties = {
    _highlight: { state: true, type: Object },
    _htmlContents: { state: true, type: Array },
  };

  async show(item) {
    this._highlight = {
      item,
      contentIdx: 0,
    };
    this._htmlContents = item.contents.map(content => marked.parse(content));
    const modal = this.shadowRoot.querySelector('render-rev-modal');
    modal.show();
    await modal.updateComplete;
    this.resetContentScroll();
  }

  static styles = [
    GlobalStyles,
    css`
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
      .highlight-actions div {
        padding: 8px 32px;
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
      .item-content section {
        display: none;
      }
      .item-content section.visible {
        display: block;
      }
      .item-content section code {
        white-space: break-spaces;
      }
      .sidebar {
        padding: 8px;
        position: relative;
      }
      .sidebar button {
        position: absolute;
        bottom: 0px;
      }
      .sidebar button.scroll-to-top {
        bottom: 30%;
      }
    `,
  ];

  getHighlightContent() {
    if (!this._highlight) {
      return null;
    }
    const { contentIdx } = this._highlight;
    return html`
      <article>
        ${this._htmlContents.map(
          (content, idx) => html`
            <section class="${idx === contentIdx ? 'visible' : ''}">
              ${unsafeHTML(content)}
            </section>
          `
        )}
      </article>
    `;
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
        this.resetContentScroll();
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

  resetContentScroll() {
    this.shadowRoot.querySelector('.item-content').scrollTop = 0;
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

  triggerPrinting() {
    const idPrintContainer = 'render-rev-highlight-print-container';

    const printContainer = document.createElement('div');
    printContainer.id = idPrintContainer;
    printContainer.innerHTML = `
      <article>
        ${this._htmlContents
          .map(content => `<section>${content}</section>`)
          .join('')}
      </article>
    `;
    document.body.appendChild(printContainer);

    const printStyle = document.createElement('style');
    printStyle.innerHTML = `
      #${idPrintContainer} {
        display: none;
      }
      @media print {
        body > * {
          display: none !important;
        }
        #${idPrintContainer} {
          display: block !important;
        }
        section {
          break-after: page;
        }
        code {
          white-space: break-spaces;
        }
      }
    `;
    document.head.appendChild(printStyle);

    window.print();

    document.head.removeChild(printStyle);
    document.body.removeChild(printContainer);
  }

  render() {
    return html`
      <render-rev-modal>
        <div class="render-rev-highlight">
          <div class="highlight-actions">
            <div>
              <button @click="${this.triggerPrinting}">${Icons.printer}</button>
            </div>
          </div>
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
