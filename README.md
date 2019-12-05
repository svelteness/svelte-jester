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

```json
"transform": {
  "^.+\\.js$": "babel-jest",
  "^.+\\.svelte$": ["svelte-jester", { 
    "preprocess": false,
    "debug": false,
    "compilerOptions": {}
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
[package]: https://www.npmjs.com/package/mihar-22/svelte-jester
[version-badge]: https://img.shields.io/npm/v/mihar-22/svelte-jester
[license]: https://github.com/mihar-22/svelte-jester/blob/master/LICENSE
[license-badge]: https://img.shields.io/github/license/mihar-22/svelte-jester?color=b
<!-- prettier-ignore-end -->
