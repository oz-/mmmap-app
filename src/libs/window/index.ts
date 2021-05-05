import { BrowserWindow } from 'electron'

import { WindowsEvent } from './types'




/**
 * A generic window object for Möb:usz system, to be subclassed for each window type.
 * @class
 * @category Libs
 * @subcategory Window
 */
export class MobiuszWindow {
  /**
   * The URL to be loaded by the window.
   */
  // TODO: get protocol from env file
  private static url: string = process.env.WEBPACK_DEV_SERVER_URL ? `${(process.env.WEBPACK_DEV_SERVER_URL as string)}/#/?page=` : 'app://./index.html/#/?page='
  /**
   * The role of the window, with this signature: ```[moduleName]:[windowRole]``` 
   * (eg.: core.splash)
   */
  public static role: string
  /**
   * An Electron's BrowserWindow instance.
   * @protected
   */
  protected _win: BrowserWindow | null = null
  /**
   * An unique id for the window.
   * @private
   */
  private _id: number
  /**
   * Creates a new MobiuszWindow instance.
   * @param options { object } An Electron's BrowserWindow options object.
   * @see https://www.electronjs.org/docs/api/browser-window
   */
  constructor(options?: { [key: string]: any }) {

    // Creates the new underlying BrowserWindow
    this._win = new BrowserWindow(options);
    this._id = this._win.id

  }
  /**
   * Shows the window.
   */
  public show() {
    this._win!.show()
  }
  /**
   * Hides the window.
   */
  public hide() {
    this._win!.hide()
  }
  /**
   * Closes the window but keeps it in memory.
   */
  public close() {
    if (this._win) {
      this._win.setClosable(true)
      this._win.close()
    }
  }
  /**
   * Destroys the window.
   */
  public destroy() {
    this._win!.destroy()
    this._win = null
  }
  /**
   * Destroys the window.
   */
  public unref() {
    if (this._win) {
      // Window can have been destroyed previously.
      this.destroy()
    }
  }
  /**
   * Loads the static url defined by a subclass.
   * @async
   */
  public async load() {

    const url = `${MobiuszWindow.url}${this.constructor['role']}`

    if (!url || url.trim() === '') {
      const err = new Error('url is undefined.')
      err.name = 'WindowError'
      throw err
      return
    }
    await this.loadURL(url)

  }
  /**
   * Loads an URL in the window.
   * @param url { string } The path to load.
   * @async
   */
  public async loadURL(url: string) {
    await this._win!.loadURL(url)
  }
  /**
   * The window's unique id.
   * @returns { string } An UUID (v4).
   */
  public get id() {
    return this._id
  }


}