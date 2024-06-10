import { mount, unmount, tick } from 'svelte'

import Subject from './legacy.svelte'

let component

afterEach(() => {
  unmount(component)
  component = undefined
})

test('render', () => {
  component = mount(Subject, {
    target: document.body,
    props: { name: 'alice' }
  })

  const button = document.querySelector('button')

  expect(button).toHaveRole('button')
})

test('interaction', async () => {
  component = mount(Subject, {
    target: document.body,
    props: { name: 'alice' }
  })

  const button = document.querySelector('button')

  button.click()
  await tick()

  const message = document.querySelector('p')

  expect(message.textContent).toMatch(/hello alice/iu)
})
