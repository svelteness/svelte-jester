// const log = require('why-is-node-running')
const { basename } = require('path')
const { execSync } = require('child_process')
const svelte = require('svelte/compiler')
const { getSvelteConfig } = require('./svelteconfig.cjs')

const transformer = (options = {}) => async (source, filename) => {
  const { preprocess, rootMode, maxBuffer, showConsoleLog } = options
  if (!preprocess) {
    return compiler(options, filename, source)
  }

  const svelteConfig = getSvelteConfig(rootMode, filename, preprocess)

  const processed = await svelte.preprocess(source, svelteConfig.preprocess || {}, { filename })

  return compiler(options, filename, processed.code, processed.map)
}

const compiler = (options = {}, filename, processedCode, processedMap) => {
  const { debug, compilerOptions } = options

  const result = svelte.compile(processedCode, {
    filename: basename(filename),
    css: true,
    accessors: true,
    dev: true,
    format: 'cjs',
    sourcemap: processedMap,
    ...compilerOptions
  })

  if (debug) {
    console.log(result.js.code)
  }

  const esInterop = 'Object.defineProperty(exports, "__esModule", { value: true });'

  return {
    code: result.js.code + esInterop,
    map: JSON.stringify(result.js.map)
  }
}

exports.createTransformer = (options) => ({
  processAsync: transformer(options)
})
