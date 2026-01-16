<script setup lang="ts">
const botstore = useBotStore();
const { progressBarValue } = storeToRefs(botstore);
</script>
<template>
  <BProgress
    style="width: 100%"
    :value="progressBarValue"
    :variant="progressBarValue > 99 ? 'success' : 'primary'"
    show-value
  />
</template>
