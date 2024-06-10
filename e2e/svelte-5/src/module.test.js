import { test } from '@jest/globals'

// TODO(mcous, 2024-05-23): this import fails
// See https://github.com/svelteness/svelte-jester/pull/283
// import * as Subject from "./module.svelte.js";

test.skip('get current count', () => {
  const subject = Subject.createCounter()
  const result = subject.count

  expect(result).toBe(0)
})

test.skip('increment', () => {
  const subject = Subject.createCounter()

  subject.increment()
  const result = subject.count

  expect(result).toBe(1)
})
