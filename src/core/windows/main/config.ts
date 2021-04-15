const security = require('@/../config/security')




export default {
  title: 'mmmap',
  width: 1280,
  height: 720, 
  minWidth: 1280,
  minHeight: 720,
  titleBarStyle: 'hidden',
  thickFrame: false,
  alwaysOnTop: false,
  resizable: true,
  minimizable: true,
  maximizable: true,
  closable: true,
  show: false,
  webPreferences: {
    ...security
  }
}