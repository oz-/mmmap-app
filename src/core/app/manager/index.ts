/*
 * Copyright (c) 2017-2021 Benoît Lahoz.
 */

import { protocol } from 'electron'

import { AppInitError } from '@/core/errors'
import { Core } from '@/core/types'

const isDevelopment = process.env.NODE_ENV !== 'production'

/**
 * A singleton class to handle global application configuration and initialization
 * It also acts as a global proxy to listen to and forward events.
 * @class
 * @category Main
 * @public
 * @see https://www.sitepoint.com/javascript-design-patterns-singleton/
 */
class AppManager {
  /**
   * The exported singleton instance.
   * @static
   * @private
   */
  private static _instance: AppManager | null
  /**
   * The application initialization flag. 
   * Application should be initialized only once.
   * @type boolean
   * @static
   * @private
   */
  private static _initialized = false
  /**
   * Application modules to handle.
   * @static
   */
  static _modules: Core.Module[] = []
  /**
   * Listeners to global events.
   * @private
   */
  private _listeners: any[] = []
  /**
   * The singleton constructor. It may not be called by other modules.
   * @private
   * @returns { AppManager } A new AppManager instance.
   */
  constructor() {

    if (!AppManager._instance) {

      // Called only once

      AppManager._instance = this

      // Scheme must be registered before the app is ready
      protocol.registerSchemesAsPrivileged([
        {
          scheme: 'app', privileges: {
            secure: true,
            standard: true,
            stream: true,
            allowServiceWorkers: true,
            supportFetchAPI: true
          }
        }
      ])

    }

    return AppManager._instance

  }

  /**
   * Initializes the Application.
   * @throws { AppInitError } An error if Application is already initialized
   * or if no modules were added.
   */
  public async init() {

    try {
      if (AppManager._initialized) {
        throw new AppInitError('Application can be initialized only once.')
      }
      if (AppManager._modules.length === 0) {
        throw new AppInitError('No modules were added for initialization.')
      }

      for (const module of AppManager._modules) {
        await module.init()
      }

      AppManager._initialized = true
    } catch (err) {
      console.error(new AppInitError(err.message))
      process.exit(1)
    }

  }

  /**
   * Tears down the Application and quit.
   */
  public unref() {

    // Removes listeners
    for (const listener in this._listeners) {
      delete this._listeners[listener]
    }

    // Reverses array to unref all modules
    const reversed = AppManager._modules.reverse()
    for (const module of reversed) {
      module.unref()
      const index = AppManager._modules.indexOf(module)
      AppManager._modules.splice(index, 1)
    }
    AppManager._modules = []
    // Deletes singleton instance
    AppManager._instance = null

  }

  /**
   * Adds a module to be handled by AppManager.
   * @param module { Core.Module } The module to be handled by AppManager.
   */
  public async addModule(module: Core.Module) {

    AppManager._modules.push(module)

  }

  /**
   * Add multiple modules to be handled by AppManager.
   * @param modules { Core.Module[]} An array of modules to be handled by AppManager.
   */
  public async addModules(modules: Core.Module[]) {

    for (const module of modules) {
      await this.addModule(module)
    }

  }

  /**
   * Listens to events dispatched on a specific channel.
   * @param channel { string } The channel to listen to.
   * @param listener { function } The function to be called when an event is dispatched for the given channel.
   */
  public on(channel: string, listener: ((...args: any[]) => any)): void {

    if (!this._listeners[channel]) {
      this._listeners[channel] = []
    }
    this._listeners[channel].push(listener)

  }

  /**
   * Removes listener to events dispatched on a specific channel.
   * @param channel { string } The channel the AppManager was listening to.
   * @param listener { function } A callback function that was called for this channel.
   */
  public off(channel: string, listener: ((...args: any[]) => any)): void {

    if (this._listeners[channel]) {
      // Chanel exists, check if listener is registered
      const index = this._listeners[channel].indexOf(listener)
      if (index > -1) {
        // Remove listener
        this._listeners[channel].splice(index, 1)
      }
    }

  }

  /**
   * Listens to events dispatched on all channels.
   * @param listener { function } The function to be called when an event is dispatched.
   */
   public onevent(listener: ((...args: any[]) => any)): void {
    const globalChannel = 'manager:channels:all'
    if (!this._listeners[globalChannel]) {
      this._listeners[globalChannel] = []
    }
    this._listeners[globalChannel].push(listener)
  }

  /**
   * Removes listeners that were listening to all channels.
   * @param listener { function } The function to be called when an event is dispatched.
   */
   public offevent(listener: ((...args: any[]) => any)): void {
    const globalChannel = 'manager:channels:all'
    if (this._listeners[globalChannel]) {
      // Channel exists, check if listener is registered
      const index = this._listeners[globalChannel].indexOf(listener)
      if (index > -1) {
        // Remove listener
        this._listeners[globalChannel].splice(index, 1)
      }
    }

  }

  /**
   * Emits an event to be handled by listeners.
   * @param channel { string } The channel to emit to.
   * @param args { any[] } Arguments to be passed to the listener.
   */
  public emit(channel: string, ...args: any[]) {

    // Dipatches to listeners of this specific channel
    if (this._listeners[channel]) {
      for (const listener of this._listeners[channel]) {
        listener(...args)
      }
    }

    // Dispatches to listeners listening to all channels
    const globalChannel = 'manager:channels:all'
    if (this._listeners[globalChannel]) {
      for (const listener of this._listeners[globalChannel]) {
        listener(channel, ...args)
      }
    }

  }

  /**
   * Singleton initialization flag.
   * @readonly
   * @returns { boolean } true if application is initialized.
   */
  public get isInitialized() {
    return AppManager._initialized
  }

}

const instance = new AppManager()
Object.freeze(instance)
export { instance as AppManager }