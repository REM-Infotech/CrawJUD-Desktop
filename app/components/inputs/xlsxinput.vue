<script setup lang="ts">
const botstore = useBotStore();
const { formBot, currentUpload, progressPos, isUpload } = storeToRefs(botstore);
const { fileUploader } = botstore;

watch(
  () => formBot.value.Xlsx,
  async (newValue) => {
    if (newValue) {
      await fileUploader.uploadFile(newValue);
    }
  },
);

const openFileXlsx = async (e: Event) => {
  e.preventDefault();
  const file = await fileDialog.openFileXlsx();
  if (file) {
    formBot.value.Xlsx = file;
  }
};
</script>

<template>
  <div
    id="arquivo-xlsx"
    class="border border-1 rounded rounded-3 p-3 mb-3"
    style="height: 135px"
  >
    <div style="height: 88px">
      <BFormGroup label="Planilha de execução" class="mb-3">
        <BFormFile
          :disabled="isUpload"
          @click="openFileXlsx"
          v-model="formBot.Xlsx"
          required
        />
      </BFormGroup>
    </div>
    <Transition name="fade">
      <ProgressBar v-if="currentUpload == formBot.Xlsx && progressPos > 0" />
    </Transition>
  </div>
</template>
