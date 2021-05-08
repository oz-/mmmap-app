<template lang='pug'>
.is-flex.is-small.is-unselectable.has-padding-sm.has-border-bottom-darker-grey(style="width: 100%;")
  .is-flex.flex-grow
    .is-flex
      vuoz-button(size="tiny", shape="square", type="toggle", toggle="yellow", rounded, icon="power_settings_new", :loading="loading", @click="onToggleMedia")
    .flex-grow.has-padding-left-md.has-padding-right-sm.is-flex-column
      div {{ label }}
      // audio(ref="player", autoplay)
      .has-padding-top-sm
        video(ref="player", style="background: black;", width="160", height="90")
  
</template>
<script lang="ts">
export { default } from "./script";
</script>