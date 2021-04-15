/*
 * Copyright (c) 2017-2021 Benoît Lahoz.
 */

import { AppManager } from "@/core/manager"

import { SocketMessages, WindowMessages } from "@/shared"

import { WindowWrapper } from "@/libs/window"

// Default windows
import { SplashWindow } from './splash'
import { MainWindow } from './main'
import { SettingsWindow } from './settings'
import { SignalsWindow } from './signals'

import { ThemeManager } from "@/libs/theme"

/**
 * Default windows for the application.
 * @constant
 */
const WINDOWS: { [key: string]: { klass: typeof WindowWrapper, window: WindowWrapper | null } } = {
  // Defines default windows.
  [SplashWindow.role]: { klass: SplashWindow, window: null },
  [MainWindow.role]: { klass: MainWindow, window: null },
  [SettingsWindow.role]: { klass: SettingsWindow, window: null },
  [SignalsWindow.role]: { klass: SignalsWindow, window: null }
}

/**
 * Application's themes manager.
 */
let themeManager: ThemeManager





const init = async () => {

  // Initializes ThemeManager
  themeManager = new ThemeManager()

  // Adds listeners to AppManager.
  AppManager.on(WindowMessages.CREATE, createWindow)

}

const unref = () => {

  // Unrefs ThemeManager
  themeManager.unref()

  // Removes listeners to AppManager
  AppManager.off(WindowMessages.CREATE, createWindow)

  // Unref windows
  for (const key in WINDOWS) {
    if (WINDOWS[key].window) {
      WINDOWS[key].window!.unref()
    }
  }

}

const createWindow = async (role: string) => {
  const win = new WINDOWS[role].klass()

  try {
    await win.load()
    WINDOWS[role].window = win
  } catch (err) {
    console.error(err)
  }
}

export default {
  init,
  unref
}