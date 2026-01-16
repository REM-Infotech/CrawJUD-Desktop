<script setup lang="ts">
import MultipleFiles from "./bot/MultipleFiles.vue";

const botstore = useBotStore();

const { formBotModal, selectedBot } = storeToRefs(botstore);

const FormSetups = {
  only_auth: MultipleFiles,
  file_auth: MultipleFiles,
  multiple_files: MultipleFiles,
  only_file: MultipleFiles,
  proc_parte: MultipleFiles,
};

const FormComponent = computed(() => {
  if (selectedBot.value) {
    return FormSetups[selectedBot.value.configuracao_form];
  }
});
</script>

<template>
  <BForm @submit="(e: Event) => e.preventDefault()">
    <BModal
      footer-class="d-flex flex-column w-100"
      size="xl"
      @hide="formBotModal = false"
      v-model="formBotModal"
    >
      <template #header>
        <span class="fw-bold fs-4">
          {{ selectedBot?.display_name }}
        </span>
      </template>
      <template #default>
        <component :is="FormComponent" />
      </template>
      <template #footer>
        <BButton type="submit" size="lg" variant="success" style="width: 360px">
          Iniciar execução
        </BButton>
      </template>
    </BModal>
  </BForm>
</template>
