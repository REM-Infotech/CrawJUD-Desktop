<script setup lang="ts">
import type { Socket } from "socket.io-client";

const toast = useToast();
const botstore = useBotStore();

const { seed, formBot, seedRef } = storeToRefs(botstore);
const { isUpload, isUploadFile } = storeToRefs(botstore);

const arquivo = ref<File | null>(null);
const anexosParaEnvio = ref<File[]>([]);
const arquivoSelecionado = computed(() => arquivo.value);

const Progress = ref<ProgressoArquivos>({});

class MultipleFileUploader {
  readonly chunkSize: number = 1024 * 1024 * 10;
  public multipleFile: boolean;
  public fSocket: Socket;
  constructor() {
    this.multipleFile = false;
    this.fSocket = socketio.socket("/files");
  }

  async uploadFiles(files: File[]) {
    this.fSocket.connect();

    Progress.value = {};
    formBot.value.Anexos = [];

    isUploadFile.value = true;

    await Promise.all(files.map((f) => this.uploadFile(f)));

    isUploadFile.value = false;

    this.fSocket.disconnect();
    Progress.value = {};
  }
  private async uploadFile(f: File): Promise<"ok"> {
    formBot.value.Anexos.push(f);
    Progress.value[f.name] = { porc: 0, sent: 0 };

    const totalChunks = Math.ceil(f.size / this.chunkSize);
    const s = seed.value;

    for (let i = 0; i < totalChunks; i++) {
      const start = i * this.chunkSize;
      const end = Math.min(f.size, start + this.chunkSize);
      const chunk = f.slice(start, end);
      const arrBuff = await chunk.arrayBuffer(); // array buffer
      const cSize = arrBuff.byteLength; // curent Size

      await this.uploadToSocketIo(f, arrBuff, cSize, s);
      await this.updateProgressBar(f, cSize);

      if (end >= f.size) {
        break;
      }
    }

    const message = `Arquivo ${f.name} carregado!`;
    toast.create({
      title: "Info",
      body: message,
      modelValue: 2000,
    });
    return "ok";
  }
  private async uploadToSocketIo(
    file: File,
    arrayBuffer: ArrayBuffer,
    currentSize: number,
    seed: string,
  ) {
    await new Promise<void>((resolve, reject) => {
      this.fSocket.emit(
        "add_file",
        {
          name: Utils.formatString(file.name),
          chunk: arrayBuffer,
          current_size: currentSize,
          fileSize: file.size,
          fileType: file.type,
          seed: seed,
        },
        (err: Error | null) => {
          if (err) reject(err);
          else resolve();
        },
      );
    });
  }

  private getProgress(f: File) {
    return Progress.value[f.name] as statProgress;
  }

  private async updateProgressBar(f: File, currentSize: number) {
    const currentProgress = this.getProgress(f).porc as number;
    const totalSent = ((this.getProgress(f).sent as number) += currentSize);

    const target = Math.round((totalSent / f.size) * 100);
    const step = target > currentProgress ? 1 : -1;

    while (this.getProgress(f).porc !== target) {
      ((Progress.value[f.name] as statProgress).porc as number) += step;
      await new Promise((r) => setTimeout(r, 35));
    }
  }
}

const uploader = new MultipleFileUploader();

const openFiles = async (e: Event) => {
  e.preventDefault();
  const files = await fileDialog.openFiles();
  if (files) {
    anexosParaEnvio.value = files;
  }
};

const checkProgress = (file: File) => {
  const progressStat = Progress.value[file.name];
  const porcentagem = progressStat?.porc;
  if (progressStat) {
    if (porcentagem && porcentagem > 0) {
      return true;
    }
  }
  return false;
};

watch(anexosParaEnvio, (newValue) => {
  if (newValue) {
    uploader.uploadFiles(newValue);
  }
});
</script>

<template>
  <div id="anexos" class="border border-1 rounded rounded-3 p-3 mb-3">
    <div style="height: 88px">
      <BFormGroup label="Outros Arquivos" class="mb-3">
        <BFormFile
          :disabled="isUpload"
          @click="openFiles"
          v-model="formBot.Anexos"
          multiple
        />
      </BFormGroup>
    </div>
    <TransitionGroup
      tag="ul"
      name="list"
      class="list-group"
      style="max-height: 350px; height: 100%; overflow-y: scroll"
    >
      <BListGroupItem
        v-for="(file, idx) in formBot.Anexos"
        :key="idx"
        :active="arquivoSelecionado === file"
        class="list-group-item d-flex"
        @click="arquivo = file"
        active-class="active list-group-item-action"
      >
        <div
          id="fileItem"
          :class="
            (Progress[file.name]?.porc as number) > 0
              ? 'ms-2 me-auto expanded'
              : 'ms-2 me-auto'
          "
        >
          <div class="fw-bold">{{ file.name }}</div>
          <Transition name="fade">
            <div class="mt-3" style="height: 40px" v-if="checkProgress(file)">
              <BProgress
                :value="Progress[file.name]?.porc"
                :variant="
                  (Progress[file.name]?.porc as number) > 99
                    ? 'success'
                    : 'primary'
                "
                show-value
              />
            </div>
          </Transition>
        </div>
      </BListGroupItem>
    </TransitionGroup>
  </div>
</template>

<style lang="css" scoped>
#fileItem {
  height: 35px;
  width: 100%;
  overflow: hidden;
  transition: height 0.5s ease;
}

#fileItem.expanded {
  height: 75px;
}

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
