const fs = require('fs')
const path = require('path')

const configFilenames = ['svelte.config.js', 'svelte.config.cjs']

exports.getSvelteConfig = (rootMode, filename, preprocess) => {
  let configFile = null

  if ('boolean' === typeof preprocess) {
    configFile = rootMode === 'upward'
      ? findConfigFile(path.dirname(filename))
      : getConfigFile(process.cwd())
  } else if('string' === typeof preprocess) {
    configFile = preprocess
  }

  if (configFile === null || !fs.existsSync(configFile)) {
    throw Error(`Could not find ${configFilenames.join(' or ')}`)
  }

  return configFile
}

const getConfigFile = (searchDir) => {
  for (const configFilename of configFilenames) {
    const filePath = path.resolve(searchDir, configFilename)
    if (fs.existsSync(filePath)) {
      return filePath
    }
  }

  return null
}

const findConfigFile = (searchDir) => {
  const filePath = getConfigFile(searchDir)
  if (filePath !== null) {
    return filePath
  }

  const parentDir = path.resolve(searchDir, '..')
  return parentDir !== searchDir
    ? findConfigFile(parentDir)
    : null // Stop walking at filesystem root
}
