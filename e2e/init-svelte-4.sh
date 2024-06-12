#!/usr/bin/env sh

npm init vite
# select svelte, js and name "svelte-4"
cd svelte-4

npm install

# install test dependencies
npm install --save-dev svelte-preprocess jest jest-environment-jsdom svelte-jester @babel/preset-env babel-jest @testing-library/svelte@4 @testing-library/jest-dom
# apply all steps from https://github.com/rossyman/svelte-add-jest/blob/main/preset.ts

cd ..
