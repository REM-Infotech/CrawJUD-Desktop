<script setup lang="ts">
import type { BaseColorVariant } from "bootstrap-vue-next";

const { logs, execucao } = storeToRefs(logsExecucao());
const { encerrar_execucao, download_execucao } = logsExecucao();

const itemLog: elementRef = ref(null);

const valores = computed(() => {
  const mensagens = [...logs.value];
  const sucessos0 = mensagens.filter(
    (item) => item.message_type === "success" && item.row > 0,
  );
  const erros0 = mensagens.filter(
    (item) => item.message_type === "error" && item.row > 0,
  );
  const item = (mensagens.reverse()[0] as Message) || {};
  const sucessos = sucessos0.length;
  const erros = erros0.length;
  const restantes = item.restantes || 0;
  const total = item.total || 0;
  console.log(mensagens);
  return {
    sucessos: sucessos,
    erros: erros,
    total: total,
    restantes: restantes,
  };
});

watch(
  itemLog,
  async (newVal) => {
    if (!newVal) return;

    const el = newVal as HTMLElement;

    await nextTick();
    const scrollContainer = el.closest(".body-logs-execucao");
    if (scrollContainer) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      el.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "nearest",
      });
    }
  },
  {
    deep: true,
  },
);

const classLogs: Record<MessageType, string> = {
  log: "border border-2 border-info",
  success: "border border-2 border-success",
  error: "border border-2 border-danger",
  info: "border border-2 border-warning",
  warning: "border border-2 border-warning",
};

const VariantLogs: Record<MessageType, keyof BaseColorVariant> = {
  success: "success",
  error: "danger",
  info: "warning",
  log: "info",
  warning: "warning",
};
</script>

<template>
  <div class="card cardLogsExecucao">
    <div
      class="card-header headerLogsExecucao d-flex justify-content-between align-items-center p-3"
    >
      <span class="fw-bold fs-5">
        {{
          execucao
            ? `Execução ${execucao.id_execucao}`
            : "Selecione uma Execução"
        }}
      </span>

      <div style="min-height: 35px" class="d-flex gap-1">
        <BButton
          v-if="execucao"
          size="md"
          variant="primary"
          @click="download_execucao(execucao.id_execucao)"
        >
          <span class="fw-bold"> Baixar Arquivos </span>
        </BButton>
        <BButton
          size="md"
          variant="danger"
          v-if="execucao && execucao.status === 'Em Execução'"
          @click="encerrar_execucao(execucao.id_execucao)"
        >
          <span class="fw-bold"> Encerrar Execução </span>
        </BButton>
      </div>
    </div>
    <div class="body-logs-execucao card-body bodyLogsExecucao">
      <TransitionGroup name="list-logs" class="list-group" tag="div">
        <div
          :ref="
            (el) => {
              itemLog = el;
            }
          "
          :class="[
            'd-flex',
            'justify-content-between',
            'align-items-start',
            classLogs[log.message_type],
          ]"
          v-for="(log, idx) in logs"
          :key="idx"
          class="list-group-item"
        >
          <div class="ms-2 me-auto">
            <div class="fw-bold" style="line-break: anywhere">
              {{ log.message }}
            </div>
            <div class="d-flex gap-1">
              <BBadge :variant="VariantLogs[log.message_type]">
                {{ log.message_type }}
              </BBadge>
              <BBadge variant="primary">
                {{ log.time_message }}
              </BBadge>
              <div style="width: 50px">
                <BBadge variant="secondary" v-if="log.row > 0">
                  linha planilha: {{ log.row }}
                </BBadge>
              </div>
            </div>
          </div>
        </div>
      </TransitionGroup>
    </div>
    <div class="card-footer footerLogsExecucao d-flex justify-content-between">
      <span class="fw-bold">
        {{ execucao ? `Status ${execucao.status}` : "" }}
      </span>

      <div>
        <span>
          Total: <strong>{{ valores.total }}</strong>
        </span>
        |
        <span>
          Sucessos: <strong>{{ valores.sucessos }}</strong>
        </span>
        |
        <span
          >Erros:
          <strong>{{ valores.erros }}</strong>
        </span>
        |
        <span
          >Restantes
          <strong>{{ valores.restantes }}</strong>
        </span>
      </div>
    </div>
  </div>
</template>
<style lang="css">
[app-theme="dark"] {
  --bg-header-footerLogsExecucao: var(--color-flirt-800);
  --bg-bodyLogsExecucao: var(--color-flirt-900);
}

[app-theme="light"] {
  --bg-header-footerLogsExecucao: var(--color-flirt-200);
  --bg-bodyLogsExecucao: var(--color-flirt-300);
}
</style>
<style lang="css" scoped>
.list-logs-move, /* apply transition to moving elements */
.list-logs-enter-active,
.list-logs-leave-active {
  transition: all 0.5s ease;
}

.list-logs-enter-from,
.list-logs-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.cardLogsExecucao {
  height: 100%;
}

.headerLogsExecucao {
  background-color: var(--bg-header-footerLogsExecucao);
}

.bodyLogsExecucao {
  background-color: var(--bg-bodyLogsExecucao) !important;
}

.footerLogsExecucao {
  background-color: var(--bg-header-footerLogsExecucao) !important;
}

.row-execucoes {
  width: 100%;
  box-sizing: border-box;
}

.body-logs-execucao {
  overflow: auto;
}
</style>
