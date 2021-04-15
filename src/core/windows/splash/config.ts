const security = require('@/../config/security')




export default {
  title: 'mmmap',
  width: 800,
  height: 800, 
  minWidth: 800,
  minHeight: 800,
  titleBarStyle: 'hidden',
  thickFrame: false,
  alwaysOnTop: false,
  resizable: false,
  minimizable: false,
  maximizable: false,
  closable: false,
  show: false,
  webPreferences: {
    ...security
  }
}