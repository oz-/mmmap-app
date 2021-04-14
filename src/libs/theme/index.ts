import path from 'path'
import fs from 'fs'

import { AppManager } from '@/core/manager'
import { SocketMessages } from '@/shared'

// Default theme
import { Theme } from '@vuoz/theme-core-default'





/**
 * Manages multiple themes in Vue.js
 * @class
 * @see https://stackoverflow.com/questions/52767025/how-to-load-css-file-dynamically
 */
export class ThemeManager {

  private _themes: typeof Theme[] | null = []

  constructor () {
    /*
    console.log(Theme)
    console.log('DO WE HAVE IT', Theme.paths.css)
    console.log(path.resolve(__dirname, `${Theme.package}/dist/${Theme.paths.css}`))
    */
    this._themes!.push(Theme)
    // import(`${Theme.package}/dist/${Theme.paths.css}`)
    // require.resolveWeak('@vuoz/theme-core-default/dist/css/theme.min.css')
    /*
    Theme.css = path.dirname(`@vuoz/components${Theme.css}`)
    Theme.sass = path.dirname(`@vuoz/components${Theme.sass}`)
    console.log(Theme.css)
    */
    // const exists = fs.existsSync(require.resolve(`@vuoz/theme-core-default/dist/${Theme.paths.css}`))
    // console.log('EXISTS', exists)

    // Theme.css = `../../../node_modules/${Theme.css}`
    // Theme.sass = `../../../node_modules/${Theme.sass}`
    // this._themes!.push(Theme)

    this.allThemes = this.allThemes.bind(this)
    this.cssThemeWithId = this.cssThemeWithId.bind(this)
    this.sassThemeWithId = this.sassThemeWithId.bind(this)

    AppManager.on(SocketMessages.GET_THEMES, this.allThemes)
    AppManager.on(SocketMessages.GET_THEME_CSS, this.cssThemeWithId)
    AppManager.on(SocketMessages.GET_THEME_SASS, this.sassThemeWithId)
  }

  public unref() {

    AppManager.off(SocketMessages.GET_THEMES, this.allThemes)
    AppManager.off(SocketMessages.GET_THEME_CSS, this.cssThemeWithId)
    AppManager.off(SocketMessages.GET_THEME_SASS, this.sassThemeWithId)

    this._themes = []
    this._themes = null

  }

  private allThemes(data = null, callback: any) {
    callback(this._themes)
  }

  private cssThemeWithId(id: string, callback: any) {
    const theme = this.themeWithId(id, 'css')
    callback(theme)
  }

  private sassThemeWithId(id: string, callback: any) {
    const theme = this.themeWithId(id, 'sass')
    callback(theme)
  }

  private themeWithId(id: string, module: 'css' | 'sass') {
    // console.log('YOP', id, module)
    const theme = this._themes!.find(obj => obj.id === id)
    let result
    if (theme) {
      switch(module) {
        case 'css': {
          result = {
            name: theme.name,
            path: theme.paths.css
          }
          break
        }
        case 'sass': {
          result = {
            name: theme.name,
            path: theme.paths.sass
          }
          break
        }
      }
    }
    return result
  }

  public get themes() {
    return this._themes
  }

}