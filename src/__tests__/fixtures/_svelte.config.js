import { replace } from 'svelte-preprocess'

export default {
  preprocess: [
    replace([
      [/Hello/gi, 'Bye'],
      // replace env var
      [/process\.env\.NODE_ENV/gi, JSON.stringify(process.env.NODE_ENV)]
    ])
  ]
}
