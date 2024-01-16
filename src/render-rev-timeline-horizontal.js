import { css, html } from 'lit';
import '@spider-ui/tooltip';

import { RenderRevTimeline } from './render-rev-timeline.js';
import { GlobalStyles } from './styles.js';

function toClassName(str) {
  return str?.replaceAll(/[^a-zA-Z0-9-_]/g, '') || 'undefined';
}

export class RenderRevTimelineHorizontal extends RenderRevTimeline {
  static styles = [
    GlobalStyles,
    css`
      .render-rev-timeline {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 32px;
      }
      .timeline-items {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 16px;
      }
      .group-label,
      .item-date,
      .item-label {
        display: flex;
        /* centered vertically and horizontally */
        align-items: center;
        justify-content: center;
        line-height: 16px;
        height: 32px;
        min-width: 150px;
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
        height: 16px;
        width: 64px;

        /* position it above the middle of the item date */
        position: absolute;
        left: -42px;
        /*
         * The date element is 100px wide, the line itself 20px. In order for the line
         * to be centered its right edge therefore has to be at:
         * (100px / 2) - (20px / 2) = 40px
         */
        top: 4px;

        /* the dots are just dots */
        content: '................';

        /* these settings control how many dots are visible */
        font-family: 'Courier New', Courier, monospace;
        font-size: 16px;
        font-style: normal;
        font-weight: 800;
        height: 24px;
        overflow: hidden;
      }
      /* the dotted lines between groups are longer than the ones between items */
      .timeline-group:not(:first-child)
        .timeline-item:first-child
        .item-date::before {
        left: -60px;
        width: 88px;
      }

      /* create the down-pointing arrow for the item label */
      .item-label {
        margin-bottom: 8px;
        position: relative; /* enable absolute positioning for the :before element */
      }
      .item-label::before {
        content: '';
        position: absolute;
        top: 100%;
        border-left: 20px solid transparent;
        border-right: 20px solid transparent;
        border-top: 12px solid;
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
        border-top-color: var(--preprint-bg-color);
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
        border-top-color: var(--reviews-bg-color);
      }

      .item-label.journal-publication {
        background: var(--published-bg-color);
        color: var(--published-text-color);
      }
      .item-label.journal-publication:before {
        border-top-color: var(--published-bg-color);
      }
    `,
  ];

  renderGroup(group) {
    return html`
      <div class="timeline-group ${toClassName(group.publisher.name)}">
        <div class="timeline-items">
          ${group.items.map(
            item => html` <div class="timeline-item">
              ${this.itemLabel(group, item)} ${this.itemDate(item)}
            </div>`
          )}
        </div>
        ${this.renderGroupPublisher(group.publisher)}
      </div>
    `;
  }
}
window.customElements.define(
  'render-rev-timeline-horizontal',
  RenderRevTimelineHorizontal
);
