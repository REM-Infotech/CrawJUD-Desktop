export default defineStore(
  "logsExecucao",
  () => {
    const toast = toastStore();
    const { botNamespace } = loggerStore();

    const SetExec = ref(false);
    const execucaoRef = ref<Execucao>();
    const logsRef = ref<Message[]>([] as Message[]);
    const Arquivo = ref();

    const logs = computed(() => logsRef.value);
    const execucao = computed(() => execucaoRef.value as Execucao);

    class LogManager {
      static async encerrarExecucao(id_execucao: string) {
        botNamespace.emit("bot_stop", { id_execucao: id_execucao });
      }

      static async pushLogs(data: Message[]) {
        for (const message of data) {
          LogManager.pushLog(message);
        }
      }

      static async pushLog(msg: Message) {
        logsRef.value = [...logsRef.value, msg];
        await sleep(500);
      }

      static async mountExecucao(exec: Execucao) {
        if (botNamespace.connected) botNamespace.disconnect();
        if (SetExec.value) return;
        if (execucao.value === exec) return;

        logsRef.value = [];

        SetExec.value = true;
        execucaoRef.value = exec;
        await sleep(1000);
        SetExec.value = false;
        botNamespace.connect();
      }

      static async download_execucao(id_execucao: string) {
        const { show, hide } = useLoad();
        botNamespace.emit("bot_stop", { id_execucao: id_execucao });
        show();
        try {
          const endpoint = `/bot/execucoes/${id_execucao}/download`;
          const response = await api.get<DownloadExec>(endpoint);
          if (response.status === 200) {
            const result = await window.fileService.downloadExecucao(
              response.data,
            );
            if (result) {
              Arquivo.value = {
                nome: response.data.file_name,
                path: result,
              };
              const _render = h(MessageArquivo, { filePath: result as string });
              toast.show({
                title: "Info",
                body: "ok",
                timeout: 1500,
              });
            }
          }
        } catch {
          toast.show({
            title: "Erro",
            body: "Não foi possivel baixar execução",
            timeout: 1500,
          });
        }

        hide();
      }
    }

    const pushLog = LogManager.pushLog;
    const mountExecucao = LogManager.mountExecucao;
    const encerrar_execucao = LogManager.encerrarExecucao;
    const download_execucao = LogManager.download_execucao;
    const pushLogs = LogManager.pushLogs;
    botNamespace.on("logbot", pushLog);

    botNamespace.on("connect", () => {
      botNamespace.emit(
        "join_room",
        { room: execucaoRef.value?.id_execucao },
        pushLogs,
      );
    });

    return {
      logs,
      execucao,
      mountExecucao,
      encerrar_execucao,
      download_execucao,
    };
  },
  {
    persist: {
      storage: localStorage,
    },
  },
);
