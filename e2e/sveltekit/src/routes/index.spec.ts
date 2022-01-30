/**
 * An example test suite outlining the usage of
 * `describe()`, `beforeEach()`, `test()` and `expect()`
 *
 * @see https://jestjs.io/docs/getting-started
 */

 describe('Index', () => {

  let isTestSuitePassing = false;

  beforeEach(() => {
    isTestSuitePassing = true;
  });

  describe('isTestSuitePassing', () => {

    test('should be true', () => {
      expect(isTestSuitePassing).toBe(true);
    });

  });

});
