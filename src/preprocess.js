const path = require('path')
const svelte = require('svelte/compiler')
const { cosmiconfigSync } = require('cosmiconfig')

const { source, filename } = process.env
const configPath = path.join(process.cwd(), 'svelte.config.js')
const config = cosmiconfigSync().load(configPath).config

svelte
  .preprocess(source, config.preprocess || {}, { filename })
  .then(r => { process.stdout.write(r.code) })
