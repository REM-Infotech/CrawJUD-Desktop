import { storeToRefs } from "pinia";
import type { Socket } from "socket.io-client";

function FileUploader() {
  class fileUploader {
    private totalSent: number;
    private chunkSize: number;
    public fileSocket: Socket;

    constructor() {
      this.totalSent = 0;
      this.chunkSize = 1024 * 100;
      this.fileSocket = socketio.socket("/files");
    }

    public async uploadFile(file: File): Promise<void> {
      this.fileSocket.connect();
      this.totalSent = 0;
      await this.uploadInChunks(file, file.size);
      await this.clearProgressBar(`Arquivo ${file.name} carregado!`);
      await new Promise((resolve) => setTimeout(resolve, 500));
      this.fileSocket.disconnect();
    }
    public async uploadMultipleFile(
      FileList: File[] | undefined
    ): Promise<void> {
      this.fileSocket.connect();
      this.totalSent = 0;
      if (FileList) {
        const totalFilesSizes = FileList.reduce((acc, f) => acc + f.size, 0);
        for (const file of FileList) {
          await this.uploadInChunks(file, totalFilesSizes);
        }
        this.clearProgressBar(`Seus ${FileList.length} foram carregados!`);
      }
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
      seed: string
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
            }
          );
        }, 20); // delay envio de cada chunk
      });
    }

    private async updateProgressBar(totalSent: number, totalBytes: number) {
      // Ref da progressBar
      const { progressBarValue } = storeToRefs(useBotStore());

      // Target Progress
      const targetProgress = Math.round((totalSent / totalBytes) * 100);

      // currentProgress
      const currentProgress = progressBarValue.value;

      // step
      const step = targetProgress > currentProgress ? 1 : -1;
      while (progressBarValue.value !== targetProgress) {
        progressBarValue.value += step;
        await new Promise((r) => setTimeout(r, 5));
      }
    }

    private async clearProgressBar(message: string) {
      const { progressBarValue } = storeToRefs(useBotStore());
      toast.show({
        title: "Info",
        body: message,
        timeout: 2000,
      });

      await new Promise((r) => setTimeout(r, 2000));
      progressBarValue.value = 0.0;
      this.fileSocket.disconnect();
    }
  }

  const toast = toastStore();
  const uploader = new fileUploader();
  return uploader;
}

export default FileUploader;
