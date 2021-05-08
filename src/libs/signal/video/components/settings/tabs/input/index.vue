<template lang="pug">
vuoz-preferences-panel(style="width: 100%; height: 100%;")
  .flex-grow(style="height: 100%;")
    div(style="flex: 1 1 auto;")
      h3.has-border-bottom-medium-grey.has-padding-bottom-s.has-margin-left-ms.has-margin-right-ms.is-unselectable General
      .has-padding-ms TODO: General options
      h3.has-border-bottom-medium-grey.has-padding-bottom-s.has-margin-left-ms.has-margin-right-ms.is-unselectable Devices
      div(style="flex: 1 1 auto; width: 100%; height: 100%; overflow-y: scroll;")
        vuoz-table(
          :items="inputs",
          selectable="one",
          size="small-thin",
          border="dark-grey",
          highlight="dark-grey"
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

