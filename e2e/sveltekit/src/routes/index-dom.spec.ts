/**
 * @jest-environment jsdom
 */
import { jest } from '@jest/globals'
import { render, RenderResult } from '@testing-library/svelte';
import Index from './Counter.svelte';

/**
 * An example test suite outlining the usage of
 * `describe()`, `beforeEach()`, `test()` and `expect()`
 *
 * @see https://jestjs.io/docs/getting-started
 * @see https://github.com/testing-library/jest-dom
 */

describe('Index', () => {

  let renderedComponent: RenderResult<Index>;

  beforeEach(() => {
    renderedComponent = render(Index);
  });

  describe('once the component has been rendered', () => {

    test('should show the proper label', () => {
      expect(renderedComponent.getByLabelText(/Decrease the counter by one/)).toBeInTheDocument();
    });

  });

});
