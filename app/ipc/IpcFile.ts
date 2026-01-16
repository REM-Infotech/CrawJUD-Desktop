/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BrowserWindow,
  dialog,
  ipcMain,
  type IpcMainInvokeEvent as InvokeEvnt,
} from "electron";
import { readFile } from "fs/promises";
import { homedir } from "os";

let Window: BrowserWindow | null;

class IpcFile {
  static async openFileXlsx(_: InvokeEvnt): Promise<FileObject | undefined> {
    const defaultDir = homedir();
    if (Window) {
      const fileDialog = await dialog.showOpenDialog(Window, {
        defaultPath: defaultDir,
        filters: [
          {
            extensions: ["xlsx", "xls"],
            name: "Planilha de execução",
          },
        ],
      });

      if (fileDialog.canceled || fileDialog.filePaths.length == 0) return;

      const filePath = fileDialog.filePaths[0] as string;
      const file = await readFile(filePath);
      const fileObj = new File([file], filePath.split(/[\\/]/).pop() || "file");

      return {
        name: filePath.split(/[\\/]/).pop() || "ArquivoExecucao.xlsx",
        type: fileObj.type,
        content: file.toString("base64"),
        size: fileObj.size,
      };
    }
  }

  static async openFiles(_: InvokeEvnt): Promise<FileObject[] | undefined> {
    const defaultDir = homedir();
    if (Window) {
      const fileDialog = await dialog.showOpenDialog(Window, {
        defaultPath: defaultDir,
        properties: ["openFile", "multiSelections"],
        filters: [
          {
            extensions: ["pdf"],
            name: "Arquivos adicionais (PDF)",
          },
        ],
      });

      if (fileDialog.canceled || fileDialog.filePaths.length == 0) return;

      const files: FileObject[] = [];

      for (let i = 0; i < fileDialog.filePaths.length; i++) {
        const filePath = fileDialog.filePaths[i] as string;
        const file = await readFile(filePath);
        const fileObj = new File(
          [file],
          filePath.split(/[\\/]/).pop() || "file"
        );

        files.push({
          name: filePath.split(/[\\/]/).pop() || `ArquivoExecucao${i}.pdf`,
          type: fileObj.type,
          content: file.toString("base64"),
          size: fileObj.size,
        });
      }

      return files;
    }
  }
}

export default function (window: BrowserWindow) {
  Window = window;

  ipcMain.handle("file-dialog:open-files", IpcFile.openFiles);
  ipcMain.handle("file-dialog:open-file-xlsx", IpcFile.openFileXlsx);
}
