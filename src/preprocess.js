import { preprocess } from 'svelte/compiler'
import { pathToFileURL } from 'url'

const { source, filename, svelteConfig } = process.env
import(pathToFileURL(svelteConfig)).then(configImport => {
  // ESM or CommonJS
  const config = configImport.default ? configImport.default : configImport

  preprocess(source, config.preprocess || {}, { filename }).then((r) => {
    process.stdout.write(JSON.stringify(r))
  })
}).catch(err => process.stderr.write(err))
