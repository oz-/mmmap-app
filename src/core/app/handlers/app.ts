import { app, BrowserWindow } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'

import { App } from '../types'
import { M } from '@/shared'

import powerSaver from '@/core/app/power'
import { AppManager } from '@/core/app/manager'

const isDevelopment = process.env.NODE_ENV !== 'production'

/**
 * Manages Electron's app object listeners.
 * 
 * @module AppHandlers
 * @category Main
 * @subcategory App
 * 
 * @exports init
 * @exports unref
 */

/**
 * Initializes power monitor and setup listeners on 'app'.
 */
const init = () => {

  // Configures app
  // app.allowRendererProcessReuse = false

  // Setups the power saver behavior.
  powerSaver.init()

  // Adds app listeners.
  app.on(App.Event.READY, onReady)
  app.on(App.Event.ACTIVATE, onActivate)
  app.on(App.Event.BEFORE_QUIT, onBeforeQuit)
  app.on(App.Event.QUIT, onQuit)

}

/**
 * Tears down power monitor and remove listeners on 'app'.
 */
const unref = () => {

  // Removes app listeners
  app.off(App.Event.READY, onReady)
  app.off(App.Event.ACTIVATE, onActivate)
  app.off(App.Event.BEFORE_QUIT, onBeforeQuit)
  app.off(App.Event.QUIT, onQuit)

}

const onReady = async () => {

  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  } else {
    // TODO: pass protocol name to config file.
    createProtocol('app')
  }

  // Asks listeners (window module) to create the splash window.
  AppManager.emit(M.Window.CREATE, 'core.splash')

}

const onActivate = () => {
  if (BrowserWindow.getAllWindows().length === 0) {

    // FIXME: That should not appear, as we quit when windows length is 0

    // Creates only the main window: Everything must have been loaded yet
    /*
    createWindow(windows.main)
    .catch(err => {
      // TODO: Present error to the user
      console.error('Unable to create windows: ', err)
    })
    */

  }
}

const onBeforeQuit = () => {
  // Stop power saver
  powerSaver.unref()
  // Tries to unref all modules
  AppManager.unref()
}

const onQuit = () => {

  // If 'before-quit' wasn't fired, make sure everything is unreferenced

  // Stop power saver
  powerSaver.unref()
  // Unref AppManager
  AppManager.unref()
}

export default {
  init,
  unref
}