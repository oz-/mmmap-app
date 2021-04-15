import { Menu } from 'electron'

let menu: Menu | null

const init = () => {

  // No menu for splash window.
  const template: any = [
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