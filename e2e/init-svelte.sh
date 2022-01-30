#!/usr/bin/env sh

mkdir svelte
cd svelte
npx degit sveltejs/template . --force

npm install
npm install --save-dev svelte-preprocess jest svelte-jester @babel/preset-env babel-jest @testing-library/svelte @testing-library/jest-dom

cd ..
