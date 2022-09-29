import { css, html, LitElement } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import '@doubletrade/lit-dialog';
import { marked } from 'marked';

import { getReviewProcess } from './store.js';

function toClassName(str) {
  return str.replaceAll(/[^a-zA-Z0-9-_]/g, '');
}

function pluralize(count, noun, suffix = 's') {
  return `${count} ${noun}${count !== 1 ? suffix : ''}`;
}

function itemDescription(item) {
  switch (item.type) {
    case 'reviews':
      return `Peer Review (${pluralize(item.contents.length, 'report')})`;
    case 'response':
      return 'Author reply';
    case 'preprint-posted':
      return 'Preprint posted';
    case 'published':
      return 'Paper published';
    default:
      return 'Unknown';
  }
}

function renderGroupPublisher(group) {
  return html` <div class="group-publisher">${group.publisher.name}</div> `;
}

function renderSummary(reviewProcess) {
  return html`<div class="render-rev-summary">${reviewProcess.summary}</div>`;
}

function getHighlightContent(highlight) {
  if (!highlight) {
    return null;
  }
  const { item, contentIdx } = highlight;
  const content = item.contents[contentIdx];
  return unsafeHTML(marked.parse(content));
}

const Icons = {
  close: html`
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      class="bi bi-x"
      viewBox="0 0 16 16"
    >
      <path
        d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
      />
    </svg>
  `,
  externalLink: html`
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      class="bi bi-box-arrow-up-right"
      viewBox="0 0 16 16"
    >
      <path
        fill-rule="evenodd"
        d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"
      />
      <path
        fill-rule="evenodd"
        d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"
      />
    </svg>
  `,
  eye: html`
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      class="bi bi-eye"
      viewBox="0 0 16 16"
    >
      <path
        d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"
      />
      <path
        d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"
      />
    </svg>
  `,
  skipBackward: html`
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      class="bi bi-skip-backward"
      viewBox="0 0 16 16"
    >
      <path
        d="M.5 3.5A.5.5 0 0 1 1 4v3.248l6.267-3.636c.52-.302 1.233.043 1.233.696v2.94l6.267-3.636c.52-.302 1.233.043 1.233.696v7.384c0 .653-.713.998-1.233.696L8.5 8.752v2.94c0 .653-.713.998-1.233.696L1 8.752V12a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5zm7 1.133L1.696 8 7.5 11.367V4.633zm7.5 0L9.196 8 15 11.367V4.633z"
      />
    </svg>
  `,
  skipForward: html`
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      class="bi bi-skip-forward"
      viewBox="0 0 16 16"
    >
      <path
        d="M15.5 3.5a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V8.752l-6.267 3.636c-.52.302-1.233-.043-1.233-.696v-2.94l-6.267 3.636C.713 12.69 0 12.345 0 11.692V4.308c0-.653.713-.998 1.233-.696L7.5 7.248v-2.94c0-.653.713-.998 1.233-.696L15 7.248V4a.5.5 0 0 1 .5-.5zM1 4.633v6.734L6.804 8 1 4.633zm7.5 0v6.734L14.304 8 8.5 4.633z"
      />
    </svg>
  `,
};

export class RenderRev extends LitElement {
  static properties = {
    doi: { type: String },
    options: { type: Object },
    _reviewProcess: { state: true },
    _highlight: { state: true },
  };

  constructor() {
    super();
    this._reviewProcess = null;
    this._highlight = null;
  }

  connectedCallback() {
    super.connectedCallback();
    getReviewProcess(this.doi, this.options).then(reviewProcess => {
      this._reviewProcess = reviewProcess;
    });
  }

  static styles = css`
    .render-rev-timeline {
      width: 100%;
    }
    .timeline-group:not(:first-child) {
      margin-top: 24px;
    }
    .timeline-group {
      display: grid;
      gap: 8px;
      grid-template-columns: 1fr 100px 1fr 20px;
    }
    .timeline-group > * {
      /* border: 3px solid transparent; */
      display: flex;
      align-items: center; /* Vertical center alignment */
      justify-content: center; /* Horizontal center alignment */
      line-height: 16px;
      height: 32px;
    }
    .group-publisher {
      border-radius: 12px;
    }
    .item-date {
      color: grey;
      position: relative;
    }
    .timeline-group:not(:first-child) .item-date::before {
      border: none;
      border-right: 4px dotted grey;
      content: '';
      width: 1px;
      position: absolute;
      right: 50%;
    }
    .timeline-group:not(:first-child) .item-date:not(:nth-child(2))::before {
      height: 24px;
      top: -18px;
    }
    .timeline-group:not(:first-child) .item-date:nth-child(2)::before {
      height: 34px;
      top: -30px;
    }

    .item-description {
      margin-left: 12px;
      position: relative; /* enable absolute positioning for the :before element */
    }
    .item-description::before {
      content: '';
      position: absolute;
      right: 100%;
      border-bottom: 16px solid transparent;
      border-right: 16px solid;
      border-top: 16px solid transparent;
      height: 0px;
      width: 0px;
    }

    .timeline-group:nth-child(4n + 1) .group-publisher {
      background: #add8e6;
      background-image: linear-gradient(to left, #add8e6 0%, #a6c1ee 100%);
    }
    .timeline-group:nth-child(4n + 1) .item-description {
      background: #add8e6;
      background-image: linear-gradient(
        to right,
        #add8e6 0%,
        #add8e6 10%,
        #a6c1ee 100%
      );
    }
    .timeline-group:nth-child(4n + 1) .item-description:before {
      border-right-color: #add8e6;
    }

    .timeline-group:nth-child(4n + 2) .group-publisher {
      background: #0000db;
      background-image: linear-gradient(to left, #0000db 0%, #00008b 100%);
      color: ivory;
    }
    .timeline-group:nth-child(4n + 2) .item-description {
      background: #0000db;
      background-image: linear-gradient(
        to right,
        #0000db 0%,
        #0000db 10%,
        #00008b 100%
      );
      color: ivory;
    }
    .timeline-group:nth-child(4n + 2) .item-description:before {
      border-right-color: #0000db;
    }

    .timeline-group:nth-child(4n + 3) .group-publisher {
      background: #008400;
      background-image: linear-gradient(to left, #008400 0%, #006400 100%);
      color: ivory;
    }
    .timeline-group:nth-child(4n + 3) .item-description {
      background: #008400;
      background-image: linear-gradient(
        to right,
        #008400 0%,
        #008400 10%,
        #006400 100%
      );
      color: ivory;
    }
    .timeline-group:nth-child(4n + 3) .item-description:before {
      border-right-color: #008400;
    }

    .timeline-group:nth-child(4n + 4) .group-publisher {
      background: #ab0000;
      background-image: linear-gradient(to left, #ab0000 0%, #8b0000 100%);
      color: ivory;
    }
    .timeline-group:nth-child(4n + 4) .item-description {
      background: #ab0000;
      background-image: linear-gradient(
        to right,
        #ab0000 0%,
        #ab0000 10%,
        #8b0000 100%
      );
      color: ivory;
    }
    .timeline-group:nth-child(4n + 4) .item-description:before {
      border-right-color: #ab0000;
    }

    button {
      all: unset;
    }
    button:hover {
      filter: invert(30%);
      cursor: pointer;
    }
  `;

  loading() {
    return html`Loading review process for ${this.doi}...`;
  }

  getControlButtons() {
    if (!this._highlight) {
      return null;
    }
    function isFirstContent({ contentIdx }) {
      return contentIdx === 0;
    }
    function isLastContent({ item, contentIdx }) {
      return contentIdx + 1 === item.contents.length;
    }
    const showPrevButton = !isFirstContent(this._highlight);
    const showNextButton = !isLastContent(this._highlight);

    const self = this;
    function prevHighlight() {
      if (!isFirstContent(self._highlight)) {
        const { group, item, contentIdx } = self._highlight;
        self._highlight = {
          group,
          item,
          contentIdx: contentIdx - 1,
        };
      }
    }
    function nextHighlight() {
      if (!isLastContent(self._highlight)) {
        const { group, item, contentIdx } = self._highlight;
        self._highlight = {
          group,
          item,
          contentIdx: contentIdx + 1,
        };
      }
    }
    return html`
      <div class="control">
        ${showPrevButton
          ? html`
              <button @click="${prevHighlight}">${Icons.skipBackward}</button>
            `
          : null}
      </div>
      <div class="control">
        ${showNextButton
          ? html`
              <button @click="${nextHighlight}">${Icons.skipForward}</button>
            `
          : null}
      </div>
    `;
  }

  renderHighlight() {
    const self = this;
    function hideHighlight() {
      self._highlight = null;
      self.toggleHighlight(false);
    }

    const controlButtons = this.getControlButtons();
    const content = getHighlightContent(this._highlight);
    const dialogContent = html`
      <style>
        .render-rev-highlight {
          background-color: #fafafa;
          max-width: 800px;
          padding: 1em;
        }
        .render-rev-highlight .header {
          height: 16px;
        }
        .render-rev-highlight .header .control {
          display: inline-block;
          user-select: none;
          width: 16px;
        }
        .render-rev-highlight .header .control:not(:last-child) {
          margin-right: 8px;
        }
        .render-rev-highlight .header button.close {
          float: right;
          user-select: none;
        }
        .render-rev-highlight button {
          all: unset;
        }
        .render-rev-highlight button:hover {
          filter: invert(30%);
          cursor: pointer;
        }
      </style>
      <div class="render-rev-highlight">
        <div class="header">
          ${controlButtons}
          <button class="close" @click="${hideHighlight}">Close &times;</button>
        </div>
        <div class="content">${content}</div>
      </div>
    `;
    return html`
      <lit-dialog
        closeOnEsc
        closeOnClickOutside
        .html="${dialogContent}"
      ></lit-dialog>
    `;
  }

  toggleHighlight(open) {
    const el = this.shadowRoot.querySelector(`lit-dialog`);
    if (open) {
      el.open();
    } else {
      el.close();
    }
  }

  itemAction(group, item) {
    const self = this;
    function showHighlight() {
      self._highlight = { group, item, contentIdx: 0 };
      self.toggleHighlight(true);
    }
    switch (item.type) {
      case 'preprint-posted':
      case 'published':
        return html` <a href="${item.uri}"> ${Icons.externalLink} </a> `;
      case 'reviews':
      case 'response':
        return html` <button @click="${showHighlight}">${Icons.eye}</button> `;
      default:
        return html`<div></div>`;
    }
  }

  renderGroupItem(group, item, showPublisher) {
    const publisher = showPublisher
      ? renderGroupPublisher(group)
      : html`<div></div>`;
    const formattedDate = item.date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
    const description = itemDescription(item);
    const action = this.itemAction(group, item);
    return html`
      ${publisher}
      <div class="item-date">${formattedDate}</div>
      <div class="item-description">${description}</div>
      <div class="item-action">${action}</div>
    `;
  }

  renderGroup(group) {
    const self = this;
    return html`
      <div class="timeline-group ${toClassName(group.publisher.name)}">
        ${group.items.map((item, idx) =>
          self.renderGroupItem(group, item, idx === 0)
        )}
      </div>
    `;
  }

  renderTimeline(reviewProcess) {
    const self = this;
    return html`<div class="render-rev-timeline">
      ${reviewProcess.timeline.groups.map(group => self.renderGroup(group))}
    </div>`;
  }

  render() {
    if (!this._reviewProcess) {
      return this.loading();
    }

    return html`
      <div class="render-rev">
        ${renderSummary(this._reviewProcess)}
        ${this.renderTimeline(this._reviewProcess)} ${this.renderHighlight()}
      </div>
    `;
  }
}
