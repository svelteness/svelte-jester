import { pathToFileURL } from 'url'
import * as SvelteCompiler from 'svelte/compiler'

export const dynamicImport = async (filename) => import(pathToFileURL(filename).toString())

export const IS_COMMON_JS = typeof module !== 'undefined'

export const isSvelte3 = (version = SvelteCompiler.VERSION) => version.startsWith('3')

export const DEFAULT_SVELTE_MODULE_INFIX = ['.svelte.']

export const DEFAULT_SVELTE_MODULE_EXT = ['.js', '.ts']

export const isSvelteModule = (filename) =>
  typeof SvelteCompiler.compileModule === 'function' &&
  DEFAULT_SVELTE_MODULE_INFIX.some((infix) => filename.includes(infix)) &&
  DEFAULT_SVELTE_MODULE_EXT.some((ext) => filename.endsWith(ext))
