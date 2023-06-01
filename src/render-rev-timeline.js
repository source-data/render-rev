import { css, html, LitElement } from 'lit';
import { Icons } from './icons.js';
import { PublisherLogos } from './logos.js';
import './render-rev-highlight.js';
import { GlobalStyles } from './styles.js';
import '@spider-ui/tooltip';

function toClassName(str) {
  return str?.replaceAll(/[^a-zA-Z0-9-_]/g, '') || 'undefined';
}

function itemDescription(item) {
  switch (item.type) {
    case 'reviews':
      return `Peer Review`;
    case 'response':
      return 'Reply';
    case 'review-article':
      return 'Review';
    case 'preprint-posted':
      return 'Preprint';
    case 'journal-publication':
      return 'Published';
    default:
      return 'Unknown';
  }
}

export class RenderRevTimeline extends LitElement {
  static properties = {
    config: { type: Object },
    reviewProcess: { type: Object },
    highlightItem: { type: Object },
  };

  static styles = [
    GlobalStyles,
    css`
      .render-rev-summary,
      .render-rev-timeline {
        box-sizing: border-box;
        width: var(--timeline-width);
      }
      .render-rev-summary {
        background: var(--timeline-summary-bg-color);
        color: var(--timeline-summary-text-color);
        /* make the summary text smaller relative to the other text in render-rev */
        font-size: smaller;
        margin-bottom: 8px;
        padding: 8px;
        text-align: justify;
        word-break: break-word;
      }
      .render-rev-summary h6 {
        /* make the summary header text smaller than the summary text */
        font-size: smaller;
        font-weight: inherit;
        margin: 0 0 4px 0;
      }
      .render-rev-summary .auto-summary-info {
        text-align: justify;
        white-space: break-spaces;
        width: 300px;
      }
      .timeline-group:not(:first-child) {
        margin-top: 24px;
      }
      .timeline-group {
        display: grid;
        gap: 8px;
        grid-template-columns: minmax(100px, 3fr) minmax(90px, 1fr) minmax(
            130px,
            2fr
          );
      }
      .group-label,
      .item-date,
      .item-label {
        display: flex;
        align-items: center; /* vertically centered */
        line-height: 16px;
        height: 32px;
      }
      .item-date,
      .item-label {
        justify-content: center; /* item date and label horizontally center-aligned */
      }
      .group-label {
        /* group label right-aligned */
        justify-content: right;
        text-align: right;
      }
      .group-label,
      .item-date {
        color: var(--timeline-text-color);
      }
      .item-date {
        position: relative;
      }
      .group-logo {
        height: 16px;
        width: 16px;
        margin-left: 4px;
      }
      .group-label-inside-tooltip {
        display: flex;
        align-items: center; /* vertically centers logos in case of multiline group name */
      }

      /* create the dotted lines between dates */
      .timeline-group:not(:first-child) .item-date::before {
        color: var(--timeline-line-color);
        width: 20px;
        /* position it above the middle of the item date */
        position: absolute;
        bottom: 28px;
        /*
         * The date element is 100px wide, the line itself 20px. In order for the line
         * to be centered its right edge therefore has to be at:
         * (100px / 2) - (20px / 2) = 40px
         */
        right: 40px;

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
        padding-right: 24px; /* make room for the action icon */
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
      .item-action-icon,
      .item-action-icon svg {
        width: 16px;
        height: 16px;
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

      .item-label.preprint-posted {
        background: var(--preprint-bg-color);
        color: var(--preprint-text-color);
      }
      .item-label.preprint-posted:before {
        border-right-color: var(--preprint-bg-color);
      }

      .item-label.response,
      .item-label.review-article,
      .item-label.reviews {
        background: var(--reviews-bg-color);
        color: var(--reviews-text-color);
      }
      .item-label.response:before,
      .item-label.review-article:before,
      .item-label.reviews:before {
        border-right-color: var(--reviews-bg-color);
      }

      .item-label.journal-publication {
        background: var(--published-bg-color);
        color: var(--published-text-color);
      }
      .item-label.journal-publication:before {
        border-right-color: var(--published-bg-color);
      }
    `,
  ];

  openHighlight(group, item) {
    this.shadowRoot.querySelector('render-rev-highlight').show(group, item);
  }

  itemLabel(group, item) {
    const openHighlight = this.openHighlightHandler(group, item);
    const description = itemDescription(item);
    switch (item.type) {
      case 'preprint-posted':
      case 'journal-publication':
      case 'review-article':
        return html` <a
          class="item-label ${item.type} item-action"
          href="${item.uri}"
          target="_blank"
        >
          ${description}
          <span class="item-action-icon">${Icons.externalLink}</span>
        </a>`;
      case 'reviews':
      case 'response':
        return html` <button
          class="item-label ${item.type} item-action"
          @click="${openHighlight}"
        >
          ${description}
          <span class="item-action-icon">${Icons.eye}</span>
        </button>`;
      default:
        return html`<div class="item-label ${item.type}">${description}</div>`;
    }
  }

  renderGroupPublisher(publisher) {
    const { name, peerReviewPolicy, uri } = publisher;
    const displayName = this.config.publisherName(name);
    const logoUrl = this.config.publisherLogo(name) || PublisherLogos[name];

    const logo = logoUrl
      ? html`<img
          class="group-logo"
          alt="Logo of ${displayName}"
          src="${logoUrl}"
        />`
      : '';
    const nameAndLogo = html`${displayName} ${logo}`;

    let publisherInfo;
    if (uri || peerReviewPolicy) {
      const linkToPublisherHomepage = html`<a href="${uri}" target="_blank"
        >${uri}</a
      >`;
      const linkToPeerReviewPolicy = peerReviewPolicy
        ? html`<a href="${peerReviewPolicy}" target="_blank"
            >Peer Review Policy</a
          >`
        : '';
      const tooltipContent = html`${linkToPublisherHomepage}<br />${linkToPeerReviewPolicy}`;
      publisherInfo = html`
        <spider-tooltip mode="light" show-arrow>
          <div slot="trigger">
            <div class="group-label-inside-tooltip">${nameAndLogo}</div>
          </div>
          <div slot="content">${tooltipContent}</div>
        </spider-tooltip>
      `;
    } else {
      publisherInfo = nameAndLogo;
    }
    return html`<div class="group-label">${publisherInfo}</div>`;
  }

  renderGroupItem(group, item, showPublisher) {
    const publisher = showPublisher
      ? this.renderGroupPublisher(group.publisher)
      : html`<div></div>`;
    const date = item.date
      ? html`
          <div class="item-date">${this.config.formatDate(item.date)}</div>
        `
      : html`<div class="item-date">n/a</div>`;
    const label = this.itemLabel(group, item);
    return html` ${publisher} ${date} ${label} `;
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

  openHighlightHandler(group, item) {
    const self = this;
    function openHighlight(event) {
      self.openHighlight(group, item);
      event.currentTarget.blur();
    }
    return openHighlight;
  }

  renderSummary() {
    const summaries = this.reviewProcess.timeline.groups
      .flatMap(group =>
        group.items.flatMap(item =>
          item.summaries
            ? item.summaries.flatMap(summary =>
                summary ? { group, item, summary } : null
              )
            : null
        )
      )
      .filter(Boolean); // remove undefined values from list
    if (summaries.length > 0) {
      // If there are multiple summaries, use the first one to display in the timeline.
      const { group, item, summary } = summaries[0];
      const openHighlight = this.openHighlightHandler(group, item);
      // must have no extra spaces inside the info text div or they mess up the formatting
      // prettier-ignore
      const infoText = html`This summary was generated automatically based on the content of the reviews. To access the full content of the original reviews, click on "<button class="link" @click="${openHighlight}">Peer Review</button>".`;
      return html`
        <div class="render-rev-summary">
          <h6>
            Automated Summary (<spider-tooltip
              mode="light"
              show-arrow
              position="block-start"
            >
              <button slot="trigger" class="auto-summary-info-trigger link">
                What is this?
              </button>
              <!-- must have no spaces inside the .content div or they mess up the formatting -->
              <!-- prettier-ignore -->
              <div slot="content" class="auto-summary-info">${infoText}</div> </spider-tooltip
            >)
          </h6>
          ${summary}
        </div>
      `;
    }
    return '';
  }

  render() {
    const self = this;
    return html`
      ${this.renderSummary()}
      <div class="render-rev-timeline">
        ${this.reviewProcess.timeline.groups.map(group =>
          self.renderGroup(group)
        )}
      </div>
      <render-rev-highlight
        .config=${this.config}
        .highlightItem=${this.highlightItem}
      ></render-rev-highlight>
    `;
  }
}
window.customElements.define('render-rev-timeline', RenderRevTimeline);
