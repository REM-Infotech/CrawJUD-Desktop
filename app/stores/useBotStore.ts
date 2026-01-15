export default defineStore("useBotStore", () => {
  const queryBot = ref("");
  const listagemBots: Ref<BotCrawJUD[]> = ref([]);
  const queryLower = computed(() => queryBot.value.toLowerCase());
  const listagem: ComputedRef<BotCrawJUD[]> = computed(() =>
    listagemBots.value.filter(
      (item) =>
        item.display_name.toLowerCase().includes(queryLower.value) ||
        item.sistema.toLowerCase().includes(queryLower.value)
    )
  );

  async function load() {
    try {
      const response = await api.post<BotPayload>("/bot/listagem");

      if (response.data && response.data.listagem) {
        listagemBots.value = response.data.listagem;
      }
    } catch {}
  }

  return {
    listagemBots,
    listagem,
    queryBot,
    load,
  };
});
