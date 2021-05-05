




export const M = {
  Ipc: {
    GET_IPC_PORT:                                             'ipc:port:get'
  },
  Window: {
    CREATE:                                                   'window:create',
    LOADED:                                                   'window:loaded',
    DONE:                                                     'window:done',
  },
  Worker: {
    ERROR:                                                    'worker:error',
    EXIT:                                                     'worker:exit',
    MESSAGE:                                                  'worker:message',
    MESSAGE_ERROR:                                            'worker:message:error',
    ONLINE:                                                   'worker:online',  
  },
  Updater: {
    ERROR:                                                    'updater:error',
    CHECKING:                                                 'updater:checking',
    AVAILABLE:                                                'updater:available',
    UNAVAILABLE:                                              'updater:unavailable',
    DOWNLOAD:                                                 'updater:download',
    DOWNLOADED:                                               'updater:downloaded',
    DONE:                                                     'updater:done',
  },
  Server: {
    Socket: {
      // Sent by the GUI to ask for connection / disconnection
      CONNECT:                                                'server:socket:connect',
      DISCONNECT:                                             'server:socket:disconnect',
      // Static socket messages
      CONNECTED:                                              'server:socket:connected',
      DISCONNECTED:                                           'server:socket:disconnected',
      CONNECT_ERROR:                                          'server:socket:connect:error',
      CONNECT_TIMEOUT:                                        'server:socket:connect:timeout',
      ERROR:                                                  'server:socket:error',
      CONNECTING:                                             'server:socket:connecting',
      RECONNECT:                                              'server:socket:reconnect',
      RECONNECTING:                                           'server:socket:reconnecting',
      RECONNECT_ATTEMPT:                                      'server:socket:reconnect:attempt',
      RECONNECT_FAILED:                                       'server:socket:reconnect:failed',
      RECONNECT_ERROR:                                        'server:socket:reconnect:error',
    },
    Auth: {
      GET_LOCAL_TOKEN:                                        'auth:local:token:get',
      // Messages to server
      CHECK_TOKEN:                                            'db:user.check.token',
      SIGN_IN:                                                'db:user.sign.in', // TODO: for testing
    },
  },
  Theme: {
    GET:                                                      'themes:get',
    GET_CSS:                                                  'theme:get:css',
    GET_SASS:                                                 'theme:get:sass',
  },
  RTC: {
    GOT_DEVICES:                                              'rtc:devices:got',
  },
  Signal: {
    GET_DEVICES:                                              'signal:devices:get',
    GET_DEVICES_INFO:                                         'signal:devices:get:info'
  }
}