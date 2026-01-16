<script setup lang="ts">
import FileAuth from "./bot/FileAuth.vue";
import MultipleFiles from "./bot/MultipleFiles.vue";

const botstore = useBotStore();
const load = useLoad();

const { formBotModal, selectedBot, formBot } = storeToRefs(botstore);
const FormSetups = {
  only_auth: MultipleFiles,
  file_auth: FileAuth,
  multiple_files: MultipleFiles,
  only_file: MultipleFiles,
  proc_parte: MultipleFiles,
};

const FormComponent = computed(() => {
  if (selectedBot.value) {
    return FormSetups[selectedBot.value.configuracao_form];
  }
  return MultipleFiles;
});

type FormbotData = Record<string, string | string[]>;

async function handleSubmit(e: Event) {
  e.preventDefault();

  load.show();

  const list_items = Object.entries(formBot.value)
    .filter(([_, value]) => value !== null)
    .map((item) => {
      const key = item[0].toLowerCase();
      const value = item[1];

      if (value instanceof File) {
        return [key, value.name];
      }

      if (Array.isArray(value) && value.every((it) => it instanceof File)) {
        const anexo = value.map((file: File) => file.name);
        return [key, anexo];
      }

      return [key, String(value)];
    });

  const formData: FormbotData = Object.fromEntries(list_items);

  formData["configuracao_form"] = String(selectedBot.value?.configuracao_form);
  formData["bot_id"] = String(selectedBot.value?.Id);

  try {
    await api.post(`/bot/${selectedBot.value?.sistema}/run`, formData);
  } catch (err) {
    console.log(err);
  }

  load.hide();
}
</script>

<template>
  <form>
    <BModal
      footer-class="d-flex flex-column w-100"
      size="lg"
      centered
      @hide="formBotModal = false"
      v-model="formBotModal"
    >
      <template #header>
        <span class="fw-bold fs-4">
          {{ selectedBot?.display_name }}
        </span>
      </template>
      <template #default>
        <div style="height: 480px">
          <component :is="FormComponent" />
        </div>
      </template>
      <template #footer>
        <BButton
          @click="handleSubmit"
          size="lg"
          variant="success"
          style="width: 360px"
        >
          Iniciar execução
        </BButton>
      </template>
    </BModal>
  </form>
</template>
