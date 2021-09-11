const {readFileSync} = require('fs')
const {resolve} = require('path')
const {createTransformer} = require('../../dist/transformer.cjs')

const runTransformer = (filename, options) => {
  const path = require.resolve(`./fixtures/${filename}.svelte`)
  const source = readFileSync(path).toString()
  const result = createTransformer().process(source, path, { transformerConfig: options })
  expect(result.code).toBeDefined()
  expect(result.code).toContain('SvelteComponent')
  expect(result.map).toBeDefined()
  return result.code
}

describe('CJS transformer', () => {
  it('should transform basic component', () => {
    runTransformer('BasicComp')
  })

  it('should transform when using sass preprocessor', () => {
    runTransformer('SassComp', { preprocess: true })
  })

  it('should transform when using full path to preprocess', () => {
    const preprocessPath = resolve(__dirname, '../../_svelte.config.cjs')
    runTransformer('SassComp', { preprocess: preprocessPath })
  })

  it('should search for "svelte.config.cjs" as well as "svelte.config.js"', () => {
    const results = runTransformer('BasicComp', { preprocess: true, rootMode: 'upward' })
    // this is a little brittle, but it demonstrates that the replacements in
    // "svelte.config.cjs" are working
    expect(results).toContain('text("Bye ");')
  })

  it('should transform when using typescript preprocessor', () => {
    runTransformer('TypescriptComp', { preprocess: true })
  })

  it('should transform basic component and keep styles', () => {
    const code = runTransformer('BasicComp')
    expect(code).toContain('add_css(target)')
    expect(code).toContain('.counter.active')
  })

  it('should accept compiler options', () => {
    const code = runTransformer('BasicComp', { compilerOptions: { css: false } })
    expect(code).not.toContain('add_css(target)')
    expect(code).not.toContain('.counter.active')
  })

  it('should output code to console when debug is true', () => {
    console.log = jest.fn()
    const code = runTransformer('BasicComp', { debug: true })
    const esInterop = 'Object.defineProperty(exports, "__esModule", { value: true });'
    expect(console.log).toHaveBeenCalledWith(code.replace(esInterop, ''))
  })

  it('should accept maxBuffer option for preprocess buffer limit', () => {
    expect(
      () => runTransformer('SassComp', { preprocess: true, maxBuffer: 1 })
    ).toThrow(/^spawnSync .* ENOBUFS$/)
    runTransformer('SassComp', { preprocess: true, maxBuffer: 5 * 1024 * 1024 })
  })

  it('should fail, if console.logs are enabled during preprocessing and there is a console.log statement in the svelte config', () => {
    expect(
      () => runTransformer('BasicComp', { preprocess: true, rootMode: 'upward',  showConsoleLog: true })
    ).toThrow(/^Unexpected token T in JSON at position 0$/)
  })

  it('should pass, if console.logs are disabled (default) during preprocessing and there is a console.log statement in the svelte config', () => {
    runTransformer('BasicComp', { preprocess: true, rootMode: 'upward' })
  })

  it('should pass, if console.logs are disabled during preprocessing and there is a console.log statement in the svelte config', () => {
    runTransformer('BasicComp', { preprocess: true, rootMode: 'upward', showConsoleLog: false })
    runTransformer('BasicComp', { preprocess: true, rootMode: 'upward', showConsoleLog: "false" })
  })

  it('should pass and transform process.env.NODE_ENV variable', () => {
    const code = runTransformer('BasicComp', { preprocess: true, rootMode: 'upward' })

    // JEST sets NODE_ENV to test automatically
    expect(code).toContain('test')
  })
})
