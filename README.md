# \<render-rev>

Visualizing the peer review process.

render-rev is a [Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components)-based Javascript package
that fetches data about the peer review process of a preprint and displays it in the form of a timeline.
If available, the full text of peer reviews and author replies can be read in a built-in reader.
All data is fetched from the [Early Evidence Base (EEB)](https://eeb.embo.org/) API.

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
