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
        gap: 48px;
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
      }
      .item-date,
      .item-label {
        width: 175px;
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
        width: 98px;

        /* position it above the middle of the item date */
        position: absolute;
        left: -56px;
        top: 4px;

        /* the dots are just dots */
        content: '................................';

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
        left: -89px;
        width: 128px;
      }

      .item-label {
        margin-top: 8px;
        border-radius: 4px;
        position: relative; /* enable absolute positioning for the :before element */
      }
      /* the up-pointing arrow for the item label */
      .item-label::before {
        content: '';
        position: absolute;
        bottom: 100%;
        border-left: 20px solid transparent;
        border-right: 20px solid transparent;
        border-bottom: 12px solid;
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
        border-bottom-color: var(--preprint-bg-color);
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
        border-bottom-color: var(--reviews-bg-color);
      }

      .item-label.journal-publication {
        background: var(--published-bg-color);
        color: var(--published-text-color);
      }
      .item-label.journal-publication:before {
        border-bottom-color: var(--published-bg-color);
      }
    `,
  ];

  tooltipPosition = ['inline-end', 'inline-start'];

  renderGroup(group, isLastGroup) {
    return html`
      <div class="timeline-group ${toClassName(group.publisher.name)}">
        ${this.renderGroupPublisher(group.publisher, isLastGroup)}
        <div class="timeline-items">
          ${group.items.map(
            item => html` <div class="timeline-item">
              ${this.itemDate(item)} ${this.itemLabel(group, item)}
            </div>`
          )}
        </div>
      </div>
    `;
  }
}
window.customElements.define(
  'render-rev-timeline-horizontal',
  RenderRevTimelineHorizontal
);
