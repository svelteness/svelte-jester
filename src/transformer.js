// const log = require('why-is-node-running')
const { basename } = require('path')
const { execSync } = require('child_process')
const svelte = require('svelte/compiler')
const { getSvelteConfig } = require('./svelteconfig.js')

const transformer = (options = {}) => (source, filename) => {
  const { debug, compilerOptions, preprocess, rootMode } = options

  let processed = source

  if (preprocess) {
    const svelteConfig = getSvelteConfig(rootMode, filename)
    const preprocessor = require.resolve('./preprocess.js')
    processed = execSync(`node --unhandled-rejections=strict --abort-on-uncaught-exception "${preprocessor}"`, {
      env: { PATH: process.env.PATH, source, filename, svelteConfig }
    }).toString()
  }

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
