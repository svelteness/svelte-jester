import { preprocess } from 'svelte/compiler'
const { source, filename, svelteConfig } = process.env

// redefine console.log to hide its output, so it does not interfer with the svelte-compiler
if (console) {
  console.log = console.error = console.info = console.debug = console.warn = console.trace = console.dir = console.dirxml = console.group = console.groupEnd = console.time = console.timeEnd = console.assert = console.profile = () => {}
}

import(svelteConfig).then(configImport => {
  // ESM or CommonJS
  const config = configImport.default ? configImport.default : configImport

  preprocess(source, config.preprocess || {}, { filename }).then((r) => {
    process.stdout.write(JSON.stringify(r))
  })
}).catch(err => process.stderr.write(err))
