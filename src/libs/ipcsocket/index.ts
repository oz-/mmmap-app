/*
 * Copyright (c) 2017-2021 Benoît Lahoz.
 */

export { IpcSocketClient } from './client'
export { IpcSocketServer } from './server'
export { IpcSocket } from './types'

export interface IpcSocketPayload {
  channel: string;
  payload: any | undefined;
  time: number
}