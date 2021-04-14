/*
 * Copyright (c) 2017-2021 Benoît Lahoz.
 */

import { powerMonitor, powerSaveBlocker } from 'electron'

import { App } from '../types'

let powerId = -1

const init = () => {

  // Avoids application suspension, but allows the screen to be turned off
  powerId = powerSaveBlocker.start('prevent-app-suspension')

  // Registers listeners to power monitor's events.
  powerMonitor.on(App.Power.SUSPEND, onSuspend)
  powerMonitor.on(App.Power.RESUME, onResume)
  powerMonitor.on(App.Power.SHUTDOWN, onShutdown)
  powerMonitor.on(App.Power.LOCK_SCREEN, onLockScreen)
  powerMonitor.on(App.Power.UNLOCK_SCREEN, onUnlockScreen)

}

const unref = () => {

  // Unregisters listeners to power monitor's events.
  powerMonitor.off(App.Power.SUSPEND, onSuspend)
  powerMonitor.off(App.Power.RESUME, onResume)
  powerMonitor.off(App.Power.SHUTDOWN, onShutdown)
  powerMonitor.off(App.Power.LOCK_SCREEN, onLockScreen)
  powerMonitor.off(App.Power.UNLOCK_SCREEN, onUnlockScreen)

  // Stops powerSaveBlocker
  if (powerSaveBlocker.isStarted(powerId)) {
    powerSaveBlocker.stop(powerId)
  }

  powerId = -1

}

const onSuspend = () => {
  console.log('SUSPEND')
}

const onResume = () => {
  console.log('RESUME')
}

const onShutdown = () => {
  console.log('SHUTDOWN')
}

const onLockScreen = () => {
  console.log('LOCK')
}

const onUnlockScreen = () => {
  console.log('UNLOCK')
}

export default {
  init,
  unref
}