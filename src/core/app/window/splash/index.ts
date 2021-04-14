import { AppManager } from '@/core/manager'
import { WindowWrapper } from '@/libs/window'
import { SocketMessages, WindowMessages } from '@/shared'

import Updater from '@/core/updater'

import options from './config'
import menu from './menu'
import { role } from './role'
import { WindowsEvent } from '@/libs/window/types'



export class SplashWindow extends WindowWrapper {

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

    // Listen to event and show window
    this._win!.once(WindowsEvent.READY_TO_SHOW, () => {
      this._win!.show()
    })

    // Listens fo full load of window
    AppManager.on(WindowMessages.LOADED, this.onWindowLoaded)
    // Listens to splash window's 'done' event
    AppManager.on(WindowMessages.DONE, this.onWindowDone)

  }

  public unref() {
    menu.unref()
  }

  private onWindowLoaded(role: string) {

    // Removes listener
    AppManager.off(WindowMessages.LOADED, this.onWindowLoaded)

    /*
     * Begins synchronous tasks for the splash window
     */
    // Listens to the Updater 'error' and 'done' events
    AppManager.on(SocketMessages.UPDATER_DONE, this.onUpdaterDone)
    AppManager.on(SocketMessages.UPDATER_ERROR, this.onUpdaterError)
    // Initialize the Updater module.
    Updater.init()
    // Checks for updates
    Updater.run()
    // Asks for devices.
    AppManager.emit(SocketMessages.GET_RTC_DEVICES)

  }

  private onUpdaterDone(err: Error) {
    Updater.unref()
    AppManager.off(SocketMessages.UPDATER_DONE, this.onUpdaterDone)
  }

  private onUpdaterError(err: Error) {
    Updater.unref()
    AppManager.off(SocketMessages.UPDATER_ERROR, this.onUpdaterError)
  }

  private onWindowDone() {
    // Asks listeners (window module) to create the main window.
    setTimeout(() => {
      AppManager.emit(WindowMessages.CREATE, 'core.main')
      this.hide()
      this.destroy()
    }, 3000)
  }

}