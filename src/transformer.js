import { execSync } from 'child_process'
import { basename } from 'path'
import { pathToFileURL } from 'url'
import * as svelte from 'svelte/compiler'

import { getSvelteConfig } from './svelteconfig.js'

const dynamicImport = async (filename) => import(pathToFileURL(filename).toString())

/**
 * Jest will only call this method when running tests in ESM mode.
 */
const processAsync = async (source, filename, jestOptions) => {
  const format = (jestOptions?.extensionsToTreatAsEsm || []).includes('.svelte') ? 'esm' : 'cjs'
  if (format !== 'esm') {
    throw new Error("jest is calling svelte-jester's processAsync method, but .svelte was not found in extensionsToTreatAsEsm. This is unexpected.")
  }
  const compilerOptions = jestOptions?.transformerConfig || {}
  const { preprocess, rootMode } = compilerOptions

  if (!preprocess) {
    return compiler(format, compilerOptions, filename, source)
  }

  const svelteConfigPath = getSvelteConfig(rootMode, filename, preprocess)
  const svelteConfig = await dynamicImport(svelteConfigPath)
  const processed = await svelte.preprocess(
    source,
    svelteConfig.default.preprocess || {},
    { filename }
  )

  return compiler(format, compilerOptions, filename, processed.code, processed.map)
}

/**
 * Starts a new process, so is higher overhead than processAsync.
 * Jest calls this method when running tests in CJS mode.
 */
const processSync = (source, filename, jestOptions) => {
  const format = (jestOptions?.extensionsToTreatAsEsm || []).includes('.svelte') ? 'esm' : 'cjs'
  if (format !== 'cjs') {
    throw new Error("jest is calling svelte-jester's processSync method, but .svelte was found in extensionsToTreatAsEsm. This is unexpected.")
  }
  const compilerOptions = jestOptions?.transformerConfig || {}
  const { preprocess, rootMode, maxBuffer, showConsoleLog } = compilerOptions
  if (!preprocess) {
    return compiler(format, compilerOptions, filename, source)
  }

  const svelteConfig = getSvelteConfig(rootMode, filename, preprocess)
  const preprocessor = require.resolve('./preprocess.js')

  const preprocessResult = execSync(
        `node --unhandled-rejections=strict --abort-on-uncaught-exception "${preprocessor}"`,
        {
          env: { ...process.env, source, filename, svelteConfig, showConsoleLog },
          maxBuffer: maxBuffer || 10 * 1024 * 1024
        }
  ).toString()

  const parsedPreprocessResult = JSON.parse(preprocessResult)
  return compiler(format, compilerOptions, filename, parsedPreprocessResult.code, parsedPreprocessResult.map)
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
