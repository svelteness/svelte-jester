const fs = require('fs')
const path = require('path')
const transformer = require('../transformer')

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

describe('transformer', () => {
  it('should transform basic component', () => {
    runTransformer('BasicComp')
  })

  it('should transform when using sass preprocessor', () => {
    runTransformer('SassComp', { preprocess: true })
  })

  it('should transform when using full path to preprocess', () => {
    const preprocessPath = path.resolve(__dirname, '../../_svelte.config.js')
    runTransformer('SassComp', { preprocess: preprocessPath })
  })

  it('should search for "svelte.config.cjs" as well as "svelte.config.js"', () => {
    const results = runTransformer('BasicComp', { preprocess: true, rootMode: "upward" })
    // this is a little brittle, but it demonstrates that the replacements in
    // "svelte.config.cjs" are working
    expect(results).toContain('text("Bye ");')
  })

  // TODO: it works but it's really slow, it might have to do with the preprocessor.
  // it('should transform when using typescript preprocessor', () => {
  //   runTransformer('TypescriptComp', { preprocess: true })
  // })

  it('should transform basic component and keep styles', () => {
    const code = runTransformer('BasicComp')
    expect(code).toContain('add_css()')
    expect(code).toContain('.counter.active')
  })

  it('should accept compiler options', () => {
    const code = runTransformer('BasicComp', { compilerOptions: { css: false } })
    expect(code).not.toContain('add_css()')
    expect(code).not.toContain('.counter.active')
  })

  it('should output code to console when debug is true', () => {
    global.window.console.log = jest.fn()
    const code = runTransformer('BasicComp', { debug: true })
    const esInterop = 'Object.defineProperty(exports, "__esModule", { value: true });'
    expect(global.window.console.log).toHaveBeenCalledWith(code.replace(esInterop, ''))
  })

  it('should accept maxBuffer option for preprocess buffer limit', () => {
    expect(
      () => runTransformer('SassComp', { preprocess: true, maxBuffer: 1 })
    ).toThrow('spawnSync /bin/sh ENOBUFS')
    runTransformer('SassComp', { preprocess: true, maxBuffer: 5 * 1024 * 1024 })
  })
})
