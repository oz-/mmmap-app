/*
 * Copyright (c) 2017-2021 Benoît Lahoz.
 */

export enum StaticMessages {
  // Server messages
  LISTENING =                                           'listening',
  CONNECTION =                                          'connection',
  OPEN =                                                'open',
  MESSAGE =                                             'message',
  CLOSE =                                               'close',
  // Client messages
  CONNECTED =                                           'connected',
  DISCONNECTED =                                        'disconnected',
  // Server + Client messages
  ERROR =                                               'error',
  PING =                                                'ping',
  PONG =                                                'pong',
  // Reserved
  WS_RESPONSE =                                         '__vuoz:ws:response'
}