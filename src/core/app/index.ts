/*
 * Copyright (c) 2017-2021 Benoît Lahoz.
 */

import window from './window'
import handlers from './handlers'

const MODULE_NAME = 'App'

const init = async () => {

  // Initializes window module
  window.init()
  
  // Registers handlers
  handlers.init()

}

const unref = () => {

  // Unref window module
  window.unref()
  // Removes handlers
  handlers.unref()

}

export default {
  name: MODULE_NAME,
  init,
  unref
}