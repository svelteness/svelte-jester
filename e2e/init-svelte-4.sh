#!/usr/bin/env sh

npm init vite
# select svelte, js and name "svelte-4"
cd svelte-4

pnpm install

# install test dependencies
pnpm install --save-dev svelte-preprocess jest jest-environment-jsdom svelte-jester@workspace @testing-library/svelte@4 @testing-library/jest-dom
# apply all steps from https://github.com/rossyman/svelte-add-jest/blob/main/preset.ts

# add svg transformer
pnpm i -D jest-svg-transformer@https://github.com/Em-Ant/jest-transformer-svg
# add transform config to package.json `"^.+\\.svg$": "jest-svg-transformer"`

cd ..
