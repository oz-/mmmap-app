import { MobiuszStore } from '@/libs/store'
import{ Store } from '@/libs/store/shared'
import { AppManager } from '@/core/app/manager'




const STORE = new MobiuszStore('io.benoitlahoz.mmmap.preferences')





const init = () => {

  AppManager.on(Store.Event.GET, onGetStore)
  AppManager.on(Store.Event.SET, onSetStore)
  AppManager.on(Store.Event.GET_ENTRY, onGetStoreEntry)
  AppManager.on(Store.Event.SET_ENTRY, onSetStoreEntry)

}

const unref = () => {
  
  AppManager.off(Store.Event.GET, onGetStore)
  AppManager.off(Store.Event.SET, onSetStore)
  AppManager.off(Store.Event.GET_ENTRY, onGetStoreEntry)
  AppManager.off(Store.Event.SET_ENTRY, onSetStoreEntry)

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