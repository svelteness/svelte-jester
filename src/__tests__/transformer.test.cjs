const fs = require('fs')
const path = require('path')
const transformer = require('../transformer')
const sharedTests = require('./fixtures/shared/commonTransformerTests').default

const runTransformer = (filename, options) => {
  const process = transformer.createTransformer(options).process
  const path = require.resolve(`./fixtures/${filename}.svelte`)
  const source = fs.readFileSync(path).toString()
  const result = process(source, path)
  expect(result.code).toBeDefined()
  expect(result.code).toContain('SvelteComponent')
  expect(result.map).toBeDefined()
  return result.code
}

describe('CJS transformer', () => {
  it('should search for "svelte.config.cjs" as well as "svelte.config.js"', () => {
    const results = runTransformer('BasicComp', { preprocess: true, rootMode: 'upward' })
    // this is a little brittle, but it demonstrates that the replacements in
    // "svelte.config.cjs" are working
    expect(results).toContain('text("Bye ");')
  })

  sharedTests({ runTransformer, path })
})
