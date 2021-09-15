/**
 * @jest-environment jsdom
 */

// NOTE: jest-dom adds handy assertions to Jest and it is recommended, but not required.
import '@testing-library/jest-dom'

import {render, fireEvent} from '@testing-library/svelte'

import Comp from './App'

test('shows proper heading when rendered', () => {
  const {getByText} = render(Comp, {name: 'World'})

  expect(getByText('Hello World!')).toBeInTheDocument()
})
