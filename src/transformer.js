import { basename } from "path";
import { pathToFileURL } from "url";
import svelte from "svelte/compiler";

import { getSvelteConfig } from "./svelteconfig";

const dynamicImport = async (filename) => import(pathToFileURL(filename));

const transformer =
  (options = {}) =>
  async (source, filename) => {
    const { preprocess, rootMode } = options;
    if (!preprocess) {
      return compiler(options, filename, source);
    }

    const svelteConfigPath = getSvelteConfig(rootMode, filename, preprocess);
    const svelteConfig = await dynamicImport(svelteConfigPath);
    const processed = await svelte.preprocess(
      source,
      svelteConfig.default.preprocess || {},
      { filename }
    );

    return compiler(options, filename, processed.code, processed.map);
  };

const compiler = (options = {}, filename, processedCode, processedMap) => {
  const { debug, compilerOptions } = options;

  const result = svelte.compile(processedCode, {
    filename: basename(filename),
    css: true,
    accessors: true,
    dev: true,
    format: "esm",
    sourcemap: processedMap,
    ...compilerOptions,
  });

  if (debug) {
    console.log(result.js.code);
  }

  const esInterop =
    'Object.defineProperty(exports, "__esModule", { value: true });';

  return {
    code: result.js.code + esInterop,
    map: JSON.stringify(result.js.map),
  };
};

const createTransformer = (options) => ({
  processAsync: transformer(options),
});

export default createTransformer;
