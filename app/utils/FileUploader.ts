import { storeToRefs } from "pinia";
import type { Socket } from "socket.io-client";

function FileUploader() {
  class fileUploader {
    private totalSent: number;
    private chunkSize: number;
    public fileSocket: Socket;
    private multipleFile: boolean;
    constructor() {
      this.totalSent = 0;
      this.chunkSize = 10240 * 100;
      this.fileSocket = socketio.socket("/files");
      this.multipleFile = false;
    }

    public async uploadFile(file: File): Promise<void> {
      const { currentUpload, isUploadFile } = storeToRefs(useBotStore());
      this.fileSocket.connect();
      this.totalSent = 0;

      isUploadFile.value = true;
      currentUpload.value = file;

      await this.uploadInChunks(file, file.size);
      await this.clearProgressBar(`Arquivo ${file.name} carregado!`);
      this.fileSocket.disconnect();
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
    public async uploadMultipleFile(FileList: File[]): Promise<void> {
      const { currentUpload, isUploadFile } = storeToRefs(useBotStore());

      isUploadFile.value = true;
      this.multipleFile = true;

      for (const file of FileList) {
        currentUpload.value = file;
        await this.uploadFile(file);
      }
      this.clearProgressBar(`Seus ${FileList.length} foram carregados!`);

      isUploadFile.value = false;
      this.multipleFile = false;
    }

    private async uploadInChunks(file: File, totalSize: number) {
      const totalChunks = Math.ceil(file.size / this.chunkSize);
      const { seed } = storeToRefs(useBotStore());
      for (let i = 0; i < totalChunks; i++) {
        const start = i * this.chunkSize;
        const end = Math.min(file.size, start + this.chunkSize);
        const chunk = file.slice(start, end);
        const arrayBuffer = await chunk.arrayBuffer();
        const currentSize = arrayBuffer.byteLength;

        this.totalSent = this.totalSent + currentSize;

        await this.uploadToSocketIo(file, arrayBuffer, currentSize, seed.value);
        await this.updateProgressBar(this.totalSent, totalSize);

        if (end >= totalSize) {
          break;
        }
      }
    }

    private async uploadToSocketIo(
      file: File,
      arrayBuffer: ArrayBuffer,
      currentSize: number,
      seed: string,
    ) {
      await new Promise<void>((resolve, reject) => {
        setTimeout(() => {
          this.fileSocket.emit(
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
        }, 250); // delay envio de cada chunk
      });
    }

    private async updateProgressBar(totalSent: number, totalBytes: number) {
      // Ref da progressBar
      const { progressPos } = storeToRefs(useBotStore());

      // Target Progress
      const targetProgress = Math.round((totalSent / totalBytes) * 100);

      // currentProgress
      const currentProgress = progressPos.value;

      // step
      const step = targetProgress > currentProgress ? 1 : -1;
      while (progressPos.value !== targetProgress) {
        progressPos.value += step;
        await new Promise((r) => setTimeout(r, 1));
      }
    }

    private async clearProgressBar(message: string) {
      const { progressPos, isUploadFile } = storeToRefs(useBotStore());
      toast.show({
        title: "Info",
        body: message,
        timeout: 2000,
      });

      await new Promise((r) => setTimeout(r, 250));
      progressPos.value = 0.0;

      if (!this.multipleFile) {
        isUploadFile.value = false;
      }
    }
  }

  const toast = toastStore();
  const uploader = new fileUploader();
  return uploader;
}

export default FileUploader;
