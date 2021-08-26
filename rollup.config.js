const resolve = require('@rollup/plugin-node-resolve').default;
const pkg = require('./package.json');

const external = [].concat(
  Object.keys(pkg.peerDependencies),
  'svelte/compiler'
);

const input = 'src/transformer.js';

module.exports = [
  {
    input,
    output: {
      file: 'dist/transformer.cjs',
      format: 'cjs'
    },
    external,
    plugins: [
      resolve()
    ]
  },
  {
    input,
    output: {
      file: 'dist/transformer.mjs',
      format: 'esm'
    },
    external,
    plugins: [
      resolve()
    ]
  }
];
