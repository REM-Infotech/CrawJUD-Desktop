<script setup lang="ts">
const botstore = useBotStore();
const { formBot, currentFileUpload, progressBarValue, uploadingFiles } =
  storeToRefs(botstore);
const arquivo = ref<File | null>(null);
const arquivoSelecionado = computed(() => arquivo.value);
watch(
  () => formBot.value.Anexos,
  async (newValue) => {
    if (newValue) {
      await FileUploader().uploadMultipleFile(newValue);
    }
  }
);
</script>

<template>
  <div id="anexos" class="border border-1 rounded rounded-3 p-3 mb-3">
    <div style="height: 88px">
      <BFormGroup label="Outros Arquivos" class="mb-3">
        <BFormFile
          :disabled="uploadingFiles"
          @click="botstore.openFiles"
          v-model="formBot.Anexos"
          multiple
        />
      </BFormGroup>
    </div>
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
            ? 'list-group-item list-group-item-action active  d-flex justify-content-between align-items-start'
            : 'list-group-item  d-flex justify-content-between align-items-start'
        "
        @click="arquivo = file"
      >
        <div class="ms-2 me-auto" style="height: 55px; width: 100%">
          <div class="fw-bold mb-2">{{ file.name }}</div>
          <Transition name="fade">
            <ProgressBar
              v-if="currentFileUpload == file && progressBarValue > 0"
            />
          </Transition>
        </div>
      </li>
    </TransitionGroup>
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

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
  position: absolute;
}
</style>
