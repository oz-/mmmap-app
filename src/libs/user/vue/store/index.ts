import { state } from './state'
import { mutations } from './mutations'
import { actions } from './actions'




export const UserStore = {
  name: 'user',
  namespaced: true,
  state,
  mutations,
  actions
}