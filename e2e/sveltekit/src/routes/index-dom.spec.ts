/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/svelte';
import Counter from './Counter.svelte';

/**
 * @see https://jestjs.io/docs/getting-started
 * @see https://github.com/testing-library/jest-dom
 */

describe('Index', () => {

  describe('once the component has been rendered', () => {

    test('should show the proper label', () => {
      expect(render(Counter).getByLabelText(/Decrease the counter by one/)).toBeInTheDocument();
    });

  });

});
