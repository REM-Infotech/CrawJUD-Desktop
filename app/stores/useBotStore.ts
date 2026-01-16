export default defineStore("useBotStore", () => {
  const queryBot = ref("");
  const formBotModal = ref(false);
  const selectedBot = ref<BotCrawJUD>();
  const seed = ref("");

  const listagemBots: Ref<BotCrawJUD[]> = ref([]);
  const credenciais = ref<CredenciaisSelect[]>([
    { value: null, text: "Carregando" },
  ]);
  const progressBarValue = ref(0);
  const queryLower = computed(() => queryBot.value.toLowerCase());
  const formBot = reactive<{
    Xlsx: File | null;
    Anexos: File[] | null;
    credencial: number | null;
  }>({
    Xlsx: null,
    Anexos: null,
    credencial: null,
  });

  const listagem = computed<BotCrawJUD[]>(() =>
    listagemBots.value.filter(
      (item) =>
        item.display_name.toLowerCase().includes(queryLower.value) ||
        item.sistema.toLowerCase().includes(queryLower.value)
    )
  );

  const openFileXlsx = async (e: Event) => {
    e.preventDefault();
    const file = await fileDialog.openFileXlsx();
    if (file) {
      formBot.Xlsx = file;
    }
  };

  const openFiles = async (e: Event) => {
    e.preventDefault();
    const files = await fileDialog.openFiles();
    if (files) {
      formBot.Anexos = files;
    }
  };

  async function load() {
    try {
      const response = await api.get<BotPayload>("/bot/listagem");

      if (response.data && response.data.listagem) {
        listagemBots.value = response.data.listagem;
      }
    } catch {}
  }

  watch(formBotModal, async (newValue) => {
    if (newValue) {
      seed.value = crypto.randomUUID();

      try {
        const response = await api.get<CredenciaisPayload>(
          `/bot/listagem-credenciais/${selectedBot.value?.sistema}`
        );

        if (response.status === 200) {
          credenciais.value = response.data.credenciais;
        } else if (response.status === 201) {
          formBotModal.value = false;
          toastStore().show({
            title: "Erro",
            body: "É necessário ter ao menos uma credencial cadastrada!",
            timeout: 2000,
          });
        }
      } catch {}
    }
  });

  watch(formBotModal, (newValue) => {
    if (!newValue) {
      formBot.Anexos = null;
      formBot.Xlsx = null;
      formBot.credencial = null;
      credenciais.value = [{ value: null, text: "Carregando" }];
    }
  });

  return {
    selectedBot,
    formBotModal,
    listagemBots,
    listagem,
    queryBot,
    load,
    openFileXlsx,
    openFiles,
    formBot,
    seed,
    credenciais,
    progressBarValue,
  };
});
