<template lang="pug">
.mmmap-splash__container.is-fullsize
  // TODO: classes for flex-end and flex-start
  .is-flex-column.align-center.has-padding-md(style="justify-content: flex-end; flex-grow: 1;")
    vuoz-image(:path="require('@/gui/assets/app/logo_2020.svg')", width="400px", height="auto")
    .has-margin-top-md.has-padding-top-s.has-text-semi-bold.has-border-top-white MARCEL multimedia art platform
  .has-padding-lg.is-flex.justify-center(style="overflow: scroll;")
    keep-alive
      vuoz-console(v-if="!login", ref="console", :toolbar="false", :bordered="true", type="table", format="interval", :caller="false", sort="desc")
    vuoz-sign-in(ref="form", v-if="login", @submit="onSignIn", style="width: 300px; max-width: 300px;")
      template(v-slot:subtitle) 
        div(:class="`is-${color}`") {{ message }}
</template>
<style lang="sass">
.mmmap-splash__container
  display: grid
  grid-auto-rows: 1fr
</style>
<script lang="ts">
export { default } from './script'
</script>
