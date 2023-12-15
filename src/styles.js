import { css } from 'lit';

export const GlobalStyles = css`
  /**
  * The configurable CSS styles for the component.
  *
  * Users of this component can set the --rr-* CSS variables on an ancestor element of this component. This styles section then takes these external variables, or the default value if they are not set, and sets the variables that are used internally.
  */
  .render-rev,
  .render-rev-summary,
  .render-rev-timeline,
  render-rev-highlight {
    --timeline-width: var(--rr-timeline-width, 500px);

    --timeline-line-color: var(--rr-timeline-line-color, grey);
    --timeline-text-color: var(--rr-timeline-text-color, grey);

    --preprint-bg-color: var(--rr-preprint-bg-color, #accbd2);
    --preprint-text-color: var(--rr-preprint-text-color, #056277);

    --reviews-bg-color: var(--rr-reviews-bg-color, #5796a4);
    --reviews-text-color: var(--rr-reviews-text-color, ivory);

    --published-bg-color: var(--rr-published-bg-color, #056277);
    --published-text-color: var(--rr-published-text-color, ivory);

    --highlight-max-width: var(--rr-highlight-max-width, 860px);
    --highlight-height: var(--rr-highlight-height, 94vh);
    --highlight-margin: var(--rr-highlight-margin, 3vh auto);

    --highlight-nav-bg-color: var(
      --rr-highlight-nav-bg-color,
      var(--reviews-bg-color)
    );
    --highlight-nav-text-color: var(
      --rr-highlight-nav-text-color,
      var(--reviews-text-color)
    );

    --timeline-summary-bg-color: var(--rr-timeline-summary-bg-color, #eee);
    --timeline-summary-text-color: var(--rr-timeline-summary-text-color, grey);
  }
  button {
    all: unset;
    cursor: pointer;
  }
  button:focus,
  button:hover {
    filter: invert(50%);
  }

  button.link {
    background: none !important;
    border: none;
    padding: 0 !important;
    /*input has OS specific font-family*/
    color: #069;
    text-decoration: underline;
    cursor: pointer;
  }
`;
