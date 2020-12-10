const fs = require('fs')
const path = require('path')

const configFilename = 'svelte.config.js'

exports.getSvelteConfig = (rootMode, filename, preprocess) => {
  let configFile = ''

  if ('boolean' === typeof preprocess) {
    const configDir = rootMode === 'upward'
      ? getConfigDir(path.dirname(filename))
      : process.cwd()
    configFile = path.resolve(configDir, configFilename)
  } else if('string' === typeof preprocess) {
    configFile = preprocess
  }

  if (!fs.existsSync(configFile)) {
    throw Error(`Could not find ${configFilename}`)
  }

  return configFile
}

const getConfigDir = (searchDir) => {
  if (fs.existsSync(path.join(searchDir, configFilename))) {
    return searchDir
  }

  const parentDir = path.resolve(searchDir, '..')
  return parentDir !== searchDir
    ? getConfigDir(parentDir)
    : searchDir // Stop walking at filesystem root
}
