import json from '@rollup/plugin-json';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';

export default {
  input: 'index.js',
  output: [
    {
      file: 'dist/render-rev.js',
      format: 'iife',
      name: 'renderRev',
    },
    {
      file: 'dist/render-rev.min.js',
      format: 'iife',
      name: 'renderRev',
      plugins: [terser()],
    },
    {
      file: 'dist/render-rev.es.js',
      format: 'es',
    },
  ],
  plugins: [json(), nodeResolve()],
};
