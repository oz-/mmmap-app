/*
 * Copyright (c) 2017-2021 Benoît Lahoz.
 */

import { AppManager } from "@/core/app/manager"
import { M } from '@/shared'





const init = (socket: SocketIOClient.Socket) => {

  socket.on('connect', () => {
    AppManager.emit(M.Server.Socket.CONNECTED, process.env.MMMAP_ROOT_SERVER)
  })

  socket.on('connect_error', (err: any) => {
    AppManager.emit(M.Server.Socket.CONNECT_ERROR, err.description.message)
  })

  socket.on('connect_timeout', (timeout: number) => {
    AppManager.emit(M.Server.Socket.CONNECT_TIMEOUT, timeout)
  })

  socket.on('error', (err: any) => {
    AppManager.emit(M.Server.Socket.ERROR, err.description.message)
  })

  socket.on('disconnect', (reason: string) => {
    AppManager.emit(M.Server.Socket.DISCONNECTED, reason)
  })

  socket.on('connecting', () => {
    AppManager.emit(M.Server.Socket.CONNECTING)
  })

  socket.on('reconnect', (attempt: number) => {
    AppManager.emit(M.Server.Socket.RECONNECT, attempt)
  })

  socket.on('reconnecting', (attempt: number) => {
    AppManager.emit(M.Server.Socket.RECONNECTING, attempt)
  })

  socket.on('reconnect_attempt', (attempt: number) => {
    AppManager.emit(M.Server.Socket.RECONNECT_ATTEMPT, attempt)
  })

  socket.on('reconnect_failed', () => {
    AppManager.emit(M.Server.Socket.RECONNECT_FAILED)
  })

  socket.on('reconnect_error', (err: any) => {
    AppManager.emit(M.Server.Socket.RECONNECT_ERROR, err.description.message)
  })







  // TODO: Forward with *
  // TODO: on => off
  AppManager.on(M.Server.Auth.CHECK_TOKEN, (token, callback) => {
    console.log('emit token')
    socket.emit(M.Server.Auth.CHECK_TOKEN, token, (data: any) => {
      callback(data)
    })
  })

  AppManager.on(M.Server.Auth.SIGN_IN, (credentials: any, callback: any) => {
    console.log('EMIT', M.Server.Auth.SIGN_IN, credentials)
    // WORKS but returns null 
    // FIXME: on server
    /*
    socket.emit('db:conversation.get.count', (data: any) => {
      console.log('FROM SERVER INFO', data)
    })
    */
    // WORKS
    socket.emit('server:get.info', (data: any) => {
      console.log(data)
    })
    // DOESN'T WORK
    /*
    socket.emit('db:user.sign.in', credentials, (data: any) => {
      console.log('RECEUVED', data)
      callback(data)
    })
    */
    socket.emit(M.Server.Auth.SIGN_IN, {
      // Must not contain 'email' entry, nor email formatted string, nor 'password' entry
      a: Buffer.from(credentials.email).toString('base64'),
      b: Buffer.from(credentials.password).toString('base64')
    }, (data: any) => {
      console.log('RECEIVED', data)
    })
    /*
    socket.emit('db:user.get.all', { }, (data: any) => {
      console.log('All', data)
      callback(data)
    })
    */
  })

  // TODO: see https://socket.io/docs/v2/client-api/#Events
  // and implement a way to get latency from the pong event on demand

}

const unref = () => {

  // 

}

export default {
  init,
  unref
}