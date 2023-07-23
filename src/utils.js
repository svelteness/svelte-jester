import { pathToFileURL } from 'url'

export const dynamicImport = async (filename) => import(pathToFileURL(filename).toString())

export const IS_COMMON_JS = typeof module !== 'undefined'

export const isSvelte3 = (version = '4') => version.startsWith('3')
