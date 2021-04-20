import { Component, Mixins, Vue, Watch } from 'vue-property-decorator'

import { SocketMessages, WindowMessages } from '@/shared'

import { VuozImage } from '@vuoz/components'
import { VuozConsole } from '@vuoz/components'
// TODO: pass it in @vuoz/components
import { VuozRTCDevicesMixin } from '@/core/signal/gui/RTC/VuozRTCDevicesMixin'

/**
 * Splash window content.
 * @category Components
 * @component
 */
@Component({
  name: "MmmapSplash",
  components: {
    VuozImage,
    VuozConsole
  },
  metaInfo() {
    return {
      title: "mmmap - Initialization"
    }
  }
})
export default class SplashPage extends Mixins(Vue, VuozRTCDevicesMixin) {

  private logger: any
  // Tasks flags
  private _updateDone!: boolean
  private _devicesDone!: boolean

  public created() {

    this._updateDone = false
    this._devicesDone = false

  }

  public mounted(): void {
    // Listens to window load event
    window.addEventListener('load', this.onLoaded)
    // Gets the console
    this.logger = this.$refs.console
  }

  public beforeDestroy(): void {
    // 
  }

  private onLoaded() {
    // Window is fully loaded, removes listener
    window.removeEventListener('load', this.onLoaded)
    // Adds listenerss for autoupdater
    this.addUpdateListeners()
    // Sends message to main process
    this.$app.send(WindowMessages.LOADED, this.$route.name)
    // Waits for main process to ask for devices
    this.$app.on(SocketMessages.GET_RTC_DEVICES, this.getDevices)

  }

  private addUpdateListeners() {

    this.$app.on(SocketMessages.UPDATER_CHECKING, this.onUpdateCheck)
    this.$app.on(SocketMessages.UPDATER_AVAILABLE, this.onUpdateAvailable)
    this.$app.on(SocketMessages.UPDATER_UNAVAILABLE, this.onUpdateNotAvailable)
    this.$app.on(SocketMessages.UPDATER_DOWNLOAD, this.onUpdateProgress)
    this.$app.on(SocketMessages.UPDATER_DOWNLOADED, this.onUpdateDownloaded)
    this.$app.on(SocketMessages.UPDATER_DONE, this.onUpdateDone)
    this.$app.on(SocketMessages.UPDATER_ERROR, this.onUpdateError)

  }

  private removeUpdateListeners() {

    this.$app.off(SocketMessages.UPDATER_CHECKING, this.onUpdateCheck)
    this.$app.off(SocketMessages.UPDATER_AVAILABLE, this.onUpdateAvailable)
    this.$app.off(SocketMessages.UPDATER_UNAVAILABLE, this.onUpdateNotAvailable)
    this.$app.off(SocketMessages.UPDATER_DOWNLOAD, this.onUpdateProgress)
    this.$app.off(SocketMessages.UPDATER_DOWNLOADED, this.onUpdateDownloaded)
    this.$app.off(SocketMessages.UPDATER_DONE, this.onUpdateDone)
    this.$app.off(SocketMessages.UPDATER_ERROR, this.onUpdateError)

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

  private onUpdateDone() {
    console.log('UPDATE DONE')
    this.removeUpdateListeners()
    this._updateDone = true
    if (this.checkTasks()) {
      // Checks if all tasks have been completed.
      this.$app.send(WindowMessages.DONE)
    }
  }

  private onUpdateError(err: Error) {
    console.log('ERROR', err)
    this.removeUpdateListeners()
    this._updateDone = true
    // Informs user
    this.logger.push({
      date: new Date(),
      content: 'There was an error while updating...'
    })
    if (this.checkTasks()) {
      // Checks if all tasks have been completed.
      this.$app.send(WindowMessages.DONE)
    }
  }

  private async getDevices() {
    // Remove listener
    this.$app.on(SocketMessages.GET_RTC_DEVICES, this.getDevices)
    // Informs user
    this.logger.push({
      date: new Date(),
      content: 'Getting devices...'
    })
    const devices = await this.enumerateDevices()
    this.$app.send(SocketMessages.GOT_RTC_DEVICES, devices)
    this.logger.push({
      date: new Date(),
      content: `Found ${devices.length} devices via HTML5.`
    })
    this._devicesDone = true
    if (this.checkTasks()) {
      // Checks if all tasks have been completed.
      this.$app.send(WindowMessages.DONE)
    }
  }

  private checkTasks() {
    return this._updateDone && this._devicesDone
  }

}