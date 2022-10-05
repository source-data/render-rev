import { css, html, LitElement } from 'lit';
import { Icons } from './icons.js';
import { GlobalStyles } from './styles.js';

export class RenderRevModal extends LitElement {
  static properties = {
    _isOpen: { state: true, type: Boolean },
    _scrollLockElements: { state: true, type: Boolean },
    _initialStyles: { state: true, type: Object },
  };

  constructor() {
    super();
    this._isOpen = false;
    this._scrollLockElements = ['html', 'body'];
    this._initialStyles = {};
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._closeModal();
  }

  show() {
    for (const selector of this._scrollLockElements) {
      const el = document.querySelector(selector);
      this._initialStyles[selector] = el.style;
      el.style.overflow = 'hidden';
    }
    document.addEventListener('keydown', this._onKeypress.bind(this));
    this._isOpen = true;
  }

  close() {
    for (const selector of this._scrollLockElements) {
      const el = document.querySelector(selector);
      el.style = this._initialStyles[selector];
    }
    document.removeEventListener('keydown', this._onKeypress);
    this._isOpen = false;
  }

  _onKeypress(event) {
    if (event.key === 'Escape') {
      this.close();
    }
  }

  static styles = [
    GlobalStyles,
    css`
      .highlight-overlay {
        display: none;
        position: fixed;
        left: 0;
        top: 0;
        height: 100%;
        width: 100%;
        z-index: 1200;
        outline: 0;
        transition: opacity 0.15s linear;
        background-color: rgba(20, 20, 20, 0.2);
      }
      .highlight-overlay.highlight-open {
        display: block;
      }
      .highlight-dialog {
        margin: 2rem auto;
        height: 80vh;
        max-width: 800px;
        overflow: hidden;
        transition: transform 0.3s ease-out;
      }
      .close-highlight {
        position: absolute;
        right: 1rem;
        top: 1rem;
      }
      @media print {
        .highlight-overlay.highlight-open {
          display: none;
        }
      }
    `,
  ];

  render() {
    return html`
      <div class="highlight-overlay ${this._isOpen ? 'highlight-open' : ''}">
        <button class="close-highlight" @click="${this.close}">
          ${Icons.close}
        </button>

        <div class="highlight-dialog" role="dialog" aria-modal="true">
          <slot></slot>
        </div>
      </div>
    `;
  }
}
window.customElements.define('render-rev-modal', RenderRevModal);
