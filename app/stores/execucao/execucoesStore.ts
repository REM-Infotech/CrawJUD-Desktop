export default defineStore(
  "execucoesStore",
  () => {
    const execucoesRef = ref<Execucoes>([]);
    const sistemaQueryRef = ref("");
    const idExecucaoQueryRef = ref("");

    const idExecucaoQuery = computed(() => idExecucaoQueryRef.value);
    const sistemaQuery = computed(() => sistemaQueryRef.value);

    const execucoes: ComputedRef<Execucoes> = computed(() =>
      execucoesRef.value.filter((item) => {
        if (!sistemaQuery.value) {
          return item.id_execucao
            .toLowerCase()
            .includes(idExecucaoQuery.value.toLowerCase());
        }
        return item.bot === sistemaQuery.value;
      }),
    );

    class ExecucoesManager {
      static async listarExecucoes() {
        try {
          const response = await api.get<ExecucoesPayload>("/bot/execucoes");
          console.log(response);
          if (response.status === 200) {
            execucoesRef.value = [...response.data.listagem];
          }
        } catch {}
      }
    }

    const listar_execucoes = ExecucoesManager.listarExecucoes;

    return {
      execucoesRef,
      execucoes,
      listar_execucoes,
      idExecucaoQuery,
      idExecucaoQueryRef,
      sistemaQuery,
      sistemaQueryRef,
    };
  },
  {
    persist: {
      storage: localStorage,
    },
  },
);
