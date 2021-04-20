<template lang='pug'>
.is-flex.align-center.is-small.is-unselectable.has-padding-sm
  vuoz-checkbox.has-margin-right-sm(
    ref="inputCheckbox",
    type="push",
    size="tiny",
    color="medium-grey",
    toggle="yellow",
    rounded,
    @click="onTest"
  )
  vuoz-input.has-margin-right-sm(
    type="text",
    size="tiny",
    :initial="label",
    color="dark-grey",
    icon="label",
    rounded,
    :disabled="disabled"
    @change="onChange('name', $event)"
  )
  vuoz-input.has-margin-right-sm(
    type="text",
    size="tiny",
    :initial="address",
    color="dark-grey",
    icon="dns",
    rounded,
    :disabled="disabled"
    @change="onChange('host', $event)"
  )
  vuoz-input.has-margin-right-sm(
    type="integer",
    size="tiny",
    :initial="portNumber",
    color="dark-grey",
    rounded,
    width="5rem",
    :disabled="disabled"
    @change="onChange('port', $event)"
  )
  vuoz-button(
    ref="button",
    size="tiny",
    type="toggle",
    color="medium-grey",
    weight="semi-bold",
    toggle="success",
    rounded,
    uppercase,
    @click="onOpen"
  )
    template(v-slot:main) {{ button }}
</template>
<script lang="ts">
export { default } from "./script";
</script>