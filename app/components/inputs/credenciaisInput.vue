<script setup lang="ts">
const botstore = useBotStore();
const { formBot, credenciais } = storeToRefs(botstore);
</script>

<template>
  <BFormGroup label="Credencial" class="mb-3">
    <BFormSelect
      :options="credenciais"
      v-model="formBot.credencial"
    ></BFormSelect>
  </BFormGroup>
</template>
