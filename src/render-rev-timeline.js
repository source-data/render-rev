import { css, html, LitElement } from 'lit';
import { Icons } from './icons.js';
import './render-rev-highlight.js';
import { GlobalStyles } from './styles.js';

function toClassName(str) {
  return str.replaceAll(/[^a-zA-Z0-9-_]/g, '');
}

function itemDescription(item) {
  switch (item.type) {
    case 'reviews':
      return `Peer Review (${item.contents.length})`;
    case 'response':
      return 'Reply';
    case 'preprint-posted':
      return 'Preprint';
    case 'published':
      return 'Published';
    default:
      return 'Unknown';
  }
}

export class RenderRevTimeline extends LitElement {
  static properties = {
    reviewProcess: { type: Object },
  };

  static styles = [
    GlobalStyles,
    css`
      .render-rev-timeline {
        width: 100%;
      }
      .timeline-group:not(:first-child) {
        margin-top: 24px;
      }
      .timeline-group {
        display: grid;
        gap: 8px;
        grid-template-columns: minmax(150px, 1fr) 100px minmax(170px, 1fr);
      }
      .group-label,
      .item-date,
      .item-label {
        display: flex;
        align-items: center; /* Vertical center alignment */
        justify-content: center; /* Horizontal center alignment */
        line-height: 16px;
        height: 32px;
      }
      .group-label {
        border-radius: 12px;
      }
      .item-date {
        color: grey;
        position: relative;
      }

      /* create the dotted lines between dates */
      .timeline-group:not(:first-child) .item-date::before {
        /* position it above the middle of the item date */
        position: absolute;
        bottom: 28px;
        right: 50%;
        width: 20px;

        /* the dots are just dots, but oriented vertically */
        content: '........';
        writing-mode: vertical-rl;
        text-orientation: upright;

        /* these settings control how many dots are visible */
        font-family: 'Courier New', Courier, monospace;
        font-size: 16px;
        font-style: normal;
        font-weight: 800;
        letter-spacing: -10px;
        height: 24px;
        overflow: hidden;
      }
      /* the dotted lines between groups are longer than the ones between items */
      .timeline-group:not(:first-child) .item-date:nth-child(2)::before {
        height: 42px;
      }

      /* create the left-pointing arrow for the item label */
      .item-label {
        margin-left: 12px;
        position: relative; /* enable absolute positioning for the :before element */
      }
      .item-label::before {
        content: '';
        position: absolute;
        right: 100%;
        border-bottom: 16px solid transparent;
        border-right: 16px solid;
        border-top: 16px solid transparent;
        height: 0px;
        width: 0px;
      }

      .item-action-icon {
        /* position the action icon on the right side of the item label */
        position: absolute;
        right: 8px;

        /* center the icon within this container */
        display: flex;
        align-items: center; /* Vertical center alignment */
        justify-content: center; /* Horizontal center alignment */
      }
      a.item-action {
        text-decoration: none;
      }
      .item-action:focus,
      .item-action:hover {
        filter: hue-rotate(25deg) brightness(1.05);
      }
      a.item-action:focus,
      a.item-action:hover {
        text-decoration: underline;
      }

      .timeline-group:nth-child(4n + 1) .group-label {
        background: #add8e6;
        background-image: linear-gradient(to left, #add8e6 0%, #a6c1ee 100%);
      }
      .timeline-group:nth-child(4n + 1) .item-label {
        background: #add8e6;
        background-image: linear-gradient(
          to right,
          #add8e6 0%,
          #add8e6 10%,
          #a6c1ee 100%
        );
      }
      .timeline-group:nth-child(4n + 1) .item-label:before {
        border-right-color: #add8e6;
      }

      .timeline-group:nth-child(4n + 2) .group-label {
        background: #0000db;
        background-image: linear-gradient(to left, #0000db 0%, #00008b 100%);
        color: ivory;
      }
      .timeline-group:nth-child(4n + 2) .item-label {
        background: #0000db;
        background-image: linear-gradient(
          to right,
          #0000db 0%,
          #0000db 10%,
          #00008b 100%
        );
        color: ivory;
      }
      .timeline-group:nth-child(4n + 2) .item-label:before {
        border-right-color: #0000db;
      }

      .timeline-group:nth-child(4n + 3) .group-label {
        background: #008400;
        background-image: linear-gradient(to left, #008400 0%, #006400 100%);
        color: ivory;
      }
      .timeline-group:nth-child(4n + 3) .item-label {
        background: #008400;
        background-image: linear-gradient(
          to right,
          #008400 0%,
          #008400 10%,
          #006400 100%
        );
        color: ivory;
      }
      .timeline-group:nth-child(4n + 3) .item-label:before {
        border-right-color: #008400;
      }

      .timeline-group:nth-child(4n + 4) .group-label {
        background: #ab0000;
        background-image: linear-gradient(to left, #ab0000 0%, #8b0000 100%);
        color: ivory;
      }
      .timeline-group:nth-child(4n + 4) .item-label {
        background: #ab0000;
        background-image: linear-gradient(
          to right,
          #ab0000 0%,
          #ab0000 10%,
          #8b0000 100%
        );
        color: ivory;
      }
      .timeline-group:nth-child(4n + 4) .item-label:before {
        border-right-color: #ab0000;
      }
    `,
  ];

  itemLabel(group, item) {
    const self = this;
    function openHighlight() {
      self.shadowRoot.querySelector('render-rev-highlight').show(group, item);
    }
    const description = itemDescription(item);
    switch (item.type) {
      case 'preprint-posted':
      case 'published':
        return html` <a class="item-label item-action" href="${item.uri}">
          ${description}
          <span class="item-action-icon">${Icons.externalLink}</span>
        </a>`;
      case 'reviews':
      case 'response':
        return html` <button
          class="item-label item-action"
          @click="${openHighlight}"
        >
          ${description}
          <span class="item-action-icon">${Icons.eye}</span>
        </button>`;
      default:
        return html`<div class="item-label">${description}</div>`;
    }
  }

  renderGroupItem(group, item, showPublisher) {
    const publisher = showPublisher
      ? html`<div class="group-label">${group.publisher.name}</div>`
      : html`<div></div>`;
    const formattedDate = item.date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
    const label = this.itemLabel(group, item);
    return html`
      ${publisher}
      <div class="item-date">${formattedDate}</div>
      ${label}
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

  render() {
    const self = this;
    return html`
      <div class="render-rev-summary">${this.reviewProcess.summary}</div>
      <div class="render-rev-timeline">
        ${this.reviewProcess.timeline.groups.map(group =>
          self.renderGroup(group)
        )}
      </div>
      <render-rev-highlight></render-rev-highlight>
    `;
  }
}
window.customElements.define('render-rev-timeline', RenderRevTimeline);
