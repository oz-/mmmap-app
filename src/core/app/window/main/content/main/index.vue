<template lang="pug">
.mmmap-main__container
  vuoz-title-bar(title="mmmap", border="medium-grey", size="small")
  .flex-grow.is-flex
    .is-fullwidth
      vuoz-toolbar(:items="items", type="fixed", position="top", size="small", color="darker-grey", border="medium-grey", :shadow="false")
      .flex-grow.is-fullheight.is-flex
        div(style="width: 70px").has-border-right-medium-grey BAR
        .flex-grow.is-flex
          vuoz-split-view(:settings="{ min: 70, max: 80 }", @change="onSplitView('splitview.main.center', $event)")
            div(slot="first").flex-grow.is-fullheight.is-flex
              vuoz-tabs(:tabs="tabs", :showAdd="false")
            div(slot="second").is-fullheight.is-flex
              vuoz-split-view(:settings="{ min: 30, max: 70 }", direction="horizontal", @change="onSplitView('splitview.main.right.horizontal', $event)")
  

</template>
<style lang="sass">
// TODO: pass all this in theme-api defaults
@import "@vuoz/theme-core-default/dist/sass/theme.sass"

.mmmap-main__container
  @extend .is-fullsize
  @extend .is-flex-column
</style>
<script lang="ts">
export { default } from './script'
</script>
