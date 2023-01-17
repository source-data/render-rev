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
    this.close();
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
    this.dispatchEvent(new Event('close'));
  }

  _onKeypress(event) {
    // close the modal if the escape key is pressed
    if (event.key === 'Escape') {
      this.close();
    }
  }

  _onClick(event) {
    // close the modal if the overlay is clicked
    if (event.target.classList.contains('highlight-overlay')) {
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
        margin: 3vh auto;
        height: 94vh;
        max-width: 800px;
        overflow: hidden;
        transition: transform 0.3s ease-out;
        position: relative;
      }
      .close-highlight {
        border: 1px solid transparent;
        border-radius: 50%;

        position: absolute;
        right: 8px;
        top: 8px;

        height: 32px;
        width: 32px;
      }
      .close-highlight:active,
      .close-highlight:focus,
      .close-highlight:hover {
        border-color: lightgrey;
      }
    `,
  ];

  render() {
    /* corresponding keydown event listener is set up in show() function */
    /* eslint-disable-next-line lit-a11y/click-events-have-key-events */
    return html`<div
      class="highlight-overlay ${this._isOpen ? 'highlight-open' : ''}"
      @click="${this._onClick}"
    >
      <div class="highlight-dialog" role="dialog" aria-modal="true">
        <button class="close-highlight" @click="${this.close}">
          ${Icons.close}
        </button>

        <slot></slot>
      </div>
    </div> `;
  }
}
window.customElements.define('render-rev-modal', RenderRevModal);
