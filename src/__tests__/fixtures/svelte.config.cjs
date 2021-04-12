const { replace } = require('svelte-preprocess')

module.exports = {
  preprocess: [
    replace([[/Hello/gi, 'Bye']])
  ]
}
