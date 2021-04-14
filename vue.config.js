const { gui, electronBuilder } = require('./config')

const config = {
  ...gui,
  pluginOptions: {
    ...electronBuilder
  }
}

module.exports = config