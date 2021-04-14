import { app } from 'electron'
import { SocketMessages } from '@/shared'
import { autoUpdater } from 'electron-updater'
import { AppManager } from '../manager'
import { UpdaterError } from '../errors'




const MODULE_NAME = 'Updater'

const init = () => {
  // Initializes listeners
  autoUpdater.on('error', onError)
  autoUpdater.on('checking-for-update', onChecking)
  autoUpdater.on('update-available', onAvailable)
  autoUpdater.on('update-not-available', onNotAvailable)
  autoUpdater.on('download-progress', onProgress)
  autoUpdater.on('update-downloaded', onDownloaded)
}

const unref = () => {
  // Removes listeners
  autoUpdater.off('error', onError)
  autoUpdater.off('checking-for-update', onChecking)
  autoUpdater.off('update-available', onAvailable)
  autoUpdater.off('update-not-available', onNotAvailable)
  autoUpdater.off('download-progress', onProgress)
  autoUpdater.off('update-downloaded', onDownloaded)
}

const run = () => {
  // Launches the update process
  autoUpdater.checkForUpdates()
}

const onError = (err: Error) => {
  const error = new UpdaterError(err.message)
  console.error(error)
  AppManager.emit(SocketMessages.UPDATER_ERROR, error)
}

const onChecking = () => {
  AppManager.emit(SocketMessages.UPDATER_CHECKING)
}

const onAvailable = (payload: any) => {
  const data = {
    ...payload,
    mmmap: {
      version: app.getVersion()
    }
  }
  AppManager.emit(SocketMessages.UPDATER_AVAILABLE, data)
}

const onNotAvailable = (payload: any) => {
  const data = {
    ...payload,
    mmmap: {
      version: app.getVersion()
    }
  }
  AppManager.emit(SocketMessages.UPDATER_UNAVAILABLE, data)
  AppManager.emit(SocketMessages.UPDATER_DONE)
}

const onProgress = (payload: any) => {
  AppManager.emit(SocketMessages.UPDATER_DOWNLOAD, payload)
}

const onDownloaded = (payload: any) => {
  AppManager.emit(SocketMessages.UPDATER_DOWNLOADED, payload)
  AppManager.emit(SocketMessages.UPDATER_DONE)
}


export default {
  name: MODULE_NAME,
  init,
  unref,
  run
}