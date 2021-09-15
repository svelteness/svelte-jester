# End-to-End test for Svelte/Sveltekit using svelte-jester

## Sveltekit

### Bootstrapping the project

The following steps were executed to create the source for this test.

(mostly from https://github.com/rossyman/svelte-add-jest)

```
npm init svelte@next
# choose typescript, no linter/formatter
npx apply rossyman/svelte-add-jest
# choose typescript
npm install
# change path in `jest.config.json` for svelte-jester to `"../../dist/transformer.mjs"`
# move jsdom comment to the top in `src/lib/routes/index-dom.spec.ts`
npm run test
```

