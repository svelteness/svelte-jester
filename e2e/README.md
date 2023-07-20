# End-to-End test for Svelte/SvelteKit using svelte-jester

## Svelte (CJS)

### Bootstrapping the project

The following steps were executed to create the source for this test.

(mostly from https://svelte.dev/blog/the-easiest-way-to-get-started and https://testing-library.com/docs/svelte-testing-library/setup)

```
./init-svelte.sh

# add the following config to your package.json (mostly from https://testing-library.com/docs/svelte-testing-library/setup but with our own transformer)
  "jest": {
    "transform": {
      "^.+\\.js$": "babel-jest",
      "^.+\\.svelte$": [
        "../../dist/transformer.cjs",
        {
          "preprocess": true
        }
      ]
    },
    "moduleFileExtensions": ["js", "svelte"],
    "setupFilesAfterEnv": ["@testing-library/jest-dom/extend-expect"],
    "testEnvironment": "jsdom"
  },
  "babel": {
    "presets": [["@babel/preset-env", {"targets": {"node": "current"}}]]
  }

# remove `type: "module",` from `package.json`

# add basic component from https://testing-library.com/docs/svelte-testing-library/example/#component under __src/__
# add basic sample from https://testing-library.com/docs/svelte-testing-library/example#test under __src/test/__
# add svelte.config.js (CJS-style) from https://github.com/sveltejs/language-tools/blob/master/docs/preprocessors/in-general.md#generic-setup
```

### Run the tests

Start the tests with `npm run e2e:svelte`

## SvelteKit (ESM)

### Bootstrapping the project

The following steps were executed to create the source for this test.

(mostly from https://github.com/rossyman/svelte-add-jest)

```
mkdir sveltekit
cd sveltekit
npm init svelte
# choose Demo App, typescript, no linter, no formatter, no Playwright, no Vitest
npm install

# remove comments from `tsconfig.json` or svelte-add-jest will fail with `SyntaxError: Unexpected token / in JSON at position 271`
# add Jest
npx apply rossyman/svelte-add-jest
# choose Jest DOM, typescript, sample file, jsdom by default

# downgrade some versions
npm install --save-dev typescript@4 svelte@3
# change path for svelte-jester in `jest.config.json` to `[
        "../../dist/transformer.mjs",
        {
          "preprocess": true
        }
      ]`

# edit `src/routes/index-dom.spec.ts``
# add `import { jest } from '@jest/globals'`
# replace component `import Index from './Counter.svelte';`
# change test, because of failing $app/stores mock
test('should show the proper label', () => {
      expect(renderedComponent.getByLabelText(/Decrease the counter by one/)).toBeInTheDocument();
    });
# check that the tests are passing
npm run test
```

