import { css, html, LitElement } from 'lit';
import { markdown } from '../lib/drawdown.js';
import '@spider-ui/tooltip';

import { Icons } from './icons.js';
import { PublisherLogos } from './logos.js';
import './render-rev-highlight.js';
import { GlobalStyles } from './styles.js';

function toClassName(str) {
  return str?.replaceAll(/[^a-zA-Z0-9-_]/g, '') || 'undefined';
}

export class RenderRevTimeline extends LitElement {
  static properties = {
    options: { type: Object },
    reviewProcess: { type: Object },
    highlightItem: { type: Object },
    _config: { state: true, type: Object },
  };

  static styles = [
    GlobalStyles,
    css`
      .render-rev-timeline {
        box-sizing: border-box;
        width: var(--timeline-width);
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

  defaultConfig = {
    formatDate: date =>
      date.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
    itemDescriptions: {},
    publisherLogo: () => null,
    publisherName: name => {
      const nameMap = {
        development: 'Development',
        elife: 'eLife',
        'embo molecular medicine': 'EMM',
        'embo press': 'EMBO Press',
        'embo reports': 'EMBOR',
        'life science alliance': 'LSA',
        'molecular systems biology': 'MSB',
        'peerage of science': 'Peerage of Science',
        'peer ref': 'Peer Ref',
        'plos one': 'PLOS ONE',
        'review commons': 'Review Commons',
        'the embo journal': 'EMBOJ',
      };
      return nameMap[name] || name;
    },
    renderMarkdown: markdown,
    reportSummaryIssue: {
      recipient: 'eeb-feedback@embl.de',
      subject: 'Issue with auto-summary',
      body: (
        uri,
        summary
      ) => `There is an issue with the summary (see below) of the reviews for the preprint ${uri}:

<Please describe the issue with the summary in detail here>

Summary:
${summary}
`,
    },
  };

  openHighlight(group, item) {
    this.shadowRoot.querySelector('render-rev-highlight').show(group, item);
  }

  itemDescription(item) {
    const defaultDescriptions = {
      'journal-publication': 'Published',
      'preprint-posted': 'Preprint',
      response: 'Reply',
      'review-article': 'Review',
      reviews: 'Peer Review',
    };
    const customDescription = this._config.itemDescriptions
      ? this._config.itemDescriptions[item.type]
      : null;
    return customDescription || defaultDescriptions[item.type] || item.type;
  }

  itemLabel(group, item) {
    const openHighlight = this.openHighlightHandler(group, item);
    const description = this.itemDescription(item);
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

  itemDate(item) {
    return item.date
      ? html`<div class="item-date">${this._config.formatDate(item.date)}</div>`
      : html`<div class="item-date">n/a</div>`;
  }

  tooltipPosition = ['block-end', 'block-start'];

  renderGroupPublisher(publisher, isLastGroup) {
    const { name, peerReviewPolicy, uri } = publisher;
    const displayName = this._config.publisherName(name);
    const logoUrl = this._config.publisherLogo(name) || PublisherLogos[name];

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
      const tooltipPosition = isLastGroup
        ? this.tooltipPosition[1]
        : this.tooltipPosition[0];
      publisherInfo = html`
        <spider-tooltip mode="light" show-arrow position="${tooltipPosition}">
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

  renderGroupItem(group, item, showPublisher, isLastGroup) {
    const publisher = showPublisher
      ? this.renderGroupPublisher(group.publisher, isLastGroup)
      : html`<div></div>`;
    const date = this.itemDate(item);
    const label = this.itemLabel(group, item);
    return html` ${publisher} ${date} ${label} `;
  }

  renderGroup(group, isLastGroup) {
    const self = this;
    return html`
      <div class="timeline-group ${toClassName(group.publisher.name)}">
        ${group.items.map((item, idx) =>
          self.renderGroupItem(group, item, idx === 0, isLastGroup)
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

  render() {
    const self = this;
    if (!this.reviewProcess) {
      return '';
    }

    const externalOptions = this.options || {};
    const config = {
      ...this.defaultConfig,
      ...externalOptions,
    };
    config.reportSummaryIssue = {
      ...this.defaultConfig.reportSummaryIssue,
      ...externalOptions.reportSummaryIssue,
    };

    // prefill the reportSummaryIssue body with the doi
    const reportSummaryIssueBody = config.reportSummaryIssue.body;
    const { uri } = this.reviewProcess.timeline.groups[0].items[0];
    config.reportSummaryIssue.body = summary =>
      reportSummaryIssueBody(uri, summary);
    this._config = config;

    return html`
      <div class="render-rev-timeline">
        ${this.reviewProcess.timeline.groups.map((group, idx) =>
          self.renderGroup(
            group,
            idx === this.reviewProcess.timeline.groups.length - 1
          )
        )}
      </div>
      <render-rev-highlight
        .config=${this._config}
        .highlightItem=${this.highlightItem}
      ></render-rev-highlight>
    `;
  }
}
window.customElements.define('render-rev-timeline', RenderRevTimeline);
