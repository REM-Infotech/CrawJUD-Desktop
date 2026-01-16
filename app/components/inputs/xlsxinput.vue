<script setup lang="ts">
const botstore = useBotStore();
const {
  formBot,
  currentFileUpload,
  progressBarValue,
  isUploadFile,
  uploadingFiles,
} = storeToRefs(botstore);

watch(
  () => formBot.value.Xlsx,
  async (newValue) => {
    if (newValue) {
      await FileUploader().uploadFile(newValue);
    }
  }
);
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
          :disabled="uploadingFiles"
          @click="botstore.openFileXlsx"
          v-model="formBot.Xlsx"
          required
        />
      </BFormGroup>
    </div>
    <Transition name="fade">
      <ProgressBar
        v-if="currentFileUpload == formBot.Xlsx && progressBarValue > 0"
      />
    </Transition>
  </div>
</template>
