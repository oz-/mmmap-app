/*
 * Copyright (c) 2017-2021 Benoît Lahoz.
 */

import { AppManager } from "@/core/app/manager"
import { M } from '@/shared'


// TODO: get it from a global store
import getServer from '../../get'
const server = getServer()[0]


const init = (socket: any) => {

  socket.on('connect', () => {
    AppManager.emit(M.Server.Socket.CONNECTED, server)
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
    
    socket.emit(M.Server.Auth.SIGN_IN, credentials, (data: any) => {
      callback(data)
    })
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