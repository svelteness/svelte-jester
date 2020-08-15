<div align="center">
<h1>svelte-jester</h1>

<p>
Simply precompiles Svelte components before importing them into Jest tests.
</p>

[![version][version-badge]][package]
[![MIT License][license-badge]][license]
</div>

<hr />

## Table of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Why not just use x?](#why-not-just-use-x)
- [Installation](#installation)
  - [Babel](#babel)
  - [TypeScript](#typescript)
  - [Preprocess](#preprocess)
- [Options](#options)
- [Testing Library](#testing-library)
- [Credits](#credits)
- [LICENSE](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Why not just use x?

Seems like other libraries won't working with preprocessors, won't maintained actively or didn't
have proper licensing.

## Installation

This library has `peerDependencies` listings for `svelte >= 3`.

`npm install svelte-jester -D`

Add the following to your Jest config

```json
{
  "transform": {
    "^.+\\.svelte$": "svelte-jester"
  },
  "moduleFileExtensions": [
    "js",
    "svelte"
  ]
}
```

### Babel

```npm install @babel/core @babel/preset-env babel-jest -D```

Add the following to your Jest config

```json
"transform": {
  "^.+\\.js$": "babel-jest",
  "^.+\\.svelte$": "svelte-jester"
}
```

Create a `.babelrc` and add the following

```json
{
  "presets": [["@babel/preset-env", { "targets": { "node": "current" } }]]
}
```

### TypeScript

To enable TypeScript support you'll need to setup [`svelte-preprocess`](https://github.com/sveltejs/svelte-preprocess) and [`ts-jest`](https://github.com/kulshekhar/ts-jest).

1. Install `typescript`, `svelte-preprocess`, and `ts-jest`:

   ```shell
   npm install typescript svelte-preprocess ts-jest -D
   ```

1. Create a `svelte.config.js` at the root of your project:

   ```js
   const sveltePreprocess = require("svelte-preprocess");

   module.exports = {
     preprocess: sveltePreprocess({
       // ...
     }),
   };
   ```

   To learn what options you can pass to `sveltePreprocess`, please refer to the [documentation](https://github.com/sveltejs/svelte-preprocess/blob/master/docs/preprocessing.md#typescript).

1. In your Jest config, enable preprocessing for `svelte-jester`, and add `ts-jest` as a transform:

   ```json
   "transform": {
     "^.+\\.svelte$": [
       "svelte-jester",
       {
         "preprocess": true
       }
     ],
     "^.+\\.ts$": "ts-jest"
   }
   ```

Note that TypeScript supports ES modules, so if you were previously using babel-jest just for ES module transpilation, you can remove babel-jest, babel, and any associated presets and config.
By default, ts-jest will only transpile .ts files though, so if you want to continue using ES modules in .js files, you'll need to configure ts-jest to process .js files as well.
To do this, update the file glob above, and follow the instructions in the [ts-jest docs](https://kulshekhar.github.io/ts-jest/).

### Preprocess

Preprocessors are loaded from `svelte.config.js`.

Add the following to your Jest config

```json
"transform": {
  "^.+\\.js$": "babel-jest",
  "^.+\\.svelte$": ["svelte-jester", { "preprocess": true }]
}
```

Create a `svelte.config.js` file and configure it, see 
[svelte-preprocess](https://github.com/kaisermann/svelte-preprocess) for more information.

## Options

`preprocess` (default: false): Pass in `true` if you are using Svelte preprocessors. 
They are loaded from `svelte.config.js`.

`debug` (default: false): If you'd like to see the output of the compiled code then pass in `true`.

`compilerOptions` (default: {}): Use this to pass in 
[Svelte compiler options](https://svelte.dev/docs#svelte_compile).

`rootMode` (default: ""): Pass in `upward` to walk up from each file's directory and return the first `svelte.config.js` found, or throw an error if no config file is discovered. This is particularly useful in a monorepo using Jest projects as it allows each package to have it's own `svelte.config.js`, and is similar to Babel's `rootMode`. Default behaviour is to look for a `svelte.config.js` in the root directory.

```json
"transform": {
  "^.+\\.js$": "babel-jest",
  "^.+\\.svelte$": ["svelte-jester", { 
    "preprocess": false,
    "debug": false,
    "compilerOptions": {},
    "rootMode": ""
  }]
}
```

## Testing Library

This package is required when using Svelte with the [Testing Library](https://testing-library.com/). 
If you'd like to avoid including implementation details in your tests, and making them more 
maintainble in the long run, then consider checking out 
[@testing-library/svelte](https://github.com/testing-library/svelte-testing-library).

## Credits

Thanks to all contributors, inspired by:

- https://github.com/pngwn/svelte-test
- https://github.com/WeAreGenki/minna-ui
- https://github.com/rspieker/jest-transform-svelte

## LICENSE

[MIT](LICENSE)

<!-- prettier-ignore-start -->
[package]: https://www.npmjs.com/package/svelte-jester
[version-badge]: https://img.shields.io/npm/v/svelte-jester
[license]: https://github.com/mihar-22/svelte-jester/blob/master/LICENSE
[license-badge]: https://img.shields.io/github/license/mihar-22/svelte-jester?color=b
<!-- prettier-ignore-end -->
