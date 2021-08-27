import { basename } from 'path'
import { pathToFileURL } from 'url'
import * as svelte from 'svelte/compiler'

import { getSvelteConfig } from './svelteconfig.js'

const dynamicImport = async (filename) => import(pathToFileURL(filename))

export const processAsync = async (source, filename, jestOptions) => {
  const options = jestOptions?.transformerConfig ?? {}
  const { preprocess, rootMode } = options

  if (!preprocess) {
    return compiler(options, filename, source)
  }

  const svelteConfigPath = getSvelteConfig(rootMode, filename, preprocess)
  const svelteConfig = await dynamicImport(svelteConfigPath)
  const processed = await svelte.preprocess(
    source,
    svelteConfig.default.preprocess || {},
    { filename }
  )

  return compiler(options, filename, processed.code, processed.map)
}

const compiler = (options = {}, filename, processedCode, processedMap) => {
  const { debug, compilerOptions } = options

  const result = svelte.compile(processedCode, {
    filename: basename(filename),
    css: true,
    accessors: true,
    dev: true,
    format: 'esm',
    sourcemap: processedMap,
    ...compilerOptions
  })

  if (debug) {
    console.log(result.js.code)
  }

  return {
    code: result.js.code,
    map: JSON.stringify(result.js.map)
  }
}

export default {
  processAsync
}
