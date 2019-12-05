const svelte = require('svelte/compiler')
const { cosmiconfigSync } = require('cosmiconfig')

function preprocess () {
  return ({ source, filename }) => {
    const config = cosmiconfigSync('svelte').search().config
    return svelte
      .preprocess(source, config.preprocess || {}, { filename })
      .then(r => r.code)
  }
}

module.exports = preprocess
