<script setup lang="ts">
import BuscaProcessual from "./bot/BuscaProcessual.vue";
import FileAuth from "./bot/FileAuth.vue";
import MultipleFiles from "./bot/MultipleFiles.vue";

const { botNamespace } = loggerStore();

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
  busca_processo: BuscaProcessual,
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
    .filter(([key, value]) => {
      if (value !== null) {
        if (Array.isArray(value) && value.length > 0) {
          return true;
        } else if (!Array.isArray(value)) {
          return true;
        } else if (key === "data_inicio" || key === "data_fim") {
          return true;
        }
        return false;
      }
      return false;
    })
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

      if (key === "data_inicio" || key === "data_fim") {
        const [y, m, d] = String(value).split("-").map(Number);
        const dt = new Date(y as number, (m as number) - 1, d as number);

        const day = String(dt.getDate()).padStart(2, "0");
        const month = String(dt.getMonth() + 1).padStart(2, "0");

        const strftime = `${day}/${month}/${dt.getFullYear()}`;
        return [key, strftime];
      }

      return [key, String(value)];
    });

  const formData: FormbotData = Object.fromEntries(list_items);
  formData["configuracao_form"] = String(selectedBot.value?.configuracao_form);
  formData["bot_id"] = String(selectedBot.value?.id);
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
      id: 0,
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
  toast.create(message);
  formBotModal.value = false;
}
</script>

<template>
  <form>
    <BModal
      footer-class="d-flex gap-3 flex-column w-100 align-items-start"
      size="xl"
      body-class="overflow-y-auto"
      centered
      @hide="formBotModal = false"
      v-model="formBotModal"
      no-close-on-backdrop
      :no-header-close="false"
      :title="selectedBot?.display_name"
    >
      <template #header> </template>
      <template #default>
        <div style="min-height: 380px">
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
