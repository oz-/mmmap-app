import isOnline from 'is-online'

import { expose } from "threads/worker"

import { M } from '@/shared'
import { AppManager } from '@/core/app/manager'

let interval: any

// DOesn't work
// see asar_unpack: https://stackoverflow.com/questions/65575329/in-electron-app-after-using-webpack-electron-builder-to-package-require-third
expose({
  init() {
    interval = setInterval((async () => {
      // console.log(await isOnline());
      AppManager.emit(M.Worker.MESSAGE, 'yop yop')
    }), 5000)
    return 'Hello'
  },
  unref() {
    clearInterval(interval)
  }
})