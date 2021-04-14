<template lang="pug">
.mmmap-splash__container.is-fullsize
  // TODO: classes for flex-end and flex-start
  .is-flex-column.align-center.has-padding-md(style="justify-content: flex-end;")
    vuoz-image(:path="require('@/gui/assets/app/logo_2020.svg')", width="400px", height="auto")
    .has-margin-top-md.has-padding-top-s.has-text-semi-bold.has-border-top-white MARCEL multimedia art platform
  .has-padding-lg
    vuoz-console(ref="console", :toolbar="false", :bordered="true", type="table", format="interval", :caller="false", sort="desc")
</template>
<style lang="sass">
.mmmap-splash__container
  display: grid
  grid-auto-rows: 1fr
</style>
<script lang="ts">
export { default } from './script'
</script>
