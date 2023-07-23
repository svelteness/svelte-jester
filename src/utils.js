import { pathToFileURL } from 'url'
import { VERSION } from 'svelte/compiler'

export const dynamicImport = async (filename) => import(pathToFileURL(filename).toString())

export const IS_COMMON_JS = typeof module !== 'undefined'

export const isSvelte3 = (version = VERSION) => version.startsWith('3')
