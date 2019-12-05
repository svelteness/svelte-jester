const { basename } = require('path')
const svelte = require('svelte/compiler')
const forceSync = require('sync-rpc')

const syncPreprocess = forceSync(require.resolve('./preprocess.js'))

const transformer = (options = {}) => (source, filename) => {
  const { debug, compilerOptions, preprocess } = options

  const processed = !preprocess ? source : syncPreprocess({ source, filename })

  const result = svelte.compile(processed, {
    filename: basename(filename),
    css: true,
    accessors: true,
    dev: true,
    format: 'cjs',
    ...compilerOptions
  })

  if (debug) {
    console.log(result.js.code)
  }

  const esInterop = 'Object.defineProperty(exports, "__esModule", { value: true });'

  return {
    code: result.js.code + esInterop,
    map: result.js.map
  }
}

exports.createTransformer = (options) => ({
  process: transformer(options)
})
