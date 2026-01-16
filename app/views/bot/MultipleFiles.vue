<script setup lang="ts">
const fileXlsx = ref();
const Anexos = ref();

const setupFile = (file: FileObject) => {
  const fileBytes = atob(file.content);
  const fileObject = new File([fileBytes], file.name, {
    type: file.type,
  });

  return fileObject;
};

const openFile = async (e: Event) => {
  e.preventDefault();
  const file = await window.fileDialogApi.openFileXlsx();

  if (file) {
    fileXlsx.value = setupFile(file);
  }
};

const openFiles = async (e: Event) => {
  e.preventDefault();
  const files = await window.fileDialogApi.openFiles();
  if (files) {
    const anexos: File[] = [];
    for (const file of files) {
      anexos.push(setupFile(file));
    }

    Anexos.value = anexos;
  }
};
</script>

<template>
  <BContainer>
    <BInputGroup label="Planilha" class="mb-3">
      <BFormFile @click="openFile" v-model="fileXlsx" />
    </BInputGroup>
    <BInputGroup label="Outros Arquivos" class="mb-3">
      <BFormFile @click="openFiles" v-model="Anexos" multiple />
    </BInputGroup>
  </BContainer>
</template>
