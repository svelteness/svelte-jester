const path = require('path')
const svelte = require('svelte/compiler')
const { cosmiconfigSync } = require('cosmiconfig')

function preprocess () {
  return ({ source, filename }) => {
    // TODO: Can svelte.config.js be anywhere else?
    const configPath = path.join(process.cwd(), 'svelte.config.js')
    const config = cosmiconfigSync().load(configPath).config
    return svelte
      .preprocess(source, config.preprocess || {}, { filename })
      .then(r => r.code)
  }
}

module.exports = preprocess
