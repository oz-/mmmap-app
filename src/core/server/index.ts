/*
 * Copyright (c) 2017-2021 Benoît Lahoz.
 */

import { AppManager } from "@/core/app/manager"
import { M } from '@/shared'

import Socket from './socket'
import Auth from './auth'




const MODULE_NAME = 'Server'




const init = () => {

  Socket.init()
  Auth.init()

}

const unref = () => {

  Auth.unref()
  Socket.unref()

}

export default {
  name: MODULE_NAME,
  init,
  unref
}