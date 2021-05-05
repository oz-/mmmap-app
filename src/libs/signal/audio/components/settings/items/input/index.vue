<template lang='pug'>
.is-flex-column.is-small.is-unselectable.has-padding-sm(style="width: 100%; height: 100px;")
  div(ref="waveform", style="height: 70px;")
  div {{ label }}
</template>
<script lang="ts">
export { default } from "./script";
</script>