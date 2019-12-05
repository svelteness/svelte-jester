const fs = require('fs')
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

  it('should transform when using typescript preprocessor', () => {
    runTransformer('TypescriptComp', { preprocess: true })
  })

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
})
