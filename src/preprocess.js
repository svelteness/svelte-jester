import { preprocess } from 'svelte/compiler'

const { source, filename, svelteConfig } = process.env
import(svelteConfig).then(configImport => {
  // ESM or CommonJS
  const config = configImport.default ? configImport.default : configImport

  preprocess(source, config.preprocess || {}, { filename }).then((r) => {
    process.stdout.write(JSON.stringify(r))
  })
}).catch(err => process.stderr.write(err))
