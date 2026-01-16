<script setup lang="ts">
const botstore = useBotStore();
const { formBot } = storeToRefs(botstore);
const arquivo = ref<File | null>(null);
const arquivoSelecionado = computed(() => arquivo.value);
</script>

<template>
  <BContainer>
    <BFormGroup label="Credencial" class="mb-3">
      <BFormSelect></BFormSelect>
    </BFormGroup>
    <BFormGroup label="Planilha de execução" class="mb-3">
      <BFormFile @click="botstore.openFileXlsx" v-model="formBot.Xlsx" />
    </BFormGroup>
    <div id="anexos" class="border border-1 rounded rounded-3 p-3 mb-3">
      <BFormGroup label="Outros Arquivos" class="mb-3">
        <BFormFile
          @click="botstore.openFiles"
          v-model="formBot.Anexos"
          multiple
        />
      </BFormGroup>
      <TransitionGroup
        tag="ul"
        name="list"
        class="list-group list-group-numbered"
        style="max-height: 150px; height: 100%; overflow-y: scroll"
      >
        <li
          v-for="(file, idx) in formBot.Anexos"
          :key="idx"
          :active="arquivoSelecionado === file"
          :class="
            arquivoSelecionado === file
              ? 'list-group-item list-group-item-action active'
              : 'list-group-item '
          "
          @click="arquivo = file"
        >
          {{ file.name }}
        </li>
      </TransitionGroup>
    </div>
  </BContainer>
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

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
  position: absolute;
}
</style>
