import { execSync } from 'child_process'
import { basename } from 'path'
import { pathToFileURL } from 'url'
import * as svelte from 'svelte/compiler'

import { getSvelteConfig } from './svelteconfig.js'

const dynamicImport = async (filename) => import(pathToFileURL(filename).toString())

/**
 * Jest will only call this method when running in ESM mode.
 */
const processAsync = async (source, filename, jestOptions) => {
  const options = jestOptions && jestOptions.transformerConfig ? jestOptions.transformerConfig : {}
  const { preprocess, rootMode } = options

  if (!preprocess) {
    return compiler('esm', options, filename, source)
  }

  const svelteConfigPath = getSvelteConfig(rootMode, filename, preprocess)
  const svelteConfig = await dynamicImport(svelteConfigPath)
  const processed = await svelte.preprocess(
    source,
    svelteConfig.default.preprocess || {},
    { filename }
  )

  return compiler('esm', options, filename, processed.code, processed.map)
}

/**
 * Starts a new process, so is higher overhead than processAsync.
 * However, Jest calls this method in CJS mode.
 */
const processSync = (source, filename, jestOptions) => {
  const options = jestOptions && jestOptions.transformerConfig ? jestOptions.transformerConfig : {}
  const { preprocess, rootMode, maxBuffer, showConsoleLog } = options
  if (!preprocess) {
    return compiler('cjs', options, filename, source)
  }

  const svelteConfig = getSvelteConfig(rootMode, filename, preprocess)
  const preprocessor = require.resolve('./preprocess.js')

  const preprocessResult = execSync(
        `node --experimental-vm-modules -unhandled-rejections=strict --abort-on-uncaught-exception "${preprocessor}"`,
        {
          env: { ...process.env, source, filename, svelteConfig, showConsoleLog },
          maxBuffer: maxBuffer || 10 * 1024 * 1024
        }
  ).toString()

  const parsedPreprocessResult = JSON.parse(preprocessResult)
  return compiler('cjs', options, filename, parsedPreprocessResult.code, parsedPreprocessResult.map)
}

const compiler = (format, options = {}, filename, processedCode, processedMap) => {
  const { debug, compilerOptions } = options

  let result

  try {
    result = svelte.compile(processedCode, {
      filename: basename(filename),
      css: true,
      accessors: true,
      dev: true,
      format,
      sourcemap: processedMap,
      ...compilerOptions
    })
  } catch (error) {
    let msg = error.message
    if (error.frame) {
      msg += '\n' + error.frame
    }
    console.error(msg)
    throw error
  }

  if (debug) {
    console.log(result.js.code)
  }

  const esInterop = format === 'cjs' ? 'Object.defineProperty(exports, "__esModule", { value: true });' : ''

  return {
    code: result.js.code + esInterop,
    map: JSON.stringify(result.js.map)
  }
}

export default {
  process: processSync,
  processAsync
}
