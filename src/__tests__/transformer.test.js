import fs from 'fs'
import path from 'path'
import transformer from '../transformer'
import sharedTests from './fixtures/shared/commonTransformerTests'

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

describe('ESM transformer', () => {
  it('should transform with config in ESM format', async () => {
    const svelteKitConfig = path.resolve(__dirname, './fixtures/sveltekit.config.js')
    const results = await runTransformer('BasicComp', { preprocess: svelteKitConfig })
    // this is a little brittle, but it demonstrates that the replacements in
    // "sveltekit.config.js" are working
    expect(results).toContain('text("Bye ");')
  })

  sharedTests({ runTransformer, path })
})
