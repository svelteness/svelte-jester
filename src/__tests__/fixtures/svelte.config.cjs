const { replace, typescript } = require('svelte-preprocess')

console.log('This should not influence the compiler/preprocessor')

module.exports = {
  preprocess: [
    typescript(),
    replace([
      [/Hello/gi, 'Bye'],
      // replace env var
      [/process\.env\.NODE_ENV/gi, JSON.stringify(process.env.NODE_ENV)]
    ])
  ]
}
