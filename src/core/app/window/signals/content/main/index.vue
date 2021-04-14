<template lang="pug">
.mmmap-settings__container.is-fullsize.is-flex-column
  vuoz-title-bar(title="Signals", size="small", border="medium-grey")
  .flex-grow.is-flex
    vuoz-table(
      :items="devices",
      selectable="one",
      size="small-thin",
      border="dark-grey",
      highlight="dark-grey",
      style="width: 33%; max-width: 33%; height: 100%;"
    )
      template(slot="rows", slot-scope="props")
        vuoz-table-row(
          :row="props.row",
          :id="props.id",
          :selectable="props.selectable",
          :size="props.size",
          :border="props.border",
          :selected="props.selected",
          :highlight="props.highlight",
          @cell="onSelect"
        )
    .is-flex.flex-grow.has-border-left-medium-grey YOP
</template>
<script lang="ts">
export { default } from "./script";
</script>
