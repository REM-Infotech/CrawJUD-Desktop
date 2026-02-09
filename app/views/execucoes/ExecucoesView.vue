<script setup lang="ts">
const { mountExecucao } = logsExecucao();
const { idExecucaoQueryRef, execucoes } = storeToRefs(execucoesStore());

const { execucao } = storeToRefs(logsExecucao());

const hoveredExecIdRef = ref();
const hoveredExecId = computed(() => hoveredExecIdRef.value as number);
</script>

<template>
  <div class="card cardListagemExecucao">
    <div class="card-header headerListagemExecucao">
      {{
        execucao
          ? `Execução selecionada:  ${execucao.id_execucao}`
          : "Execuções"
      }}
    </div>
    <BFormFloatingLabel
      class="mt-2 mb-2"
      label-size="md"
      label="Filtre aqui"
      for="inputFiltro"
    >
      <BFormInput
        id="inputFiltro"
        placeholder="Filtro de execução"
        v-model="idExecucaoQueryRef"
      />
    </BFormFloatingLabel>
    <div class="body-listagem card-body">
      <TransitionGroup name="list" class="list-group" tag="div">
        <BListGroupItem
          class="d-flex justify-content-between align-items-start"
          active-class="active"
          v-for="exec in execucoes"
          :key="exec.id"
          :active="hoveredExecId === exec.id"
          @mouseenter="hoveredExecIdRef = exec.id"
          @mouseleave="hoveredExecIdRef = ''"
          @click="
            async (e: Event) => {
              e.preventDefault();
              mountExecucao(exec);
            }
          "
        >
          <div class="ms-2 me-auto">
            <div class="fw-bold">{{ exec.id_execucao }}</div>
            {{ exec.status }}
          </div>
          <!-- <BBadge variant="primary" pill>14</BBadge> -->
        </BListGroupItem>
      </TransitionGroup>
    </div>
    <div
      class="card-footer footerListagemExecucao d-flex justify-content-between"
    ></div>
  </div>
</template>

<style lang="css" scoped>
.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.cardListagemExecucao {
  height: 100%;
}

.headerListagemExecucao {
  background-color: var(--bg-header-footerListagemExecucao);
}

.bodyListagemExecucao {
  background-color: var(--bg-bodyListagemExecucao) !important;
}

.footerListagemExecucao {
  background-color: var(--bg-header-footerListagemExecucao) !important;
}

.body-listagem {
  overflow: auto;
}
</style>
