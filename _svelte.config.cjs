const { replace } = require('svelte-preprocess')

module.exports = {
  preprocess: [
    // strip style tag
    replace([[/<!--[^]*?-->|<style(\s[^]*?)?(?:>([^]*?)<\/style>|\/>)/gi, '']])
  ]
}
