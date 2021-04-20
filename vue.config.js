const { vue, electronBuilder } = require('./config')

const config = {
  ...vue,
  pluginOptions: {
    ...electronBuilder
  }
}

module.exports = config