import fs from 'fs'
import path from 'path'
import transformer from '../transformer'
import sharedTests from './fixtures/shared/commonTransformerTests'

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

describe('ESM transformer', () => {
  it('should transform with config in ESM format', () => {
    const svelteKitConfig = path.resolve(__dirname, './fixtures/sveltekit.config.js')
    const results = runTransformer('BasicComp', { preprocess: svelteKitConfig })
    // this is a little brittle, but it demonstrates that the replacements in
    // "sveltekit.config.js" are working
    expect(results).toContain('text("Bye ");')
  })

  sharedTests({ runTransformer, path })
})
