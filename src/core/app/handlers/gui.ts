import { SocketMessages, WindowMessages } from '@/shared'
import { MobiuszStore } from '@/libs/store'
import { AppManager } from '@/core/manager'




const STORE = new MobiuszStore('io.benoitlahoz.mmmap.preferences')





const init = () => {

  AppManager.on(SocketMessages.GET_STORE, onGetStore)
  AppManager.on(SocketMessages.SET_STORE, onSetStore)
  AppManager.on(SocketMessages.GET_STORE_ENTRY, onGetStoreEntry)
  AppManager.on(SocketMessages.SET_STORE_ENTRY, onSetStoreEntry)

}

const unref = () => {
  
  AppManager.off(SocketMessages.GET_STORE, onGetStore)
  AppManager.off(SocketMessages.SET_STORE, onSetStore)
  AppManager.off(SocketMessages.GET_STORE_ENTRY, onGetStoreEntry)
  AppManager.off(SocketMessages.SET_STORE_ENTRY, onSetStoreEntry)

}

const onGetStore = (data = null, callback: any) => {
  const store = STORE.getAll()
  callback(store)
}

const onSetStore = (object: any) => {
  STORE.setAll(object)
}

const onGetStoreEntry = (entry: string, callback: any) => {
  const result = STORE.get(entry)
  callback(result)
}

const onSetStoreEntry = (object: any) => {
  STORE.set(object)
}

export default {
  init, 
  unref
}