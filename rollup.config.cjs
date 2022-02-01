const resolve = require('@rollup/plugin-node-resolve').default
const copy = require('rollup-plugin-copy-assets')
const pkg = require('./package.json')

const external = [].concat(
  Object.keys(pkg.peerDependencies),
  'svelte/compiler'
)

const input = 'src/transformer.js'

module.exports = [
  {
    input,
    output: {
      file: 'dist/transformer.cjs',
      format: 'cjs',
      exports: 'default'
    },
    external,
    plugins: [
      resolve(),
      copy({
        assets: [
          'src/preprocess.js'
        ]
      })
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
]
