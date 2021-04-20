<template lang="pug">
vuoz-preferences-panel.is-flex-column
  .is-flex-column.flex-grow
    h3.has-border-bottom-medium-grey.has-padding-bottom-s.has-margin-left-ms.has-margin-right-ms.is-unselectable Listener
    .has-margin-left-ms.has-margin-right-ms
      .is-flex
        vuoz-checkbox.has-margin-right-sm(
          ref="inputCheckbox",
          type="push",
          size="tiny",
          color="medium-grey",
          toggle="yellow",
          rounded
        )
        vuoz-input.has-margin-right-sm(
          type="text",
          size="tiny",
          :initial="label",
          color="dark-grey",
          label="Name",
          icon="label",
          labelPosition="bottom",
          rounded,
          :disabled="disabled"
          @change="onChange('label', $event)",
        )
        vuoz-input.has-margin-right-sm(
          type="integer",
          size="tiny",
          :initial="port",
          color="dark-grey",
          label="Port",
          labelPosition="bottom",
          rounded,
          :disabled="disabled"
          @change="onChange('port', $event)",
        )
        vuoz-button(
          ref="button",
          size="tiny",
          type="toggle",
          color="medium-grey",
          toggle="success",
          weight="semi-bold",
          rounded,
          uppercase,
          :loading="loading",
          @click="onOpen"
        )
          template(v-slot:main) {{ button }}
      .is-flex.is-danger {{ inputMessage }}
    h3.has-border-bottom-medium-grey.has-padding-bottom-s.has-margin-left-ms.has-margin-right-ms.has-margin-bottom-0.is-unselectable Emitters
    div(style="flex: 1 1 auto; height: 0; overflow-y: scroll;")
      vuoz-table(
        :items="emitters",
        selectable="one",
        size="small-thin",
        border="dark-grey",
        highlight="dark-grey",
        @row="onSelectEmitter(true, $event)",
        @unselect="onSelectEmitter(false)"
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
  vuoz-toolbar(
    :items="toolbar",
    type="fixed",
    position="bottom",
    size="tiny",
    color="darker-grey",
    border="medium-grey",
    :shadow="false",
    style="height: max-content"
  )
</template>
<style lang="sass" scoped>
</style>
<script lang="ts">
export { default } from "./script";
</script>

