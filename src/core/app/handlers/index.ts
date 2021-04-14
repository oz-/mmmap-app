import AppHandlers from './app'
import GuiHandlers from './gui'




const init = () => {

  AppHandlers.init()
  GuiHandlers.init()

}

const unref = () => {

  AppHandlers.unref()
  GuiHandlers.unref()

}

export default {
  init,
  unref
}