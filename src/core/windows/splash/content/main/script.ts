import { Component, Mixins, Vue, Watch } from 'vue-property-decorator'
import { mapState } from 'vuex'

import { M } from '@/shared'

import { VuozImage, VuozConsole, VuozSignIn } from '@vuoz/components'
// TODO: pass it in @vuoz/components
import { VuozRTCDevicesMixin } from '@/libs/signal/vue'

/**
 * Splash window content.
 * @category Components
 * @component
 */
@Component({
  name: "MmmapSplash",
  components: {
    VuozImage,
    VuozConsole,
    VuozSignIn
  },
  metaInfo() {
    return {
      title: "mmmap - Initialization"
    }
  },
  computed: {
    ...mapState('application', [
      'ipc'
    ])
  }
})
export default class SplashPage extends Mixins(Vue, VuozRTCDevicesMixin) {

  // State of the component
  private isMounted = false
  private isInitialized = false
  // Assigned by mapState
  public ipc!: any
  // Logger component
  private logger: any
  // Show sign-in component
  private login = false

  // TODO: In production, when cache was cleared (first launch) application is stalling and ws disconnected until a second launch.

  @Watch('ipc', { immediate: true })
  private onIPCChanged() {
    if (this.isMounted && this.ipc.connected) {
      // Called when the component is already mounted and when connected to main process.
      this.init()
    }
  }

  private mounted() {
    this.isMounted = true
    if (!this.isInitialized && this.ipc.connected !== false) {
      // Called when already connected to the main process and component was just mounted.
      this.init()
    }
  }

  private init() {
    // Gets the console
    this.logger = this.$refs.console
    // Adds listenerss for autoupdater
    this.addListeners()

    this.isInitialized = true
  }

  private addListeners() {

    // For updater events
    this.$app.on(M.Updater.CHECKING, this.onUpdateCheck)
    this.$app.on(M.Updater.AVAILABLE, this.onUpdateAvailable)
    this.$app.on(M.Updater.UNAVAILABLE, this.onUpdateNotAvailable)
    this.$app.on(M.Updater.DOWNLOAD, this.onUpdateProgress)
    this.$app.on(M.Updater.DOWNLOADED, this.onUpdateDownloaded)
    this.$app.on(M.Updater.DONE, this.onUpdateDone)
    this.$app.on(M.Updater.ERROR, this.onUpdateError)

    // For server events
    this.$app.on(M.Server.Socket.CONNECTED, this.onServerConnected)
    this.$app.on(M.Server.Socket.CONNECTING, this.onServerConnecting)
    this.$app.on(M.Server.Socket.DISCONNECTED, this.onServerDisconnect)
    this.$app.on(M.Server.Socket.CONNECT_ERROR, this.onServerError)
    this.$app.on(M.Server.Socket.ERROR, this.onServerError)
    this.$app.on(M.Server.Socket.RECONNECT_ERROR, this.onServerError)
    this.$app.on(M.Server.Socket.CONNECT_TIMEOUT, this.onServerTimeout)
    this.$app.on(M.Server.Socket.RECONNECT, this.onServerReconnect)
    this.$app.on(M.Server.Socket.RECONNECTING, this.onServerReconnect)
    this.$app.on(M.Server.Socket.RECONNECT_ATTEMPT, this.onServerReconnect)
    this.$app.on(M.Server.Socket.RECONNECT_FAILED, this.onServerReconnectFailed)

  }

  private removeListeners() {

    this.$app.off(M.Updater.CHECKING, this.onUpdateCheck)
    this.$app.off(M.Updater.AVAILABLE, this.onUpdateAvailable)
    this.$app.off(M.Updater.UNAVAILABLE, this.onUpdateNotAvailable)
    this.$app.off(M.Updater.DOWNLOAD, this.onUpdateProgress)
    this.$app.off(M.Updater.DOWNLOADED, this.onUpdateDownloaded)
    this.$app.off(M.Updater.DONE, this.onUpdateDone)
    this.$app.off(M.Updater.ERROR, this.onUpdateError)

    this.$app.off(M.Server.Socket.CONNECTED, this.onServerConnected)
    this.$app.off(M.Server.Socket.CONNECTING, this.onServerConnecting)
    this.$app.off(M.Server.Socket.DISCONNECTED, this.onServerDisconnect)
    this.$app.off(M.Server.Socket.CONNECT_ERROR, this.onServerError)
    this.$app.off(M.Server.Socket.ERROR, this.onServerError)
    this.$app.off(M.Server.Socket.RECONNECT_ERROR, this.onServerError)
    this.$app.off(M.Server.Socket.CONNECT_TIMEOUT, this.onServerTimeout)
    this.$app.off(M.Server.Socket.RECONNECT, this.onServerReconnect)
    this.$app.off(M.Server.Socket.RECONNECTING, this.onServerReconnect)
    this.$app.off(M.Server.Socket.RECONNECT_ATTEMPT, this.onServerReconnect)
    this.$app.off(M.Server.Socket.RECONNECT_FAILED, this.onServerReconnectFailed)

  }

  private onUpdateCheck() {
    this.logger.push({
      date: new Date(),
      content: 'Checking for updates...'
    })
  }

  private onUpdateAvailable(data: any) {
    console.log('AVAILABLE', data)
  }

  private onUpdateNotAvailable(data: any) {
    const old = data.payload.version
    const current = data.payload.mmmap.version
    this.logger.push({
      date: new Date(),
      content: `Update for version ${current} is not available (latest version: ${old}).`
    })
  }

  private onUpdateProgress(data: any) {
    console.log('PROGRESS', data)
  }

  private onUpdateDownloaded(data: any) {
    console.log('DOWNLOADED', data)
  }

  private onUpdateError(err: any) {
    console.log('ERROR', err.payload)
    this.removeListeners()
    // Informs user
    this.logger.push({
      date: new Date(),
      content: 'There was an error while updating...'
    })
  }

  private onUpdateDone() {
    // Connects to server
    this.$app.send(M.Server.Socket.CONNECT)
  }

  private onServerConnecting() {
    this.logger.push({
      date: new Date(),
      content: `Connecting to server.`
    })
  }

  private onServerConnected(host: any) {
    this.logger.push({
      date: new Date(),
      content: `Connected to server at ${host.payload}.`
    })
    // Authentication
    this.$app.send(M.Server.Auth.GET_LOCAL_TOKEN, null, (accounts: any) => {
      this.logger.push({
        date: new Date(),
        content: `Checking account...`
      })
      if (accounts.payload.length === 0) {
        const timeout = setTimeout(() => {
          clearTimeout(timeout)
          // this.login = true
          this.$app.send(M.Window.DONE)
        }, 2000)
      } else {
        let treated = 0
        for (const account of accounts.payload) {
          // For each account, sends token to server (password is the key for keytar but we actualy store a token)
          this.$app.send(M.Server.Auth.CHECK_TOKEN, account.password, data => {
            switch (data.payload.type) {
              case 'error': {
                if (treated == accounts.payload.length - 1)
                  this.logger.push({
                    date: new Date(),
                    content: `${data.payload.message}.`
                  })
                const timeout = setTimeout(() => {
                  clearTimeout(timeout)
                  this.login = true
                }, 2000)
                break
              }
              case 'success': {
                this.logger.push({
                  date: new Date(),
                  content: `You were successfully authenticated.`
                })
                // Tears down the Splash window.
                this.removeListeners()
                // Calls next step
                // this.$app.send(M.Window.DONE)
                return
              }
            }
            treated++
          })
        }
      }
    })

  }

  private onServerTimeout(timeout: any) {
    this.logger.push({
      date: new Date(),
      content: `Server timeout: ${timeout.payload}.`
    })
    // Tears down the Splash window.
    this.removeListeners()
  }

  private onServerDisconnect(reason: any) {
    this.logger.push({
      date: new Date(),
      content: `Server disconnected: ${reason.payload}.`
    })
  }

  private onServerReconnect(attempt: any) {
    this.logger.push({
      date: new Date(),
      content: `Reconnecting to server: ${attempt.payload}.`
    })
  }

  private onServerReconnectFailed() {
    this.logger.push({
      date: new Date(),
      content: `Reconnection failed.`
    })
    // Tears down the Splash window.
    this.removeListeners()
  }

  private onServerError(err: any) {
    this.logger.push({
      date: new Date(),
      content: `There was an error while connecting to server: ${err.payload}.`
    })
  }

  private onSignIn(credentials: any) {
    this.$app.send(M.Server.Auth.SIGN_IN, credentials, (result: any) => {
      console.log('From server', result)
    })
  }

}