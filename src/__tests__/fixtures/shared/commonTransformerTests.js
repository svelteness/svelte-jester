const sharedTests = (dependencies) => {
  const { path, runTransformer } = dependencies

  it('should transform basic component', () => {
    runTransformer('BasicComp')
  })

  it('should transform when using sass preprocessor', () => {
    runTransformer('SassComp', { preprocess: true })
  })

  it('should transform when using full path to preprocess', () => {
    const preprocessPath = path.resolve(__dirname, '../../../../_svelte.config.cjs')
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

  it('should pass and transform process.env.NODE_ENV variable', () => {
    const code = runTransformer('BasicComp', { preprocess: true, rootMode: 'upward' })

    // JEST sets NODE_ENV to test automatically
    expect(code).toContain('test')
  })
}

export default sharedTests
