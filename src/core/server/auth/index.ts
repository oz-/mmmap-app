/*
 * Copyright (c) 2017-2021 Benoît Lahoz.
 */

import keytar from 'keytar'

import { AppManager } from "@/core/app/manager"
import { M } from '@/shared'






const SERVICES = {
  token: `${process.env.APP_ID}`
}



const init = async () => {

  AppManager.on(M.Server.Auth.GET_LOCAL_TOKEN, getLocalToken)
  // Promise
  /*
  keytar.setPassword(SERVICES.password, 'benoit.lahoz@carasuelo.org', 'blurp')
  keytar.getPassword(SERVICES.password, 'benoit.lahoz@carasuelo.org')
  .then(password => {
    console.log(password)
  })
  */

}

const unref = () => {

  AppManager.off(M.Server.Auth.GET_LOCAL_TOKEN, getLocalToken)

}

const getLocalToken = (data = null, callback: any) => {
  keytar.findCredentials(SERVICES.token)
    .then(token => {
      callback(token)
    }).catch((err: Error) => {
      console.error(err)
    })
}

export default {
  init,
  unref
}