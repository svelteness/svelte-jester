/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/svelte';
import Index from './index.svelte';

/**
 * An example test suite outlining the usage of
 * `describe()`, `beforeEach()`, `test()` and `expect()`
 *
 * @see https://jestjs.io/docs/getting-started
 * @see https://github.com/testing-library/jest-dom
 */

describe('Index', () => {

  describe('once the component has been rendered', () => {
    test('should show the proper heading', () => {
      expect(render(Index).getByText(/SvelteKit/)).toBeInTheDocument();
    });
  });

});
