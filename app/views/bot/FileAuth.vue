<script setup lang="ts">
const botstore = useBotStore();
const { formBot, credenciais } = storeToRefs(botstore);

watch(
  () => formBot.value.Xlsx,
  async (newValue) => {
    if (newValue) {
      await FileUploader().uploadFile(newValue);
    }
  }
);
</script>

<template>
  <BContainer>
    <BFormGroup label="Credencial" class="mb-3">
      <BFormSelect
        :options="credenciais"
        v-model="formBot.credencial"
      ></BFormSelect>
    </BFormGroup>
    <BFormGroup label="Planilha de execução" class="mb-3">
      <BFormFile @click="botstore.openFileXlsx" v-model="formBot.Xlsx" />
    </BFormGroup>
  </BContainer>
</template>

<style lang="css" scoped>
.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
  position: absolute;
}
</style>
