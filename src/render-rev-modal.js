import { css, html, LitElement } from 'lit';
import { Icons } from './icons.js';

export class RenderRevModal extends LitElement {
  static properties = {
    _isOpen: { state: true, type: Boolean }
  };

  constructor() {
    super();
    this._isOpen = false;
  }
  
  disconnectedCallback() {
    super.disconnectedCallback();
    this._closeModal();
  }

  show() {
    document.body.style.overflow = 'hidden';
    document.addEventListener("keydown", this._onKeypress.bind(this));
    this._isOpen = true;
  }

  close(){
    document.body.style.overflow = 'initial';
    document.removeEventListener("keydown", this._onKeypress);
    this._isOpen = false;
  }

  _onKeypress(event){
    if(event.key === "Escape") {
        this.close();
    }
  }

  static styles = css`
    .highlight-overlay {
      display: none;
      position: fixed;
      left: 0;
      top: 0;
      height: 100%;
      width: 100%;
      z-index: 1200;
      outline: 0;
      transition: opacity .15s linear;
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
      transition: transform .3s ease-out;
    }
    .close-highlight {
      all: unset;
      position: absolute;
      right: 1rem;
      top: 1rem;
      cursor: pointer;
    }
    .close-highlight:hover,
    .close-highlight:focus {
      filter: invert(50%);
    }
  `;

  render(){
    return html`
      <div class="highlight-overlay ${this._isOpen ? 'highlight-open' : ''}">
        <button class="close-highlight" @click = "${this.close}">
            ${Icons.close}
        </button>

        <div class = "highlight-dialog">
          <slot></slot>
        </div>
      </div>
    `
  }
}
window.customElements.define('render-rev-modal', RenderRevModal);
