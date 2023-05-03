# \<render-rev>

Visualizing the peer review process.

render-rev is a [Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components)-based Javascript package
that fetches data about the peer review process of a preprint and displays it in the form of a timeline.
The timeline contains the most important points of the process such as reviews and author replies:

![An example image of how render-rev displays the peer review process as a timeline.](./docs/assets/sample-timeline.png)

If available, the full text of peer reviews and author replies can be viewed in a built-in reader:

![An example image of how render-rev displays the full text of reviews and responses.](./docs/assets/sample-detail-view.png)

render-rev was built by [EMBO's Open Science Implementation Group](https://www.embo.org/policy/open-science/) for [EMBO Press](https://www.embopress.org/). The project was funded by the Wellcome Trust (Learned Society Curation Award 221510/Z/20/Z).

## DocMaps

All data about the review process is fetched from the [Early Evidence Base (EEB)](https://eeb.embo.org/) API in the DocMaps format.

The DocMaps framework is used at EMBO Press to describe the peer review process that a scientific article went through.
Given the DOI of an article, the EEB service returns a list of DocMap objects that each describe a single round of the peer review process.

A DocMap consists of one or more ordered steps.
Each step has inputs, and actions that were taken during the step, outputs, and assertions about the article that hold after this step.

As an example, a round of reviews with 3 peer reviews and a reply by the article authors could consist of two steps:
1. Step: reviews
   - input: the article under review
   - actions: 3 referees each writing a review
   - outputs: the 3 reviews
   - assertion: that the article is peer-reviewed
2. Step: author reply
   - inputs: the 3 reviews from the previous step
   - action: the article authors writing a reply to the reviews
   - output: an author reply
   - assertion: that the article authors have replied to the reviews

The DocMaps documentation can be found at [https://docmaps.knowledgefutures.org/pub/sgkf1pqa/release/7](https://docmaps.knowledgefutures.org/pub/sgkf1pqa/release/7)

## Installation

```bash
npm i render-rev
```

## Usage

Importing the render-rev package automatically register the \<render-rev> custom element.
Use this element and pass it the DOI of the preprint you want to display:

```html
<script type="module">
  import 'render-rev/render-rev.js';
</script>

<render-rev doi="10.1101/2020.07.20.212886"></render-rev>
```

## Customization

To customize the look of the rendered review process, or to pass in data from an
external source, use the `.configure()` method of the element:

```html
<render-rev id="render-rev-0"></render-rev>

<script type="module">
  import 'render-rev/render-rev.js';
  const renderRevElement = document.getElementById('render-rev-0');
  renderRevElement.configure({
    doi: '10.1101/2020.07.20.212886',
    display: {
      publisherName: name => name.toUpperCase(),
    }
  });
</script>
```

### Configuration Options

* `debug`: Passing a truthy value activates detailed logging during DocMaps parsing.
* `docmaps`: Pass in an array of DocMaps that represent the review process of a preprint. Overrides both the configuration option and the custom element attribute named `doi`.
* `docmapsUrl`: A callable that receives a DOI and returns a URL that returns an array of DocMaps in JSON format. Defaults to a function that returns `https://eeb.embo.org/api/v2/docmaps/${doi}`.
* `doi`: Display the review process of the preprint with this DOI. Overrides the value passed to the `doi` custom element attribute.
* `display`: Pass in an object to configure how the review process is displayed with one of the following keys:
  * `formatDate`: A callable that receives a Date object and returns a string representation of this date. Dates passed to this function are displayed in the timeline and above the full-text of reviews and responses in the highlight viewer. By default dates are formatted as `<Name of month abbreviated> <Day of month>, <Year>`, e.g. `Feb 24, 2020`.
  * `publisherLogo`: A callable that receives the name of a publisher and returns a URL to the icon that should be displayed next to the publisher's name, or a falsy value if no icon should be displayed. By default some publisher logos are included, e.g. for bioRxiv, EMBO Press journals, or eLife. Example:
    ```Javascript
    {
      publisherLogo: name => {
        const publisherLogosById = {
          'bioRxiv': 'https://www.biorxiv.org/sites/default/files/images/favicon.ico',
          'embo press': 'https://www.embopress.org/favicon.ico',
        }
        return publisherLogosById[name] || null;
      }
    }
    ```
  * `publisherName`: A callable that receives the name of a publisher and returns how it should be displayed. This publisher name is what's displayed on the left side of the timeline. The default is to return the received name unchanged for unknown publishers and use the correct capitalization for known publishers like bioRxiv, EMBO Press, etc. Can be used to e.g. correct capitalization or use abbreviations:
    ```Javascript
    {
      publisherName: name => {
        const publisherNamesById = {
          'elife': 'eLife',
          'embo journal': 'EMBOJ',
        }
        return publisherNamesById[name] || name;
      }
    }
    ```
  * `renderMarkdown`: A callable that takes a Markdown-formatted string and return an HTML representation of it. Is used to render the full text of reviews and replies. Uses the very small [drawdown library](https://github.com/adamvleggett/drawdown/) by default. Other possibilites are e.g. [marked](https://github.com/markedjs/marked) or [markdown-it](https://github.com/markdown-it/markdown-it):
    ```Javascript
    { renderMarkdown: marked.parse }
    ```
* `highlightDoi`: Automatically open the highlight viewer for the review or response with this DOI.
* `reportSummaryIssue`: Pass in an object to configure how the "Report issue" button for the auto-summaries works:
  * `recipient`: The email address that should receive the issue reports. Defaults to `eeb-feedback@embl.de`.
  * `subject`: The subject line of the issue report. Defaults to `Issue with auto-summary`.
  * `body`: A callable that receives the DOI of the preprint and the text of the auto-summary and returns the body of the issue report. Defaults to a function that returns an explanatory text.
    ```Javascript
    {
      reportSummaryIssue: {
        body: (doi, summary) => `There is an issue with the auto-summary for ${doi}:\n\n${summary}`
      }
    }
    ```

### Styling

The component uses [CSS custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties) to enable custom styling of some aspects of the rendered review process.
Set the properties on the custom element or one of its ancestors to override the default values.

These are the available options:
* `--rr-timeline-width`: The width of the timeline. Defaults to `500px`.

* `--rr-timeline-line-color`: The color of the line that connects the timeline items. Defaults to `grey`.
* `--rr-timeline-text-color`: The color of the text in the timeline (publisher names, dates). Defaults to `grey`.

* `--rr-preprint-bg-color`: The background color of the preprint items in the timeline. Defaults to `#accbd2`.
* `--rr-preprint-text-color`: The text color of the preprint items in the timeline. Defaults to `#056277`.

* `--rr-reviews-bg-color`: The background color of the reviews items in the timeline. Defaults to `#5796a4`.
* `--rr-reviews-text-color`: The text color of the reviews items in the timeline. Defaults to `ivory`.

* `--rr-published-bg-color`: The background color of the published items in the timeline. Defaults to `#056277`.
* `--rr-published-text-color`: The text color of the published items in the timeline. Defaults to `ivory`.

* `--rr-highlight-max-width`: The maximum width of the highlight viewer. Defaults to `860px`.
* `--rr-highlight-height`: The height of the highlight viewer. Defaults to `94vh`.
* `--rr-highlight-margin`: The margin of the highlight viewer. Defaults to `3vh auto`.

* `--rr-highlight-nav-bg-color`: The background color of the navigation bar in the highlight viewer. Defaults to the background color of the reviews items.
* `--rr-highlight-nav-text-color`: The text color of the navigation bar in the highlight viewer. Defaults to the text color of the reviews items.

* `--rr-timeline-summary-bg-color`: The background color of the automated summary in the timeline. Defaults to `#eee`.
* `--rr-timeline-summary-text-color`: The text color of the automated summary in the timeline. Defaults to `grey`.


## Development

The project is scaffolded with [Open Web Components](https://open-wc.org/) and built with [Lit](https://lit.dev/).

### Linting and formatting

To scan the project for linting and formatting errors, run

```bash
npm run lint
```

To automatically fix linting and formatting errors, run

```bash
npm run format
```

### Testing with Web Test Runner

To execute a single test run:

```bash
npm run test
```

To run the tests in interactive watch mode run:

```bash
npm run test:watch
```


### Tooling configs

For most of the tools, the configuration is in the `package.json` to minimize the amount of files in the project.

### Local Demo with `web-dev-server`

```bash
npm start
```

To run a local development server that serves the basic demo located in `demo/index.html`
