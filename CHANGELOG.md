# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [2.3.1](https://github.com/mihar-22/svelte-jester/compare/v2.3.0...v2.3.1) (2022-02-01)


### Bug Fixes

* drop min node version to `14` for `node-sass` ([aa4508d](https://github.com/mihar-22/svelte-jester/commit/aa4508dd9dcfb68c99c492239c6400bcbab69e5e))

## [2.3.0](https://github.com/mihar-22/svelte-jester/compare/v2.2.0...v2.3.0) (2022-02-01)


### Features

* bump min node version to `16` ([9172250](https://github.com/mihar-22/svelte-jester/commit/917225044ffe0d534da6c60b4650df3b50163ced))

## [2.2.0](https://github.com/mihar-22/svelte-jester/compare/v2.1.5...v2.2.0) (2022-02-01)


### Features

* bump min node version to `14` ([526d3ed](https://github.com/mihar-22/svelte-jester/commit/526d3edffd1a55f66faf21a7b7f3f31426ba195d))


### Bug Fixes

* [ERR_INVALID_ARG_TYPE]: The "id" argument must be of type string. Received an instance of URL ([1384839](https://github.com/mihar-22/svelte-jester/commit/1384839dac8bb87d2a62ef903b4a7587683ef35e))

### [2.1.5](https://github.com/mihar-22/svelte-jester/compare/v2.1.4...v2.1.5) (2021-09-22)


### Bug Fixes

* add preprocess to published files array ([#84](https://github.com/mihar-22/svelte-jester/issues/84)) ([4a10e92](https://github.com/mihar-22/svelte-jester/commit/4a10e923e688727b3a415daa8595e7a03b8f681b))
* allow installation on Node 12 ([7093aee](https://github.com/mihar-22/svelte-jester/commit/7093aeed66dc36d6d61cd15b50a49ee54b6ffcc8))

### [2.1.4](https://github.com/mihar-22/svelte-jester/compare/v2.1.3...v2.1.4) (2021-09-21)


### Bug Fixes

* add back Node 12 support ([#83](https://github.com/mihar-22/svelte-jester/issues/83)) ([e5de1c6](https://github.com/mihar-22/svelte-jester/commit/e5de1c6c6c2e82b0dffb3fc1892abdaa3dc7d414))
* unpin svelte-preprocess ([#82](https://github.com/mihar-22/svelte-jester/issues/82)) ([a48d909](https://github.com/mihar-22/svelte-jester/commit/a48d90913993eb271ac40ee009110d48e39255ba))

### [2.1.3](https://github.com/mihar-22/svelte-jester/compare/v2.1.2...v2.1.3) (2021-09-19)


### Bug Fixes

* invalid transformer export ([#75](https://github.com/mihar-22/svelte-jester/issues/75)) ([4729f0b](https://github.com/mihar-22/svelte-jester/commit/4729f0b65cd0f6d3140551a969a564913ffb9972))
* surface frame on failed Svelte compilation ([a747d96](https://github.com/mihar-22/svelte-jester/commit/a747d9665e180f4365bead8a93b9596d217692e1))

### [2.1.2](https://github.com/mihar-22/svelte-jester/compare/v2.1.1...v2.1.2) (2021-09-12)


### Bug Fixes

* add back process method for CJS support ([#71](https://github.com/mihar-22/svelte-jester/issues/71)) ([6ee7c5c](https://github.com/mihar-22/svelte-jester/commit/6ee7c5c6c15c5f92cf59ee1acaacbf94a3450a05))

### [2.1.1](https://github.com/mihar-22/svelte-jester/compare/v2.1.0...v2.1.1) (2021-08-31)


### Bug Fixes

* file paths in `package.json` pointing to `src` instead of `dist` ([#69](https://github.com/mihar-22/svelte-jester/issues/69)) ([b6f2cbb](https://github.com/mihar-22/svelte-jester/commit/b6f2cbb77e2c1f9976045d841cca2781795b9117))

## [2.1.0](https://github.com/mihar-22/svelte-jester/compare/v2.0.1...v2.1.0) (2021-08-27)


### Features

* build CJS and ESM versions of the library ([#68](https://github.com/mihar-22/svelte-jester/issues/68)) ([d93f2dc](https://github.com/mihar-22/svelte-jester/commit/d93f2dc155820ff0b2843143037d23c2934fc55d))

### [2.0.1](https://github.com/mihar-22/svelte-jester/compare/v2.0.0...v2.0.1) (2021-08-05)


### Bug Fixes

* module not found error ([#60](https://github.com/mihar-22/svelte-jester/issues/60)) ([3748f49](https://github.com/mihar-22/svelte-jester/commit/3748f49949fd8bdf8edf25bb7d7d0a72a27f2950)), closes [#59](https://github.com/mihar-22/svelte-jester/issues/59)

## [2.0.0](https://github.com/mihar-22/svelte-jester/compare/v1.8.2...v2.0.0) (2021-08-04)


### ⚠ BREAKING CHANGES

* async transformers are only supported in Jest `>=27`.

### Features

* avoid creating new node processes by leveraging processAsync ([#57](https://github.com/mihar-22/svelte-jester/issues/57)) ([92760dd](https://github.com/mihar-22/svelte-jester/commit/92760dd821e7685d67ed3d0f0ebff84484db4361))

### [1.8.2](https://github.com/mihar-22/svelte-jester/compare/v1.8.1...v1.8.2) (2021-08-04)


### Bug Fixes

* actually revert async changes -_- ([64c3d4d](https://github.com/mihar-22/svelte-jester/commit/64c3d4dc5a0a9f1f18868ef139686cf10bf70022))

### [1.8.1](https://github.com/mihar-22/svelte-jester/compare/v1.8.0...v1.8.1) (2021-08-04)


### Bug Fixes

* revert "Avoid creating new node processes by leveraging processAsync ([#57](https://github.com/mihar-22/svelte-jester/issues/57))" ([#58](https://github.com/mihar-22/svelte-jester/issues/58)) ([3a3e500](https://github.com/mihar-22/svelte-jester/commit/3a3e500a4815264c8cb6b8c1a4d7415fa2f0fe4a))

## [1.8.0](https://github.com/mihar-22/svelte-jester/compare/v1.7.0...v1.8.0) (2021-08-04)


### Features

* avoid creating new node processes by leveraging processAsync ([#57](https://github.com/mihar-22/svelte-jester/issues/57)) ([d5be238](https://github.com/mihar-22/svelte-jester/commit/d5be238e2ecbaca615947859339a7e5f76eb5abc))
* provide option to show console.logs from preprocessors ([#53](https://github.com/mihar-22/svelte-jester/issues/53)) ([173620a](https://github.com/mihar-22/svelte-jester/commit/173620a7312af994a626d62597ae3971c978bd4f))

## [1.7.0](https://github.com/mihar-22/svelte-jester/compare/v1.6.0...v1.7.0) (2021-06-01)


### Features

* hide console log in preprocess ([#50](https://github.com/mihar-22/svelte-jester/issues/50)) ([91d3cc6](https://github.com/mihar-22/svelte-jester/commit/91d3cc6ab6c44771117513175a6c24eb22470a83))
* support Windows ([#49](https://github.com/mihar-22/svelte-jester/issues/49)) ([48a7506](https://github.com/mihar-22/svelte-jester/commit/48a75061f7ebcaae1d30c514f8775725047d82a8))

## [1.6.0](https://github.com/mihar-22/svelte-jester/compare/v1.5.0...v1.6.0) (2021-05-25)


### Features

* initial SvelteKit support ([#46](https://github.com/mihar-22/svelte-jester/issues/46)) ([0c008d7](https://github.com/mihar-22/svelte-jester/commit/0c008d7e56e03da7d402406655a9edd80dc719cb))

## [1.5.0](https://github.com/mihar-22/svelte-jester/compare/v1.4.0...v1.5.0) (2021-04-22)


### Features

* all process env variables are passed down to child transform process  ([#40](https://github.com/mihar-22/svelte-jester/issues/40)) ([beecf48](https://github.com/mihar-22/svelte-jester/commit/beecf48f2677d5a294f851841896dd0e5779d078))

## [1.4.0](https://github.com/mihar-22/svelte-jester/compare/v1.3.2...v1.4.0) (2021-04-12)


### Features

* allow svelte.config.cjs ([#37](https://github.com/mihar-22/svelte-jester/issues/37)) ([9e259c4](https://github.com/mihar-22/svelte-jester/commit/9e259c4b4d254ee163c67995cacf224e64c229d3)), closes [#35](https://github.com/mihar-22/svelte-jester/issues/35)

### [1.3.2](https://github.com/mihar-22/svelte-jester/compare/v1.3.1...v1.3.2) (2021-03-24)


### Bug Fixes

* use RawSourceMap for sourcemap ([b056107](https://github.com/mihar-22/svelte-jester/commit/b05610769b575c236e66c26e9f480cbb6e2c3ee8))

### [1.3.1](https://github.com/mihar-22/svelte-jester/compare/v1.3.0...v1.3.1) (2021-03-19)


### Bug Fixes

* incorrect coverage lines ([fd629b7](https://github.com/mihar-22/svelte-jester/commit/fd629b73b667f0926873a27b1be59151b4a784e0)), closes [#28](https://github.com/mihar-22/svelte-jester/issues/28)

## [1.3.0](https://github.com/mihar-22/svelte-jester/compare/v1.2.0...v1.3.0) (2020-12-10)


### Features

* allow user to specify `svelte.config` path ([540e986](https://github.com/mihar-22/svelte-jester/commit/540e986bf5bb0bf40eea72056cc5aea62e09f233))

## [1.2.0](https://github.com/mihar-22/svelte-jester/compare/v1.1.5...v1.2.0) (2020-12-09)


### Features

* adds maxBuffer option that sets buffer limit for preprocess ([bd80185](https://github.com/mihar-22/svelte-jester/commit/bd80185d90d09b80989fb6e9af421754c0da938f)), closes [#20](https://github.com/mihar-22/svelte-jester/issues/20)

### [1.1.5](https://github.com/mihar-22/svelte-jester/compare/v1.1.4...v1.1.5) (2020-09-02)


### Bug Fixes

* svelte.config.js should not be required unless preprocessing ([6b3e567](https://github.com/mihar-22/svelte-jester/commit/6b3e56788010d3d00e1fce045470e7e270dad9eb))

### [1.1.4](https://github.com/mihar-22/svelte-jester/compare/v1.1.3...v1.1.4) (2020-09-02)


### Bug Fixes

* use double quotes for windows ([e45313d](https://github.com/mihar-22/svelte-jester/commit/e45313d9680ac9ac14044f9f6d8c8babb49471d2))

### [1.1.3](https://github.com/mihar-22/svelte-jester/compare/v1.1.2...v1.1.3) (2020-08-31)


### Bug Fixes

* error when path to preprocessor contains some characters like '&' ([00e61d8](https://github.com/mihar-22/svelte-jester/commit/00e61d86aaaa764454d8774f9ec63fce01e93869))

### [1.1.2](https://github.com/mihar-22/svelte-jester/compare/v1.1.1...v1.1.2) (2020-08-16)

### [1.1.1](https://github.com/mihar-22/svelte-jester/compare/v1.1.0...v1.1.1) (2020-08-15)


### Bug Fixes

* add svelteconfig.js to files pattern ([a0f57b3](https://github.com/mihar-22/svelte-jester/commit/a0f57b30362dbe53fa5480020cd17e14dcd6011a))

## [1.1.0](https://github.com/mihar-22/svelte-jester/compare/v1.0.6...v1.1.0) (2020-08-15)


### Features

* rootMode option ([531e7d7](https://github.com/mihar-22/svelte-jester/commit/531e7d7ca40a27e82a5bd66f3a8256d3a4325fae))

### [1.0.6](https://github.com/mihar-22/svelte-jester/compare/v1.0.5...v1.0.6) (2020-05-18)


### Bug Fixes

* raise unhandled rejection on child process as uncaught exception ([ae64409](https://github.com/mihar-22/svelte-jester/commit/ae644094bcee93e17ecf3e02f38f29f485ea78c1)), closes [#5](https://github.com/mihar-22/svelte-jester/issues/5)

### [1.0.5](https://github.com/mihar-22/svelte-jester/compare/v1.0.4...v1.0.5) (2020-03-05)

### [1.0.4](https://github.com/mihar-22/svelte-jester/compare/v1.0.3...v1.0.4) (2020-02-14)


### Bug Fixes

* replace sync-rpc due to leaving open handles in jest@25 ([9024ca9](https://github.com/mihar-22/svelte-jester/commit/9024ca93d639c3d7fff863af88d60f2cc8b0b5a4))

### [1.0.3](https://github.com/mihar-22/svelte-jester/compare/v1.0.2...v1.0.3) (2019-12-05)


### Bug Fixes

* cosmiconfig was loading config from pkg if svelte key was defined ([8783131](https://github.com/mihar-22/svelte-jester/commit/8783131a538b6c5263f2069b00d252f44d7acc0e))

### [1.0.2](https://github.com/mihar-22/svelte-jester/compare/v1.0.1...v1.0.2) (2019-12-05)

### 1.0.1 (2019-12-05)
