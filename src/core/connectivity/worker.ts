import isOnline from 'is-online'

import { expose } from "threads/worker"

import { WorkerMessages } from '@/shared'
import { AppManager } from '../manager'

let interval: any

expose({
  init() {
    interval = setInterval((async () => {
      // console.log(await isOnline());
      AppManager.emit(WorkerMessages.MESSAGE, 'yop yop')
    }), 5000)
    return 'Hello'
  },
  unref() {
    clearInterval(interval)
  }
})