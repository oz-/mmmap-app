<template lang="pug">
vuoz-preferences-panel.is-flex-column(style="overflow-y: scroll; width: 100%; height: 100%;")
  vuoz-table(
    :items="inputs",
    selectable="one",
    size="small-thin",
    border="dark-grey",
    highlight="dark-grey",
  )
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
</template>
<script lang="ts">
export { default } from "./script";
</script>

