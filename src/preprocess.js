import { preprocess } from 'svelte/compiler'

const { source, filename, svelteConfig } = process.env
const configImport = await import(svelteConfig)

// ESM or CommonJS
const config = configImport.default ? configImport.default : configImport

preprocess(source, config.preprocess || {}, { filename }).then((r) => {
  process.stdout.write(JSON.stringify(r))
})
