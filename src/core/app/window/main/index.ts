import { app, screen } from 'electron'

import { AppManager } from '@/core/manager'
import { WindowWrapper } from '@/libs/window'
import { SocketMessages, WindowMessages } from '@/shared'

import options from './config'
import menu from './menu'
import { role } from './role'
import { WindowsEvent } from '@/libs/window/types'
import { MobiuszDevice } from '@/libs/signal/class'



export class MainWindow extends WindowWrapper {

  public static role = role

  constructor() {
    super(options)

    // Prepares listeners
    this.onWindowLoaded = this.onWindowLoaded.bind(this)

    // Listens fo full load of window
    AppManager.on(WindowMessages.LOADED, this.onWindowLoaded)

    // Listens to 'closed' event
    this._win!.on(WindowsEvent.CLOSED, this.onWindowClosed)

    AppManager.emit(SocketMessages.GET_DEVICES, 'all', (devices: MobiuszDevice[]) => {
      // console.log('TO BUILD MENU IN main WINDOW', devices)
      // Creates menu
      // TODO: put devices in menu
      menu.init()
    })

  }

  public unref() {
    // TODO: on window close
    menu.unref()
  }

  private onWindowLoaded(role: string) {

    // Removes listener
    AppManager.off(WindowMessages.LOADED, this.onWindowLoaded)

    // Sets main window bounds
    this._win!.setBounds({
      x: 0,
      y: 0,
      width: screen.getPrimaryDisplay().size.width,
      height: screen.getPrimaryDisplay().size.height,
    })

    // Waits for bounds to be properly set then show the window
    const wait = setTimeout(() => {
      this._win!.show()
      clearTimeout(wait)
    }, 200)

  }

  private onWindowClosed() {
    // Removes listener
    if (this._win) {
      this._win!.off(WindowsEvent.CLOSED, this.onWindowClosed)
    }
    // Quits app
    app.quit()
  }

}