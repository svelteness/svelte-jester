import sveltePreprocess from 'svelte-preprocess'
import adapter from '@sveltejs/adapter-static'
const { replace, typescript } = sveltePreprocess

console.log('This should not influence the compiler/preprocessor')

const config = {
  kit: {
    adapter: adapter
  },
  preprocess: [
    typescript(),
    replace([
      // strip style tag
      [/<!--[^]*?-->|<style(\s[^]*?)?(?:>([^]*?)<\/style>|\/>)/gi, ''],
      [/Hello/gi, 'Bye'],
      // replace env var
      [/process\.env\.NODE_ENV/gi, JSON.stringify(process.env.NODE_ENV)]
    ])
  ]
}
export default config
