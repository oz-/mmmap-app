import { ApplicationMutationTypes } from '../mutations'
import Vue from 'vue'
import { Store } from "vuex"
import { M } from '@/shared'




export const initSharedStorePlugin = (store: Store<any>) => {

  const app = Vue.prototype.$app
  store.subscribe((mutation, state) => {

    // TODO
    // See Capture d'écran of 20210428 in the Dropbox

    console.log(mutation, state)
  })

}