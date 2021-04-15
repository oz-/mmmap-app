import { AppManager } from '@/core/manager'
import { WindowWrapper } from '@/libs/window'
import { SocketMessages, WindowMessages } from '@/shared'

import options from './config'
import { role } from './role'



export class SettingsWindow extends WindowWrapper {

  public static role = role

  constructor() {
    super(options)

    // Listens fo full load of window
    this.onWindowLoaded = this.onWindowLoaded.bind(this)
    AppManager.on(WindowMessages.LOADED, this.onWindowLoaded)

  }

  public unref() {
    // 
  }

  private onWindowLoaded(role: string) {

    // Removes listener
    AppManager.off(WindowMessages.LOADED, this.onWindowLoaded)
    // Shows the window
    this._win!.show()

  }

}