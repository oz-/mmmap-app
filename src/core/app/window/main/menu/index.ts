import { AppManager } from '@/core/manager'
import { WindowMessages } from '@/shared'
import { app, Menu, MenuItem } from 'electron'

let menu: Menu | null

const init = () => {

  // No menu for splash window.
  const template: any = [
    {
      label: app.name,
      submenu: [
        { role: 'about' },
        { label: 'Check for updates' },
        { type: 'separator' },
        {
          label: 'Preferences',
          click() {
            // TODO: Pass parent to 'init' method.
            AppManager.emit(WindowMessages.CREATE, 'core.settings')
          }
        },
        { type: 'separator' },
        { role: 'services' },
        { type: 'separator' },
        { role: 'hide' },
        { role: 'hideothers' },
        { role: 'unhide' },
        { type: 'separator' },
        { role: 'quit' }
      ]
    },
    {
      label: 'Spaces',
      submenu: [
        { label: 'Show Navigator...', accelerator: 'Shift+CommandOrControl+N' },
        { type: 'separator' },
        { label: 'Personal...' },
        { type: 'separator' },
        {
          label: 'Owned',
          submenu: [
            { label: 'Create a new space...' }
          ]
        },
        {
          label: 'Participating',
          submenu: [
            { label: 'Browse spaces...' }
          ]
        },
      ]
    },
    {
      label: 'Signals',
      submenu: [
        {
          label: 'Manage...', 
          accelerator: 'Shift+CommandOrControl+S',
          click() {
            // TODO: Pass parent to 'init' method.
            AppManager.emit(WindowMessages.CREATE, 'core.signals')
          }
        },
        { type: 'separator' },
        { label: 'Video Inputs' },
        {
          label: 'Video Outputs',
          submenu: [
            { label: 'Toggle All' },
            { type: 'separator' },
            {
              label: 'Displays',
              submenu: [
                { label: 'Secondary Screen', type: 'checkbox', checked: true }
              ]
            },
            { type: 'separator' },
            { label: 'Syphon', type: 'checkbox', checked: false },
            { label: 'NDI', type: 'checkbox', checked: false },
            { label: 'Virtual Camera', type: 'checkbox', checked: false }
          ]
        },
        { type: 'separator' },
        { label: 'Audio Inputs' },
        { label: 'Audio Outputs' },
        { type: 'separator' },
        {
          label: 'OSC',
          submenu: [
            { label: 'Create Server...' }
          ]
        },
        { label: 'MIDI' },
        { label: 'Serial' },
        { type: 'separator' },
        { label: 'Remote', submenu: [
          { label: 'Add...' }
        ] },
        { label: 'Custom...' },
      ]
    },
    {
      role: 'windowMenu',
      submenu: [
        { role: 'minimize' },
        { role: 'zoom' },
        { type: 'separator' },
        { role: 'front' },
      ]
    },
    {
      label: 'Developper',
      submenu: [
        { role: 'forceReload' },
        { role: 'toggleDevTools' }
      ]
    }
  ]
  menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)

}

const unref = () => {
  menu = null
}

export default {
  init,
  unref
}