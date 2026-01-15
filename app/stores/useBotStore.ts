export default defineStore("useBotStore", () => {
  const queryBot = ref("");
  const listagemBots: Ref<CrawJudBot[]> = ref([]);
  const queryLower = computed(() => queryBot.value.toLowerCase());
  const listagem: ComputedRef<CrawJudBot[]> = computed(() =>
    listagemBots.value.filter(
      (item) =>
        item.display_name.toLowerCase().includes(queryLower.value) ||
        item.sistema.toLowerCase().includes(queryLower.value)
    )
  );

  return {
    listagemBots,
    listagem,
    queryBot,
  };
});
