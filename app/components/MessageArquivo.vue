<script setup lang="ts">
defineProps({
  filePath: {
    type: String,
    required: false,
  },
});
const { Arquivo } = storeToRefs(logsExecucao());

async function verArquivo(ev: PointerEvent) {
  ev.preventDefault();
  await window.electron.showFile(Arquivo.value.path);
}
</script>

<template>
  <div>
    <p>
      <span>Arquivo {{ Arquivo.nome }} salvo com sucesso!</span>
    </p>
    <p>
      Para ver o arquivo,
      <a
        href="#"
        @click="verArquivo"
        class="link-opacity-100 link-offset-3 link-primary"
      >
        Clique aqui!
      </a>
    </p>
  </div>
</template>
