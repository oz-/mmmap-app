<template lang="pug">
div 
  div Inputs component
  div(v-for="item in items") {{ item.label }}
</template>
<script lang="ts">
export { default } from "./script";
</script>

