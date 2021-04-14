/*
 * Copyright (c) 2017-2021 Benoît Lahoz.
 */




/**
 * Base class to create SocketServer and SocketClient.
 * @class
 * @category Libs
 * @subcategory IPC Sockets
 */
export class SocketObject {

  protected _port: number
  // Authorized messages
  protected _messages: { [key: string]: string }
  // Listeners
  protected _listeners: { [key: string]: any } = {}
  // Heartbeat interval and pong timeout
  protected _heartbeat: any = null
  protected _pong: any = null
  protected _timeout!: number

  /**
   * Creates a new Socket object.
   * @constructor
   * @param {number} port The port to open (SocketServer) / connect to (SocketClient).
   * @param {object} messages Allowed messages between server and client.
   */
  constructor (port: number, messages: { [key: string]: string }) {

    this._port = port
    this._messages = messages

  }
  /**
   * Tears down the Socket object and make it available for garbage collection.
   */
  public unref(): void {

    // In case a listener hasn't been removed by components registering them
    for (const listener in this._listeners) {
      delete this._listeners[listener]
    }

  }
  /**
   * Adds a listener to this Socket object (server or client).
   * @param {string} channel The channel to listen to.
   * @param {function} listener The listener function.
   */
  public on(channel: string, listener: ((...args: any[]) => any)): void {
    if (!this._listeners[channel]) {
      this._listeners[channel] = []
    }
    this._listeners[channel].push(listener)
  }
  /**
   * Removes a listener from this Socket object (server or client).
   * @param {string} channel The channel to listen to.
   * @param {function} listener The listener function.
   */
  public off(channel: string, listener: ((...args: any[]) => any)): void {
    if (this._listeners[channel]) {
      // Chanell exists, check if listener is registered
      const index = this._listeners[channel].indexOf(listener)
      if (index > -1) {
        // Remove listener
        this._listeners[channel].splice(index, 1)
      }
    }

  }
  /**
   * Clears the ping-pong exchanges between server and clients.
   * SocketServer and SocketClient must call 'super.disconnect()' before to actually disconnect.
   */
  protected disconnect(): void {
    // Clears heartbeat interval and pong timeout
    clearInterval(this._heartbeat)
    clearTimeout(this._pong)
  }

}