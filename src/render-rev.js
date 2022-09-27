import { css, html, LitElement } from 'lit';

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
      return `Peer Review (${pluralize(item.uris.length, 'report')})`;
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

function itemAction(item) {
  switch (item.type) {
    case 'preprint-posted':
    case 'published':
      return html`<a href="${item.uri}"><div class="external-link"></div></a>`;
    case 'reviews':
    case 'response':
    default:
      return html`<div></div>`;
  }
}

function renderGroupPublisher(group) {
  return html` <div class="group-publisher">${group.publisher.name}</div> `;
}

function renderGroupItem(group, item, showPublisher) {
  const publisher = showPublisher
    ? renderGroupPublisher(group)
    : html`<div></div>`;
  const formattedDate = item.date.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
  const description = itemDescription(item);
  const action = itemAction(item);
  return html`
    ${publisher}
    <div class="item-date">${formattedDate}</div>
    <div class="item-description">${description}</div>
    <div class="item-action">${action}</div>
  `;
}

function renderGroup(group) {
  return html`
    <div class="timeline-group ${toClassName(group.publisher.name)}">
      ${group.items.map((item, idx) => renderGroupItem(group, item, idx === 0))}
    </div>
  `;
}

function renderSummary(reviewProcess) {
  return html`<div class="render-rev-summary">${reviewProcess.summary}</div>`;
}

function renderTimeline(reviewProcess) {
  return html`<div class="render-rev-timeline">
    ${reviewProcess.timeline.groups.map(renderGroup)}
  </div>`;
}

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

    .external-link {
      background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAABLklEQVRIie1UsU7DMBB9Z/MLJY4Ff9DuILVCqELiS/go+A8mytIOLGwduleyCP6DxNGxJMgxSZwEBoa+7ey7985P5wNOiID8IE3TeyJ6AnDRkb8zxqwAQGu9BbBsyXkzxlzXgWioET32kAMAD2j6qsHpB1prBgBjTOO8D0qpmRBiA2BRn/n1orVqIJIkOZdSvgJYENG+LWeygFJqJqV8YeY5gEOe53d/JhDYciiK4tZa+9GWezaWvLJlw8xzIto759bW2s/qeodgEEYJVJ03bPHIUY+wj8EWjbFltEA4LWVZ3rSRa6231Qf8RtSimC0Bfvzs6AuEEM+xznvrB+Q4AO/OuXWWZV2ddyJqkb+4puBXq+JfCIQWHQFc1lt1Io5+0HgBMz+ECWPJK44ThuML10iEmOvrl44AAAAASUVORK5CYII=');
      background-size: contain;
      height: 16px;
      width: 16px;
    }
  `;

  loading() {
    return html`Loading review process for ${this.doi}...`;
  }

  render() {
    if (!this._reviewProcess) {
      return this.loading();
    }

    return html`
      <div class="render-rev">
        ${renderSummary(this._reviewProcess)}
        ${renderTimeline(this._reviewProcess)}
      </div>
    `;
  }
}
