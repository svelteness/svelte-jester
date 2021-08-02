const fs = require('fs')
const path = require('path')
const transformer = require('../transformer')
const sharedTests = require('./fixtures/shared/commonTransformerTests').default

const runTransformer = async (filename, options) => {
  const processAsync = transformer.createTransformer(options).processAsync
  const path = require.resolve(`./fixtures/${filename}.svelte`)
  const source = fs.readFileSync(path).toString()
  const result = await processAsync(source, path)
  expect(result.code).toBeDefined()
  expect(result.code).toContain('SvelteComponent')
  expect(result.map).toBeDefined()
  return result.code
}

describe('CJS transformer', () => {
  it('should search for "svelte.config.cjs" as well as "svelte.config.js"', async () => {
    const results = await runTransformer('BasicComp', { preprocess: true, rootMode: 'upward' })
    // this is a little brittle, but it demonstrates that the replacements in
    // "svelte.config.cjs" are working
    expect(results).toContain('text("Bye ");')
  })

  sharedTests({ runTransformer, path })
})
