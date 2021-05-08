









import { UserState } from '../state'




export enum UserMutationTypes {
  // Me
  ME = 'user:me',
}

export const mutations = {
  [UserMutationTypes.ME]: (state: UserState, value: any) => {
    state.me = value
  }
}