<script setup lang="ts">
import FileAuth from "./bot/FileAuth.vue";
import MultipleFiles from "./bot/MultipleFiles.vue";

const botstore = useBotStore();
const load = useLoad();
const toast = useToast();
const router = useRouter();

const {
  formBotModal,
  selectedBot,
  formBot,
  isUpload,
  formConfirmed,
  confirmForm,
  seed,
} = storeToRefs(botstore);

const { mountExecucao } = logsExecucao();
const { idExecucaoQueryRef } = storeToRefs(execucoesStore());

const FormSetups = {
  only_auth: MultipleFiles,
  file_auth: FileAuth,
  multiple_files: MultipleFiles,
  only_file: MultipleFiles,
  proc_parte: MultipleFiles,
};

const submitDesabilitado = computed(
  () => !formConfirmed.value || isUpload.value,
);

const FormComponent = computed(() => {
  if (selectedBot.value) {
    return FormSetups[selectedBot.value.configuracao_form];
  }
  return MultipleFiles;
});

type FormbotData = Record<string, string | string[]>;

async function handleSubmit(e: Event) {
  e.preventDefault();

  const message = {
    title: "Erro",
    body: "Erro ao iniciar robô",
    timeout: 1500,
  };

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
  formData["seeduploadedfiles"] = seed.value;
  formData["sid_filesocket"] = seed.value;
  try {
    const endpoint = `/bot/${selectedBot.value?.sistema}/run`;
    const response = await api.post<BotStartPayload>(endpoint, formData);
    message.body = response.data.message;
    message.title = response.data.title;

    idExecucaoQueryRef.value = response.data.id_execucao;

    await mountExecucao({
      id_execucao: response.data.id_execucao,
      Id: 0,
      bot: "",
      status: "Inicializando",
      data_inicio: "",
      data_fim: "",
    });

    await sleep(500);
    router.push({
      name: "/execucoes",
    });
  } catch {
    //
  }

  load.hide();
  toast.show(message);
  formBotModal.value = false;
}
</script>

<template>
  <form>
    <BModal
      footer-class="d-flex gap-3 flex-column w-100 align-items-start"
      size="lg"
      body-class="overflow-y-auto"
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
        <div style="min-height: 380px; max-height: 400px">
          <component :is="FormComponent" />
        </div>
      </template>
      <template #footer>
        <div class="ps-3">
          <BFormCheckbox
            :value="true"
            :unchecked-value="false"
            v-model="confirmForm"
          >
            Confirmo que os dados inseridos estão corretos
          </BFormCheckbox>
        </div>
        <BButton
          :disabled="submitDesabilitado"
          @click="handleSubmit"
          size="lg"
          :variant="submitDesabilitado ? 'outline-success' : 'success'"
          style="width: 100%"
        >
          Iniciar execução
        </BButton>
      </template>
    </BModal>
  </form>
</template>
