import { role } from '../../role'



export default {
  name: role,
  path: `/${role}`,
  component: () => import(/* webpackChunkName: "core.main" */ './index.vue'),
}