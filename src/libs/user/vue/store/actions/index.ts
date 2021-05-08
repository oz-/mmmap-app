import { UserMutationTypes } from '../mutations'




export const actions = {
  setMe (context: any, value: any) {
    context.commit(UserMutationTypes.ME, value)
  },
}