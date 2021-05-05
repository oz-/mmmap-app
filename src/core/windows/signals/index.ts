import { AppManager } from '@/core/app/manager'
import { MobiuszWindow } from '@/libs/window'
import { M } from '@/shared'

import options from './config'
import { role } from './role'



export class SignalsWindow extends MobiuszWindow {

  public static role = role

  constructor() {
    super(options)

    // Listens fo full load of window
    this.onWindowLoaded = this.onWindowLoaded.bind(this)
    AppManager.on(M.Window.LOADED, this.onWindowLoaded)

  }

  public unref() {
    // 
  }

  private onWindowLoaded(role: string) {

    // Removes listener
    AppManager.off(M.Window.LOADED, this.onWindowLoaded)
    // Shows the window
    this._win!.show()

  }

}