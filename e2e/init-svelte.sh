#!/usr/bin/env sh

mkdir svelte
cd svelte
npx degit sveltejs/template . --force

npm install
npm install --save-dev svelte-preprocess jest jest-environment-jsdom svelte-jester @babel/preset-env babel-jest @testing-library/svelte@3 @testing-library/jest-dom

cd ..
