class FileDialogService {
  static setupFile(file: FileObject) {
    // Converte o conteúdo base64 para um Uint8Array sem usar atob
    function base64ToUint8Array(base64: string): Uint8Array {
      const binaryString = window.atob(base64.replace(/[\r\n]+/g, ""));
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      return bytes;
    }
    const fileBytes = base64ToUint8Array(file.content);
    const buff = fileBytes.buffer as ArrayBuffer;
    const fileObject = new File([buff], file.name, {
      type: file.type,
    });

    return fileObject;
  }

  static async openFileXlsx() {
    const file = await window.fileDialogApi.openFileXlsx();

    if (file) {
      return FileDialogService.setupFile(file);
    }
  }

  static async openFiles() {
    const files = await window.fileDialogApi.openFiles();
    if (files) {
      const anexos: File[] = [];
      for (const file of files) {
        anexos.push(FileDialogService.setupFile(file));
      }

      return anexos;
    }
  }
}

export default FileDialogService;
