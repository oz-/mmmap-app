import { Component, Vue } from 'vue-property-decorator'

import VueRouter, { Route } from 'vue-router'

class MobiuszVueComponent extends Vue {
  $router!: VueRouter;
	$route!: Route;
}

/**
 * Main mmmap app GUI component.
 * @category Components
 * @component
 */
@Component
export default class App extends MobiuszVueComponent {

  public mounted(): void {
    // Loads route returned by core's MobiuszWindow instance.
    if (this.$route.query && this.$route.query.page) {
      this.$router.push({ name: (this.$route.query.page as string) })
    }
  }
  
}