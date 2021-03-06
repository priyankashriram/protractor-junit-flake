import styles from 'chalk'
import { resolve, join } from 'path'

const DEFAULT_OPTIONS = {
  nodeBin: 'node',
  maxAttempts: 3,
  protractorArgs: [],
  // set color to one of the colors available at 'chalk' - https://github.com/chalk/ansi-styles#colors
  // set false to disable coloring
  color: 'magenta',
  resultsXmlPath: join(process.cwd(), '/results/*.xml')
}

function parseOptions (providedOptions) {
  let options = Object.assign({}, DEFAULT_OPTIONS, providedOptions)

  // normalizing options.color to be a boolean or a color value
  if (!(options.color in styles)) {
    if (options.color === false || options.color === 'false') {
      options.color = false
    } else {
      throw new Error('Invalid color option. Color must be one of the supported chalk colors: https://github.com/chalk/ansi-styles#colors')
    }
  }

  if (options.protractorPath) {
    options.protractorPath = resolve(options.protractorPath)
  } else {
    // '.../node_modules/protractor/lib/protractor.js'
    let protractorMainPath = require.resolve('protractor')
    // '.../node_modules/protractor/bin/protractor'
    options.protractorPath = resolve(protractorMainPath, '../../bin/protractor')
  }

  return options
}

export default parseOptions
