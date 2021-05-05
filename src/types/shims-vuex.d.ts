import { ComponentCustomProperties } from 'vue'
import { Store } from 'vuex'

declare module '@vue/runtime-core' {
  // Provides typings for `this.$store`
  interface ComponentCustomProperties {
    $store: Store
  }
}