import { css, html, LitElement } from 'lit';
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
    _highlight: { state: true, type: Object },
    _scrollspy: { state: true, type: Object },
  };

  async show(group, activeItem) {
    const highlightContents = group.items
      .map(item =>
        item.contents ? item.contents.map(content => content.src) : []
      )
      .flat();
    const idxActiveContent = highlightContents.indexOf(
      activeItem.contents[0].src
    );

    const contents = group.items
      .map(item =>
        item.contents
          ? item.contents.map(({ date, doi, src }, contentIdx) => ({
              date,
              doi,
              html: DOMPurify.sanitize(this.config.renderMarkdown(src)),
              title: highlightItemTitle(item, contentIdx),
            }))
          : []
      )
      .flat();
    this._highlight = {
      contents,
      idxActiveContent,
    };
    const modal = this.shadowRoot.querySelector('render-rev-modal');
    modal.show();
    await modal.updateComplete;
    this.scrollToContent(idxActiveContent, false);

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

  close() {
    this._scrollspy.observer.disconnect();
  }

  setActiveContent(idxNewActiveContent) {
    if (idxNewActiveContent === this._highlight.idxActiveContent) {
      return;
    }
    this._highlight = {
      contents: this._highlight.contents,
      idxActiveContent: idxNewActiveContent,
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
        display: flex;
        flex-wrap: wrap;
        height: 46px;
        margin: 0 38px;
      }
      .highlight-nav > * {
        flex: 1 auto;
        margin: 8px;
      }
      /* Nav item borders are used to indicate focus/hover. So the items stay in the
       * same place when hovered/clicked the border is always present but transparent
       * if not in one of these states.
       */
      .highlight-nav-item {
        border-radius: 8px;
        border: 1px solid transparent;
        font-size: 16px;
        height: 24px;
        line-height: 24px;
        padding: 2px 12px;
      }
      .highlight-nav-item:active,
      .highlight-nav-item:focus,
      .highlight-nav-item:hover {
        border-color: darkgrey;
      }
      .highlight-nav-item.active {
        background-color: darkgray;
        color: whitesmoke;
      }
      .highlight-nav-item.active:active,
      .highlight-nav-item.active:focus,
      .highlight-nav-item.active:hover {
        border-color: #333;
        filter: none;
      }

      /* .highlight-content is the container for the text content plus the two sidebars.
       * The sidebars are 32px + 2 * 8px = 48px wide (button width + 2 * padding), the
       * text content takes the remaining width.
       */
      .highlight-content {
        display: grid;
        grid-template-columns: 48px auto 48px;

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
        padding: 8px;
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
      }
      .item-content article:not(:first-child) {
        margin-top: 48px;
      }
      .item-content article header {
        border-bottom: 1px solid;
        display: flex;
        justify-content: space-between;
        margin: 32px;
        padding: 4px;
      }
      .item-content article header h1 {
        font-size: unset;
        font-weight: unset;
        margin: unset;
      }
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
      self.scrollToContent(idxNewActiveContent, true);
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
    `;
  }

  getHighlightContent() {
    if (!this._highlight) {
      return null;
    }
    return html`
      <main>
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
    function switchHighlight() {
      if (isEnabled(this._highlight)) {
        const idxNewActiveContent = getNewContentIdx(
          self._highlight.idxActiveContent
        );
        this.scrollToContent(idxNewActiveContent, true);
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

  scrollToContent(idx, smooth) {
    const scrollOptions = smooth ? { behavior: 'smooth' } : {};
    this.shadowRoot
      .querySelector(`.highlight[data-idx="${idx}"]`)
      .scrollIntoView(scrollOptions);
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
      <button
        class="scroll-to-top"
        @click="${scrollToTop}"
        title="Scroll to top"
      >
        ${Icons.arrowUp}
      </button>
    `;
  }

  triggerPrinting() {
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
          .map(({ htmlContent }) => `<article>${htmlContent}</article>`)
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
        article {
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
      <render-rev-modal @close="${this.close}">
        <div class="render-rev-highlight">
          <nav class="highlight-nav">${this.getHighlightNav()}</nav>
          <div class="highlight-content">
            <div class="sidebar">
              ${this.printButton()} ${this.previousContentButton()}
            </div>
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
