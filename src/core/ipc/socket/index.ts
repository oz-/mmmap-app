/*
 * Copyright (c) 2017-2021 Benoît Lahoz.
 */

import { AppManager } from '@/core/manager'
import { SocketServer } from '@/libs/socket'

import { SocketMessages } from '@/shared'

let server: SocketServer | null = null

const create = async (port: number) => {

  server = new SocketServer(port, SocketMessages)
  server.on(SocketMessages.CONNECTION, socket => {

    // Listens to every event sent by this socket
    // and proxies to AppManager.
    socket.onevent = (event: any) => {
      AppManager.emit(event.channel, event.payload, (result: any) => {
        // If a callback was passed by the socket, executes it.
        socket.callback(result)
      })
    }
    // Listens to every message sent by AppManager 
    // and forwards it to socket
    AppManager.onevent((channel: string, payload: any) => {
      socket.send(channel, payload)
    })

  })

  return server
}

const unref = () => {

  server!.unref()
  server = null

}

export default {
  create,
  unref
}