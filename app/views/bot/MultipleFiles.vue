<script setup lang="ts">
const botstore = useBotStore();
const { formBot, credenciais } = storeToRefs(botstore);
</script>

<template>
  <BContainer>
    <CredenciaisInput />
    <Xlsxinput />
    <Anexosinput />
  </BContainer>
</template>
