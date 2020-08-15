const fs = require('fs')
const path = require('path')

const configFilename = 'svelte.config.js'

exports.getSvelteConfig = (rootMode, filename) => {
  const configDir = rootMode === 'upward'
    ? getConfigDir(path.dirname(filename))
    : getConfigDir(process.cwd())
  return path.resolve(configDir, configFilename)
}

const getConfigDir = (searchDir) => {
  if (fs.existsSync(path.join(searchDir, configFilename))) {
    return searchDir
  }
  else if (searchDir === process.cwd()) {
    throw Error(`Could not find ${configFilename}`)
  }
  else {
    return getConfigDir(path.resolve(searchDir, '..'))
  }
}