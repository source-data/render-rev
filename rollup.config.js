import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';

export default {
  input: 'index.js',
  output: [
    {
      file: 'dist/render-rev.iife.js',
      format: 'iife',
      name: 'renderRev',
      sourcemap: true,
    },
    {
      file: 'dist/render-rev.iife.min.js',
      format: 'iife',
      name: 'renderRev',
      plugins: [terser()],
      sourcemap: true,
    },
    {
      file: 'dist/render-rev.esm.js',
      format: 'es',
      sourcemap: true,
    },
  ],
  plugins: [
    json(),
    nodeResolve({ browser: true }), // Assume resolution for browser environment
    commonjs(), // Convert CommonJS modules to ES6
  ],
};
