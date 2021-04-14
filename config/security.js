/*
 * Copyright (c) 2017-2021 Benoît Lahoz.
 */

const path = require('path')

module.exports = {
  nodeIntegration: false,
  contextIsolation: true,
  enableRemoteModule: false,
  sandbox: true,
  // Path to the preload file in the final dist folder.
  preload: path.resolve(__dirname, 'preload.js'),
}