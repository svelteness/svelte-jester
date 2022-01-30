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

# add basic component from https://testing-library.com/docs/svelte-testing-library/example#test under __src/__
# add basic sample from https://testing-library.com/docs/svelte-testing-library/example#test under __src/test/__
# add svelte.config.js (CJS-style) from https://github.com/sveltejs/language-tools/blob/master/docs/preprocessors/in-general.md#generic-setup
```

## SvelteKit (ESM)

### Bootstrapping the project

The following steps were executed to create the source for this test.

(mostly from https://github.com/rossyman/svelte-add-jest)

```
cd sveltekit
npm init svelte@next
# choose Demo App, typescript, no linter, no formatter
npm install

# add Jest
npx apply rossyman/svelte-add-jest
# choose Jest DOM, typescript, sample file, jsdom by default
npm install
# change path for svelte-jester in `jest.config.json` to `[
        "../../dist/transformer.mjs",
        {
          "preprocess": true
        }
      ]`
# move jsdom comment to the top in `src/lib/routes/index-dom.spec.ts`
npm run test
```

