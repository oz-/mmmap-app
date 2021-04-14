/*
 * Copyright (c) 2017-2021 Benoît Lahoz.
 */

export enum SocketMessages {
  // General messages
  ERROR =                                               'error',
  // Sockets
  CONNECTION =                                          'connection',
  CONNECTED =                                           'connected',
  // Updater
  UPDATER_ERROR =                                       'updater:error',
  UPDATER_CHECKING =                                    'updater:checking',
  UPDATER_AVAILABLE =                                   'updater:available',
  UPDATER_UNAVAILABLE =                                 'updater:unavailable',
  UPDATER_DOWNLOAD =                                    'updater:download',
  UPDATER_DOWNLOADED =                                  'updater:downloaded',
  UPDATER_DONE =                                        'updater:done',
  // Store
  GET_STORE_ENTRY =                                     'store:get:entry',
  GET_STORE =                                           'store:get',
  SET_STORE_ENTRY =                                     'store:set:entry',
  SET_STORE =                                           'store:set',
  // Themes
  GET_THEMES =                                          'themes:get',
  GET_THEME_CSS =                                       'theme:get:css',
  GET_THEME_SASS =                                      'theme:get:sass',
  // WebRTC Devices (App asks Renderer answers to App)
  GET_RTC_DEVICES =                                     'rtc:devices:get',
  GOT_RTC_DEVICES =                                     'rtc:devices:got',
  // MobiuszDevice (Any - except Renderer - asks App answers Any - except Renderer)
  GET_DEVICES =                                         'devices:get',
  GET_DEVICES_INFO =                                    'devices:get:info'
}