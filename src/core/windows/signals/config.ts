const security = require('@/../config/security')




export default {
  title: 'Signals',
  width: 800,
  height: 600, 
  minWidth: 800,
  minHeight: 600,
  titleBarStyle: 'hidden',
  thickFrame: false,
  alwaysOnTop: false,
  resizable: true,
  minimizable: false,
  maximizable: false,
  closable: true,
  modal: true,
  show: false,
  webPreferences: {
    ...security
  }
}