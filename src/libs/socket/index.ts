/*
 * Copyright (c) 2017-2021 Benoît Lahoz.
 */

export { SocketClient } from './client'
export { SocketServer } from './server'

export interface SocketEvent {
  channel: string;
  payload: any | undefined;
  time: number
}