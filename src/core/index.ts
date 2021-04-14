/*
 * Copyright (c) 2017-2021 Benoît Lahoz.
 */

import { AppManager } from './manager'

import Ipc from './ipc'
// TODO, see: https://github.com/andywer/threads-plugin/issues/39
// import Connectivity from './connectivity'
import App from './app'
import Signal from './signal'

AppManager.addModules([
  // Order matters
  Ipc,
  App,
  // TODO: Connectivity
  Signal
])
.then(() => {
  AppManager.init()
})
.catch(err => {
  console.error(err)
  process.exit(1)
})

// Exit cleanly on request from parent process in development mode.
/*
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    // TODO
    process.on('SIGTERM', () => {
      console.log('QUITS SIGTERM')
      setTimeout(() => {
        app.quit()
      }, 1000)
    })
    process.on('SIGHUP', () => {
      console.log('QUITS SIGHUP')
      setTimeout(() => {
        app.quit()
      }, 1000)
    })
    process.on('SIGINT', () => {
      console.log('QUITS SIGINT')
      setTimeout(() => {
        app.quit()
      }, 1000)
    })
    process.on('exit', () => {
      console.log('QUITS exit')
      AppManager.unref()
      setTimeout(() => {
        app.quit()
      }, 1000)
    })
    process.on('cleanup', () => {
      console.log('CLEANUP')
    })
    
  }
}
*/