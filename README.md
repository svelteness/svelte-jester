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

If you're using SvelteKit, you can setup and install with [svelte-add-jest](https://github.com/rossyman/svelte-add-jest) by running:

```
npx apply rossyman/svelte-add-jest
```

### Manual install

This library has `peerDependencies` listings for `svelte >= 3`.

`npm install svelte-jester -D`

Add the following to your Jest config

```json
{
  "transform": {
    "^.+\\.svelte$": "svelte-jester"
  },
  "moduleFileExtensions": ["js", "svelte"]
}
```

### Babel

`npm install @babel/core @babel/preset-env babel-jest -D`

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
  },
  "moduleFileExtensions": [
    "js",
    "ts",
    "svelte"
  ]
```

However if you do not want to create a `svelte.config.js` at the root of your
project or you wish to use a custom config just for tests, you may pass the
path to the config file to the `preprocess` option thus:

```json
  "transform": {
    "^.+\\.svelte$": [
      "svelte-jester",
      {
        "preprocess": "/some/path/to/svelte.config.js"
      }
    ],
    "^.+\\.ts$": "ts-jest"
  },
  "moduleFileExtensions": [
    "js",
    "ts",
    "svelte"
  ]
```

Note that TypeScript supports ES modules, so if you were previously using babel-jest just for ES module transpilation, you can remove babel-jest, babel, and any associated presets and config.

By default, ts-jest will only transpile .ts files though, so if you want to continue using ES modules in .js files, you'll need to configure ts-jest to process .js files as well.
To do this, update the file glob above, and follow the instructions in the [ts-jest docs](https://kulshekhar.github.io/ts-jest/).

### Preprocess

Preprocessors are loaded from `svelte.config.js` or `svelte.config.cjs`.

Add the following to your Jest config

```json
"transform": {
  "^.+\\.svelte$": ["svelte-jester", { "preprocess": true }]
}
```

Create a `svelte.config.js` file and configure it, see
[svelte-preprocess](https://github.com/kaisermann/svelte-preprocess) for more information.

In CJS mode, `svelte-jester` must start a new a process for each file needing to be preprocessed, which adds a performance overheads.

In ESM mode, this isn't necessary. You can set `NODE_OPTIONS=--experimental-vm-modules` and `"extensionsToTreatAsEsm": [".svelte"]` to run in ESM mode. However, [mocking support is limited, experimental, and undocumented in ESM mode with `unstable_mockModule`](https://github.com/facebook/jest/issues/10025).

## Options

`preprocess` (default: false): Pass in `true` if you are using Svelte preprocessors.
They are loaded from `svelte.config.js` or `svelte.config.cjs`.

`debug` (default: false): If you'd like to see the output of the compiled code then pass in `true`.

`compilerOptions` (default: {}): Use this to pass in
[Svelte compiler options](https://svelte.dev/docs#svelte_compile).

`rootMode` (default: ""): Pass in `upward` to walk up from the transforming file's directory and use the first `svelte.config.js` or `svelte.config.cjs` found, or throw an error if no config file is discovered. This is particularly useful in a monorepo as it allows you to:

- Run tests from the worktree root using Jest projects where you only want to put `svelte.config.js` in workspace folders, and not in the root.
- Run tests from the worktree root using Jest projects, but have different `svelte.config.js` configurations for individual workspaces.
- Have one common `svelte.config.js` in your worktree root (or any directory above the file being transformed) without needing individual `svelte.config.js` files in each workspace. _Note - this root config file can be overriden if necessary by putting another config file into a workspace folder_

The default mode is to load `svelte.config.js` or `svelte.config.cjs` from the current project root to avoid the risk of accidentally loading a config file from outside the current project folder.

When `upward` is set it will stop at the first config file it finds above the file being transformed, but will walk up the directory structure all the way to the filesystem root if it cannot find any config file. This means that if there is no `svelte.config.js` or `svelte.config.cjs` file in the project above the file being transformed, it is always possible that someone will have a forgotten config file in their home directory which could cause unexpected errors in your builds.

### CJS mode options

`showConsoleLog` (default: false): If you'd like to see console.logs of the preprocessors then pass in `true`. Otherwise these will be surpressed, because the compiler could complain about unexpected tokens.

`maxBuffer` (default: 10485760): Sets limit for buffer when `preprocess` is true. It defines the largest amount of data in bytes allowed on stdout or stderr for [child_process.spawnSync](https://nodejs.org/api/child_process.html#child_process_child_process_spawnsync_command_args_options). If exceeded, the child process is terminated and any output is truncated. The default value of 10Mb overrides Node's default value of 1Mb.

```json
"transform": {
  "^.+\\.js$": "babel-jest",
  "^.+\\.svelte$": ["svelte-jester", { 
    "preprocess": false,
    "debug": false,
    "compilerOptions": {},
    "rootMode": "",
    "maxBuffer": 15000000
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
