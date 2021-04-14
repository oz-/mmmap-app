/*
 * Copyright (c) 2017-2021 Benoît Lahoz.
 */

export enum WorkerMessages {
  ERROR =                                               'worker:error',
  EXIT =                                                'worker:exit',
  MESSAGE =                                             'worker:message',
  MESSAGE_ERROR =                                       'worker:message:error',
  ONLINE =                                              'worker:online',  
}