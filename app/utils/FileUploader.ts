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
      this.chunkSize = 9000 * 125;
      this.fileSocket = socketio.socket("/files");
      this.multipleFile = false;
    }

    public async uploadFile(file: File): Promise<void> {
      const { currentFileUpload, isUploadFile } = storeToRefs(useBotStore());
      this.fileSocket.connect();
      this.totalSent = 0;

      isUploadFile.value = true;
      currentFileUpload.value = file;

      await this.uploadInChunks(file, file.size);
      await this.clearProgressBar(`Arquivo ${file.name} carregado!`);
      await new Promise((resolve) => setTimeout(resolve, 500));
      this.fileSocket.disconnect();
    }
    public async uploadMultipleFile(FileList: File[]): Promise<void> {
      const { currentFileUpload, isUploadFile } = storeToRefs(useBotStore());

      isUploadFile.value = true;
      this.multipleFile = true;

      for (const file of FileList) {
        currentFileUpload.value = file;
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

        await this.uploadToSocketIo(
          file,
          arrayBuffer,
          currentSize,
          seed.value,
          totalSize
        );

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
      totalBytes: number
    ) {
      // Ref da progressBar
      const { progressBarValue } = storeToRefs(useBotStore());

      // Target Progress
      const targetProgress = Math.round((this.totalSent / totalBytes) * 100);

      // currentProgress
      const currentProgress = progressBarValue.value;

      // step
      const step = targetProgress > currentProgress ? 1 : -1;
      while (progressBarValue.value !== targetProgress) {
        await new Promise(
          (resolve, reject) =>
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
                  else resolve(null);
                }
              );
            }, 2) // delay envio de cada chunk
        );

        progressBarValue.value += step;
      }
    }

    private async clearProgressBar(message: string) {
      const { progressBarValue, isUploadFile } = storeToRefs(useBotStore());
      toast.show({
        title: "Info",
        body: message,
        timeout: 2000,
      });

      await new Promise((r) => setTimeout(r, 1500));
      progressBarValue.value = 0.0;
      this.fileSocket.disconnect();

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
