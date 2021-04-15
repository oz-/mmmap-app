<template lang="pug">
div 
  div Outputs
  div(v-for="item in items") {{ item.label }}
</template>
<script lang="ts">
export { default } from "./script";
</script>

