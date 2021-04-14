/*
 * Copyright (c) 2017-2021 Benoît Lahoz.
 */

// Superclass
import { SocketObject } from './main'

// Types
import { SocketEvent } from '.'

// Messages
import { StaticMessages } from './messages'




/**
 * @classdesc Object that represents a client connection to a SocketServer.
 * @class
 * @augments SocketObject
 * @category Libs
 * @subcategory IPC Sockets
 */
export class SocketClient extends SocketObject {

  protected _socket!: WebSocket | null

  /**
   * Creates a new SocketClient object.
   * @constructor
   * @param {number} port The port to connect to an already open SocketServer.
   * @param {object} messages Allowed messages between server and client.
   */
  constructor(port: number, messages: { [key: string]: string }, socket?: WebSocket) {

    super(port, messages)

    this._timeout = 500
    // Connects to server
    this.connect(socket)

  }
  /**
   * Calls superclass unref method, then disconnects and tears down client.
   * @public
   */
  public unref(): void {

    super.unref()

    this.disconnect()

  }
  /**
   * Sends a message to the server.
   * @param {string} channel The name of the channel to send the message to.
   * @param {any} payload The data to send.
   * @param {function} callback A callback function called when the message has been received and treated by the server.
   */
  public send(channel: string, payload?: any | null, callback?: ((...args: any[]) => any)): void {

    if (callback) {
      // Listens to the response from server
      const handler = (response: any) => {
        callback({
          payload: response.payload,
          time: response.time
        })
        this.off(StaticMessages.WS_RESPONSE, handler)
      }
      this.on(StaticMessages.WS_RESPONSE, handler)
    }

    this._socket!.send(JSON.stringify({
      channel,
      payload
    }))

  }

  private connect(socket?: WebSocket) {

    // Connects to WebSocket server in main process
    this._socket = socket || new WebSocket(`ws://localhost:${this._port}`)

    // Adds WebSocket listeners
    this._socket.onopen = this.onOpen.bind(this)
    this._socket.onclose = this.onClose.bind(this)
    this._socket.onmessage = this.onMessage.bind(this)
    this._socket.onerror = this.onError.bind(this)

  }

  protected disconnect(): void {
    console.log('Disconnected')

    super.disconnect()

    // Removes WebSocket listeners
    this._socket!.onopen = null
    this._socket!.onclose = null
    this._socket!.onmessage = null
    this._socket!.onerror = null

    this._socket!.close()
    this._socket = null

  }

  private onOpen(event: Event): void {

    // Launch Heartbeat
    // TODO: timeout in options
    this.launchHeartbeat(this._timeout)

    if (this._listeners[StaticMessages.CONNECTED]) {
      this._listeners[StaticMessages.CONNECTED].forEach((listener: ((...args: any[]) => any)) => {
        listener({
          channel: StaticMessages.CONNECTED,
          time: event.timeStamp
        })
      })
    }

  }

  private onClose(event: Event): void {

    if (this._listeners[StaticMessages.DISCONNECTED]) {
      this._listeners[StaticMessages.DISCONNECTED].forEach((listener: ((...args: any[]) => any)) => {
        listener({
          channel: StaticMessages.DISCONNECTED,
          time: event.timeStamp
        })
      })
    }

  }

  private onError(event: Event): void {
    if (this._listeners[StaticMessages.ERROR]) {

      this._listeners[StaticMessages.ERROR].forEach((listener: ((...args: any[]) => any)) => {

        listener(event)

      })
    }
  }

  private onMessage(message: MessageEvent): void {

    const content = JSON.parse(message.data)
    const channel = content.channel

    if (channel === StaticMessages.PING) {
      this.onPing()
      return
    } else if (channel === StaticMessages.PONG) {
      this.onPong()
      return
    }

    const payload = content.payload
    const time = message.timeStamp

    if (this._listeners[channel]) {
      this._listeners[channel].forEach((listener: ((...args: any[]) => any)) => {
        listener({
          channel,
          payload,
          time
        } as SocketEvent)
      })
    }
  }

  private onPing() {
    // Answers the server
    this.send(StaticMessages.PONG)

  }

  private onPong() {
    // Clear disconnection timeout
    clearTimeout(this._pong)

  }

  private launchHeartbeat (milliseconds: number) {

    this._heartbeat = setInterval(() => {
      // Wait for a pong from server for 'milliseconds'
      this.waitForPong(milliseconds)
      // Sends ping every 'milliseconds'
      this.send(StaticMessages.PING)
    }, milliseconds)

  }

  private waitForPong(milliseconds: number) {

    this._pong = setTimeout(() => {
      this.disconnect()
    }, milliseconds)

  }

}