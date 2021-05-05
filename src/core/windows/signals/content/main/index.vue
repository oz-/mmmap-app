<template lang="pug">
.mmmap-settings__container.is-fullsize.is-flex-column
  vuoz-title-bar(title="Signals", size="small", border="medium-grey")
  .flex-grow.is-flex
    vuoz-table(
      :items="rows",
      selectable="one",
      :unselectable="false",
      :initial="0",
      size="small-thin",
      border="dark-grey",
      highlight="dark-grey",
      style="width: 33%; min-width: 33%; max-width: 33%; height: 100%;",
      @row="onSelect",
    ).has-border-right-medium-grey
      template(slot="rows", slot-scope="props")
        vuoz-table-row(
          :row="props.row",
          :id="props.id",
          :selectable="props.selectable",
          :size="props.size",
          :border="props.border",
          :selected="props.selected",
          :highlight="props.highlight"
        )
    keep-alive
      component(v-if="component", :is="component", :items="selected")
</template>
<script lang="ts">
export { default } from "./script";
</script>
