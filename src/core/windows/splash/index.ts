import { systemPreferences } from 'electron'

import { AppManager } from '@/core/app/manager'
import { MobiuszWindow } from '@/libs/window'
import { M } from '@/shared'

import Updater from '@/core/updater'

import options from './config'
import menu from './menu'
import { role } from './role'
import { WindowsEvent } from '@/libs/window/types'



export class SplashWindow extends MobiuszWindow {

  public static role = role

  constructor() {
    super(options)

    // Prepares listeners
    this.onWindowLoaded = this.onWindowLoaded.bind(this)
    this.onUpdaterDone = this.onUpdaterDone.bind(this)
    this.onUpdaterError = this.onUpdaterError.bind(this)
    this.onWindowDone = this.onWindowDone.bind(this)

    // Creates menu
    menu.init()

    // Listens fo full load of window
    this._win!.webContents.once(WindowsEvent.DOM_READY, this.onWindowLoaded)
    // Listens to splash window's 'done' event
    AppManager.on(M.Window.DONE, this.onWindowDone)

  }

  public unref() {
    menu.unref()
  }

  private onWindowLoaded(event: Event) {

    // Removes listener
    this._win!.webContents.off(M.Window.LOADED, this.onWindowLoaded)
    // SHow the window
    this._win!.show()
    /*
    // TODO: camera acess and all
    const cameraAccess = systemPreferences.getMediaAccessStatus('camera')
    const microphoneAccess = systemPreferences.getMediaAccessStatus('microphone')
    const screenAccess = systemPreferences.getMediaAccessStatus('screen')
    console.log(cameraAccess)
    console.log(microphoneAccess)
    console.log(screenAccess)

    // FIXME: Don't do this in VS terminal
    // see: https://github.com/electron/electron/issues/20498#issuecomment-540988674
    // may be a fix: https://github.com/microsoft/vscode/issues/95062#issuecomment-751241372
    // https://apple.stackexchange.com/questions/339363/how-can-i-remove-applications-from-security-privacy
    systemPreferences.askForMediaAccess('camera')
      .then((granted: boolean) => {
        // TODO: granted
        return systemPreferences.askForMediaAccess('microphone')
      }).then((granted: boolean) => {
        // TODO: granted
      }).catch(err => {
        console.error(err)
      })
    */

    /*
     * Begins synchronous tasks for the splash window
     */
    // Listens to the Updater 'error' and 'done' events
    AppManager.on(M.Updater.DONE, this.onUpdaterDone)
    AppManager.on(M.Updater.ERROR, this.onUpdaterError)
    // Initialize the Updater module.
    Updater.init()
    // Checks for updates
    Updater.run()

  }

  private onUpdaterDone(err: Error) {
    Updater.unref()
    AppManager.off(M.Updater.DONE, this.onUpdaterDone)
  }

  private onUpdaterError(err: Error) {
    Updater.unref()
    AppManager.off(M.Updater.ERROR, this.onUpdaterError)
  }

  private onWindowDone() {
    // Asks listeners (window module) to create the main window.
    // TODO: remove time out
    setTimeout(() => {
      AppManager.emit(M.Window.CREATE, 'core.main')
      this.hide()
      this.destroy()
    }, 3000)
  }

}