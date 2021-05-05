/*
 * Copyright (c) 2017-2021 Benoît Lahoz.
 */

export const IpcSocket = {
  Event: {
    ERROR:                                              'error'
  },
  Server: {
    Event: {
      LISTENING:                                        'listening',
      CONNECTION:                                       'connection',
      OPEN:                                             'open',
      MESSAGE:                                          'message',
      CLOSE:                                            'close',
    }
  },
  Client: {
    Event: {
      CONNECTED:                                        'connected',
      DISCONNECTED:                                     'disconnected'
    } 
  }
}

export const _reservedEvents = {
  ___RESPONSE:                                          '____response____',
  ___PING:                                              '____ping____',
  ___PONG:                                              '____pong____'
}