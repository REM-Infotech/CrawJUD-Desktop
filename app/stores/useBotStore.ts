export default defineStore("useBotStore", () => {
  const botNs = socketio.socket("/bot");

  const queryBot = ref("");
  const listagemBots: Ref<CrawJudBot[]> = ref([]);
  const credenciaisBot: Ref<CredenciaisSelect[]> = ref([
    { value: null, text: "Selecione" },
  ]);

  const queryLower = computed(() => queryBot.value.toLowerCase());
  const credenciais: ComputedRef<CredenciaisSelect[]> = computed(
    () => credenciaisBot.value
  );
  const listagem: ComputedRef<CrawJudBot[]> = computed(() =>
    listagemBots.value.filter(
      (item) =>
        item.display_name.toLowerCase().includes(queryLower.value) ||
        item.sistema.toLowerCase().includes(queryLower.value)
    )
  );

  return {
    botNs,
    listagemBots,
    credenciaisBot,
    credenciais,
    listagem,
    queryBot,
  };
});
