import { app } from 'electron'
import { M } from '@/shared'
import { autoUpdater } from 'electron-updater'
import { AppManager } from '@/core/app/manager'
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
  AppManager.emit(M.Updater.ERROR, error)
}

const onChecking = () => {
  AppManager.emit(M.Updater.CHECKING)
}

const onAvailable = (payload: any) => {
  const data = {
    ...payload,
    mmmap: {
      version: app.getVersion()
    }
  }
  AppManager.emit(M.Updater.AVAILABLE, data)
}

const onNotAvailable = (payload: any) => {
  const data = {
    ...payload,
    mmmap: {
      version: app.getVersion()
    }
  }
  AppManager.emit(M.Updater.UNAVAILABLE, data)
  AppManager.emit(M.Updater.DONE)
}

const onProgress = (payload: any) => {
  AppManager.emit(M.Updater.DOWNLOAD, payload)
}

const onDownloaded = (payload: any) => {
  AppManager.emit(M.Updater.DOWNLOADED, payload)
  AppManager.emit(M.Updater.DONE)
}


export default {
  name: MODULE_NAME,
  init,
  unref,
  run
}