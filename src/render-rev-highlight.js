import { css, html, LitElement } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import DOMPurify from 'dompurify';

import { Icons } from './icons.js';
import './render-rev-modal.js';
import { GlobalStyles } from './styles.js';

function highlightItemTitle(item, contentIdx) {
  switch (item.type) {
    case 'reviews':
      return `Review ${contentIdx + 1}`;
    case 'response':
      return `Response`;
    default:
      return 'Unknown';
  }
}

export class RenderRevHighlight extends LitElement {
  static properties = {
    config: { type: Object },
    highlightItem: { type: Object },
    _highlight: { state: true, type: Object },
    _scrollspy: { state: true, type: Object },
    _hideSummary: { state: true, type: Boolean },
  };

  firstUpdated() {
    super.firstUpdated();
    if (this.highlightItem) {
      const { group, item, content } = this.highlightItem;
      this.show(group, item, content);
    }
  }

  async show(activeGroup, activeItem, activeContent) {
    const highlightContents = activeGroup.items
      .map(item =>
        item.contents ? item.contents.map(content => content.src) : []
      )
      .flat();

    const srcActiveContent = activeContent
      ? activeContent.src
      : activeItem.contents[0].src;
    const idxActiveContent = highlightContents.indexOf(srcActiveContent);

    let srcIdx = 0;
    const contents = activeGroup.items
      .map(item =>
        item.contents
          ? item.contents.map(({ date, doi }, contentIdx) => {
              const src = highlightContents[srcIdx];
              srcIdx += 1;
              return {
                date,
                doi,
                html: DOMPurify.sanitize(this.config.renderMarkdown(src)),
                title: highlightItemTitle(item, contentIdx),
              };
            })
          : []
      )
      .flat();
    const summaries = activeGroup.items
      .map(item => item.summaries)
      .flat()
      .filter(Boolean);
    this._highlight = {
      contents,
      idxActiveContent,
      summary: summaries.length > 0 ? summaries[0] : null,
    };
    const modal = this.shadowRoot.querySelector('render-rev-modal');
    modal.show();
    await modal.updateComplete;
    if (idxActiveContent === 0) {
      this.scrollToTop();
    } else {
      this.scrollToContent(idxActiveContent, false);
    }

    // We're keeping track of which content is the currently active one to e.g. update
    // the prev / next buttons.
    // The IntersectionObserver APi we're using for that offers a callback every time
    // some elements' visibility crosses a threshold: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
    this._scrollspy = {
      visibilities: [],
    };
    const self = this;
    this._scrollspy.observer = new IntersectionObserver(
      entries => {
        // Which entry is most visible? We only need to consider height since the
        // container only has vertical scrolling.
        // entries doesn't always contain all observed targets so we have to keep track
        // of the last visibility for every target.
        entries.forEach(entry => {
          const idxContent = Number(entry.target.dataset.idx);
          self._scrollspy.visibilities[idxContent] =
            entry.intersectionRect.height;
        });

        const { visibilities } = self._scrollspy;
        const highestVisibility = Math.max(...visibilities);

        const idxHighestVisibility = visibilities.indexOf(highestVisibility);
        self.setActiveContent(idxHighestVisibility);
      },
      {
        // the scrolling container
        root: this.shadowRoot.querySelector('.item-content'),
        // Threshold controls when the observer is called. For more details see https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#thresholds
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
      }
    );
    this.shadowRoot
      .querySelectorAll('.highlight')
      .forEach(el => this._scrollspy.observer.observe(el));
  }

  onClose() {
    if (this._scrollspy) {
      this._scrollspy.observer.disconnect();
    }
  }

  triggerClose() {
    this.shadowRoot.querySelector('render-rev-modal').close();
  }

  setActiveContent(idxNewActiveContent) {
    if (idxNewActiveContent === this._highlight.idxActiveContent) {
      return;
    }
    this._highlight = {
      contents: this._highlight.contents,
      idxActiveContent: idxNewActiveContent,
      summary: this._highlight.summary,
    };
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

      /* The nav container uses flex layout for variable # of nav items.
       * Left & right margin are set so the nav container is flush with the text
       * content below it.
       * Top & bottom margins are set by nav items below.
       */
      .highlight-nav {
        background-color: var(--highlight-nav-bg-color);
        box-shadow: 0px 0px 8px 2px var(--highlight-nav-bg-color);
        display: flex;
        flex-wrap: wrap;
        padding: 0 38px;
      }
      .highlight-nav > * {
        display: flex;
        flex: 1 auto;
        padding: 0 8px;
      }
      /* The nav item border-bottom is used to indicate focus/hover. */
      .highlight-nav-item {
        border-bottom: 3px solid;
        border-bottom-color: transparent;
        color: var(--highlight-nav-text-color);
        filter: brightness(85%);
        font-size: 16px;
        height: 36px;
        line-height: 36px;
        padding: 4px 12px 0;
      }
      .highlight-nav-item.active {
        border-color: var(--highlight-nav-text-color);
        filter: none;
      }
      .highlight-nav-item.active:active,
      .highlight-nav-item.active:focus,
      .highlight-nav-item.active:hover {
        filter: brightness(95%);
      }
      .highlight-nav-item:active,
      .highlight-nav-item:focus,
      .highlight-nav-item:hover {
        border-color: var(--highlight-nav-text-color);
        filter: brightness(95%);
      }

      .highlight-nav-item.close-highlight {
        border: 1px solid transparent;
        border-radius: 50%;

        filter: none;

        padding: 0;
        position: absolute;
        right: 6px;
        top: 6px;

        height: 32px;
        width: 32px;
      }
      .highlight-nav-item.close-highlight:active,
      .highlight-nav-item.close-highlight:focus,
      .highlight-nav-item.close-highlight:hover {
        border-color: var(--highlight-nav-text-color);
        filter: brightness(85%);
      }

      /* .highlight-content is the container for the text content plus the two sidebars.
       * The sidebars are 32px + 2 * 8px = 48px wide (button width + 2 * padding), the
       * text content takes the remaining width.
       */
      .highlight-content {
        display: grid;
        grid-template-columns: 40px auto 40px;

        /* The navbar at the top is exactly 46px high. Setting margin- & padding-top to
         * -46px & 46px respectively positions the content just below that, while height:
         * 100% combined with box-sizing: border-box makes the content take up the
         * remaining vertical space.
         * Setting height to some value is also required to enable overflow scrolling.
         */
        height: 100%;
        box-sizing: border-box;
        margin-top: -46px;
        padding-top: 46px;
      }
      .sidebar {
        padding: 4px;
        position: relative; /* enable positioning of buttons inside the sidebar */
      }
      /* Sidebar buttons are 24 + 2 * 3px + 2 * 1px = 32px wide (width + 2 * padding + 2 * border).
       * Just like with the nav items above, the border is always present but transparent
       * if not in one of these states stay in the same place when hovered/clicked.
       */
      .sidebar button {
        border: 1px solid transparent;
        border-radius: 50%;
        height: 24px;
        width: 24px;
        padding: 3px;

        /* The buttons go at the bottom of the sidebar by default. */
        position: absolute;
        bottom: 8px;
      }
      .sidebar button:active,
      .sidebar button:focus,
      .sidebar button:hover {
        border-color: lightgrey;
      }
      /* The print and scroll-to-top buttons go some way up the sidebar. */
      .sidebar button.scroll-to-top {
        bottom: 30%;
      }
      .sidebar button.print {
        bottom: unset;
        top: 10%;
      }

      .item-content {
        height: 100%;
        overflow: scroll;
        /* padding to prevent scrollbar from hiding content */
        padding: 0 16px;
      }
      .item-content article:not(:first-child) {
        /* margin between piecs of content */
        margin-top: 64px;
      }

      /* styling for the header section at the top of each piece of content */
      .item-content article header {
        display: flex;
        font-size: 1.2rem;
        font-weight: bold;
        justify-content: space-between;
        padding: 24px 0;
      }
      .item-content article header h1 {
        font-size: unset;
        font-weight: unset;
        margin: unset;
      }

      /* styling for the summary section at the top */
      .content-summary {
        margin-bottom: -32px;
        margin-top: 32px;
      }
      .content-summary .hidden {
        display: none;
      }
      .content-summary .summary-container {
        border: 1px solid darkgrey;
        margin-top: 12px;
        padding: 12px;
        position: relative;
      }
      .content-summary .summary-title {
        background: white;
        font-weight: normal;
        margin: 0;
        padding: 0 4px;
        position: absolute;
        top: -8px;
        left: 8px;
      }
      .content-summary .disclaimer {
        font-weight: bold;
        margin-bottom: 8px;
      }
      .toggle {
        cursor: pointer;
        display: inline-block;
        margin-bottom: 8px;
      }
      .toggle-switch {
        display: inline-block;
        background: #ccc;
        border-radius: 12px;
        width: 40px;
        height: 22px;
        position: relative;
        vertical-align: middle;
        transition: background 0.25s;
      }
      .toggle-switch:before,
      .toggle-switch:after {
        content: '';
      }
      .toggle-switch:before {
        display: block;
        background: linear-gradient(to bottom, #fff 0%, #eee 100%);
        border-radius: 50%;
        box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.25);
        width: 16px;
        height: 16px;
        position: absolute;
        top: 3px;
        left: 3px;
        transition: left 0.25s;
      }
      .toggle:hover .toggle-switch:before {
        background: linear-gradient(to bottom, #fff 0%, #fff 100%);
        box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.5);
      }
      .toggle-checkbox:checked + .toggle-switch {
        background: #56c080;
      }
      .toggle-checkbox:checked + .toggle-switch:before {
        left: 20px;
      }
      .toggle-checkbox {
        position: absolute;
        visibility: hidden;
      }

      /* styling for rendered markdown */
      .item-content article code {
        white-space: break-spaces;
      }
    `,
  ];

  getHighlightNav() {
    if (!this._highlight) {
      return null;
    }
    const self = this;
    function navigateToContent(event) {
      const idxNewActiveContent = Number(event.target.dataset.idx);
      self.scrollToContent(idxNewActiveContent, true, event);
    }
    return html`
      ${this._highlight.contents.map(
        ({ title }, idx) => html`
          <div>
            <button
              class="highlight-nav-item ${this._highlight.idxActiveContent ===
              idx
                ? 'active'
                : ''}"
              data-idx="${idx}"
              @click="${navigateToContent}"
            >
              ${title}
            </button>
          </div>
        `
      )}
      <button
        class="highlight-nav-item close-highlight"
        @click="${this.triggerClose}"
      >
        ${Icons.close}
      </button>
    `;
  }

  renderSummary() {
    const { summary } = this._highlight;
    if (summary) {
      const classes = {
        hidden: this._hideSummary,
        'summary-container': true,
      };
      return html`
        <article class="content-summary">
          <form>
            <label class="toggle">
              <span class="toggle-label"
                >Display an automated digest of the reviews:</span
              >
              <input
                class="toggle-checkbox"
                type="checkbox"
                @change="${() => {
                  this._hideSummary = !this._hideSummary;
                }}"
                checked
              />
              <div class="toggle-switch"></div>
            </label>
          </form>

          <div class=${classMap(classes)}>
            <h4 class="summary-title">Auto-digest</h4>
            <div class="disclaimer">
              Disclaimer: this summary was generated automatically; the full
              original content is available below.
            </div>
            <div class="summary-text">${summary}</div>
          </div>
        </article>
      `;
    }
    return '';
  }

  getHighlightContent() {
    if (!this._highlight) {
      return null;
    }
    return html`
      <main>
        ${this.renderSummary()}
        ${this._highlight.contents.map(
          ({ html: htmlContent, date, doi, title }, idx) => html`
            <article class="highlight" data-idx="${idx}">
              <header>
                <h1>${title}</h1>
                ${doi
                  ? html`<a
                      class="highlight-doi"
                      href="https://doi.org/${doi}"
                      target="_blank"
                      >${doi}</a
                    >`
                  : ''}
                <time class="highlight-date" datetime="${date}"
                  >Published on ${this.config.formatDate(date)}</time
                >
              </header>

              ${unsafeHTML(htmlContent)}
            </article>
          `
        )}
      </main>
    `;
  }

  printButton() {
    return html`
      <button
        class="print"
        @click="${this.triggerPrinting}"
        title="Print content"
      >
        ${Icons.printer}
      </button>
    `;
  }

  getControlButton(isEnabled, getNewContentIdx, icon) {
    if (!this._highlight || !isEnabled(this._highlight)) {
      return null;
    }

    const self = this;
    function switchHighlight(event) {
      if (isEnabled(this._highlight)) {
        const idxNewActiveContent = getNewContentIdx(
          self._highlight.idxActiveContent
        );
        this.scrollToContent(idxNewActiveContent, true, event);
      }
    }

    const title = `Go to ${
      this._highlight.contents[
        getNewContentIdx(this._highlight.idxActiveContent)
      ].title
    }`;
    return html`
      <button @click="${switchHighlight}" title="${title}">${icon}</button>
    `;
  }

  previousContentButton() {
    const isEnabled = ({ idxActiveContent }) => idxActiveContent > 0;
    const getNewContentIdx = idx => idx - 1;
    const icon = Icons.skipBackward;
    return this.getControlButton(isEnabled, getNewContentIdx, icon);
  }

  nextContentButton() {
    const isEnabled = ({ contents, idxActiveContent }) =>
      idxActiveContent + 1 < contents.length;
    const getNewContentIdx = idx => idx + 1;
    const icon = Icons.skipForward;
    return this.getControlButton(isEnabled, getNewContentIdx, icon);
  }

  scrollToContent(idx, smooth, event) {
    const scrollOptions = smooth ? { behavior: 'smooth' } : {};
    this.shadowRoot
      .querySelector(`.highlight[data-idx="${idx}"]`)
      .scrollIntoView(scrollOptions);
    if (event) {
      event.currentTarget.blur();
    }
  }

  scrollToTop() {
    this.shadowRoot.querySelector('.item-content').scrollTo({
      top: 0,
      left: 0,
    });
  }

  backToTopButton() {
    return html`
      <button
        class="scroll-to-top"
        @click="${this.scrollToTop}"
        title="Scroll to top"
      >
        ${Icons.arrowUp}
      </button>
    `;
  }

  triggerPrinting(event) {
    /* To be able to fully control what gets printed we have to mess with the document.
     * We append a new element with just the text we want to print to the document body
     * and add styling that hides everything but this new element when printing.
     * Then after printing (window.print() blocks while the print dialog is open) we
     * remove these elements again.
     */
    const idPrintContainer = 'render-rev-highlight-print-container';

    const printContainer = document.createElement('div');
    printContainer.id = idPrintContainer;
    printContainer.innerHTML = `
      <main>
        ${this._highlight.contents
          .map(
            ({ date, doi, html: htmlContent, title }) => `<article>
            <header>
              <h1>${title}</h1>
              ${doi ? `<a href="https://doi.org/${doi}">${doi}</a>` : ''}
              <time datetime="${date}">Published on ${this.config.formatDate(
              date
            )}</time>
            </header>
            ${htmlContent}
          </article>`
          )
          .join('')}
      </main>
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
        article:not(:first-child) {
          margin-top: 80px;
        }
        article header {
          display: flex;
          font-size: 1.2rem;
          font-weight: bold;
          justify-content: space-between;
          padding: 24px 0;
        }
        article header h1 {
          font-size: unset;
          font-weight: unset;
          margin: unset;
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
    event.currentTarget.blur();
  }

  render() {
    return html`
      <render-rev-modal @close="${this.onClose}">
        <div class="render-rev-highlight">
          <nav class="highlight-nav">${this.getHighlightNav()}</nav>
          <div class="highlight-content">
            <div class="sidebar sidebar-left">
              ${this.printButton()} ${this.previousContentButton()}
            </div>
            <div class="item-content">${this.getHighlightContent()}</div>
            <div class="sidebar sidebar-right">
              ${this.backToTopButton()} ${this.nextContentButton()}
            </div>
          </div>
        </div>
      </render-rev-modal>
    `;
  }
}
window.customElements.define('render-rev-highlight', RenderRevHighlight);
