/*
 * Copyright (c) 2017-2021 Benoît Lahoz.
 */

import { AppManager } from '@/core/app/manager'
import { IpcSocket, IpcSocketServer } from '@/libs/ipcsocket'

let server: IpcSocketServer | null = null

const create = async (port: number) => {

  server = new IpcSocketServer(port)
  server.on(IpcSocket.Server.Event.CONNECTION, socket => {

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