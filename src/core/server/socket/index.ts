/*
 * Copyright (c) 2017-2021 Benoît Lahoz.
 */

import io from 'socket.io-client'

import { AppManager } from "@/core/app/manager"
import { M } from '@/shared'

import Listeners from './listeners'

// TODO: chose server in avilable ones
import getServer from '../get'
const server = getServer()[0]



let SOCKET: any | null = null


const init = () => {

  // Listen
  AppManager.on(M.Server.Socket.CONNECT, connect)

}

const unref = () => {

  Listeners.unref()

}

export default {
  init,
  unref
}

const connect = () => {

  if (!SOCKET || !SOCKET.connected) {
    console.log(server)
    SOCKET = io(`${server}`, { // TODO: check when to connect to /app
      reconnection: true,
      secure: true,
      // Node.js option only.
      // FIXME: Should not reject, as our certificate is valid.
      rejectUnauthorized: false,
      transports: ["websocket"]
    })

    Listeners.init(SOCKET)
  }

}