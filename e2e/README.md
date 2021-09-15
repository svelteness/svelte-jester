# End-to-End test for Svelte/SvelteKit using svelte-jester

## Svelte (CJS)

### Bootstrapping the project

The following steps were executed to create the source for this test.

(mostly from https://svelte.dev/blog/the-easiest-way-to-get-started and https://testing-library.com/docs/svelte-testing-library/setup)

```
cd svelte
npx degit sveltejs/template . --force
npm install
npm install --save-dev jest svelte-jester @babel/preset-env babel-jest testing-library/svelte @testing-library/jest-dom
# follow all the steps from https://testing-library.com/docs/svelte-testing-library/setup
# add basic sample from https://testing-library.com/docs/svelte-testing-library/example#test
# add jsdom environment to the top of the test
/**
 * @jest-environment jsdom
 */
# add svelte.config.js from https://wmzy.github.io/svelte-cli/config/#svelte-config-js and https://github.com/sveltejs/language-tools/issues/397#issue-669762537
```

## SvelteKit (ESM)

### Bootstrapping the project

The following steps were executed to create the source for this test.

(mostly from https://github.com/rossyman/svelte-add-jest)

```
cd sveltekit
npm init svelte@next
# choose typescript, no linter/formatter
npx apply rossyman/svelte-add-jest
# choose typescript
npm install
# change path in `jest.config.json` for svelte-jester to `"../../dist/transformer.mjs"`
# move jsdom comment to the top in `src/lib/routes/index-dom.spec.ts`
npm run test
```

