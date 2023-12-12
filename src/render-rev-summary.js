import { css, html, LitElement } from 'lit';
import { GlobalStyles } from './styles.js';
import '@spider-ui/tooltip';

export class RenderRevSummary extends LitElement {
  static properties = {
    config: { type: Object },
    reviewProcess: { type: Object },
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
    `,
  ];

  getSummaryToRender() {
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
    if (summaries.length === 0) {
      return { group: null, item: null, summary: null };
    }
    // If there are multiple summaries, use the first one to display in the timeline.
    return summaries[0];
  }

  render() {
    if (!this.reviewProcess) {
      return '';
    }
    this.config = this.config || {};
    const { group, item, summary } = this.getSummaryToRender();
    if (!summary) {
      return '';
    }
    // must have no extra spaces inside the info text div or they mess up the formatting
    let infoText;
    if (this.config && this.config.openHighlightHandler) {
      const openHighlight = this.openHighlightHandler(group, item);
      // prettier-ignore
      infoText = html`This summary was generated automatically based on the content of the reviews. To access the full content of the original reviews, click on "<button class="link" @click="${openHighlight}">Peer Review</button>".`;
    } else {
      // prettier-ignore
      infoText = html`This summary was generated automatically based on the content of the reviews. To access the full content of the original reviews, click on "Peer Review" in the timeline.`;
    }
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
}
window.customElements.define('render-rev-summary', RenderRevSummary);
