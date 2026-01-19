/* eslint-disable @typescript-eslint/no-explicit-any */
import { contextBridge, ipcRenderer } from "electron";

const windowApi = {
  loadPreferences: (): PromiseVoid => ipcRenderer.invoke("load-preferences"),
  closeWindow: (): void => ipcRenderer.send("close-window"),
  maximizeWindow: (): void => ipcRenderer.send("maximize-window"),
  minimizeWindow: (): void => ipcRenderer.send("minimize-window"),
};

const FileDialogApi: fileDialogApi = {
  openFileXlsx: (): Promise<FileObject | undefined> =>
    ipcRenderer.invoke("file-dialog:open-file-xlsx"),

  openFiles: (): Promise<FileObject[] | undefined> =>
    ipcRenderer.invoke("file-dialog:open-files"),
};

const themeApi = {
  toggleDarkMode: (): PromiseVoid =>
    ipcRenderer.invoke("dark-mode:toggle-dark"),
  toggleToSystem: (): PromiseVoid =>
    ipcRenderer.invoke("dark-mode:toggle-system"),
  toggleLightMode: (): PromiseVoid =>
    ipcRenderer.invoke("dark-mode:toggle-light"),
  currentPreset: (): PromiseVoid =>
    ipcRenderer.invoke("dark-mode:current-preset"),
};

const fileService = {
  downloadExecucao: (kw: DownloadExec): Promise<void> =>
    ipcRenderer.invoke("download-exec", kw),

  toFileUrl: (pathFile: string): Promise<string> =>
    ipcRenderer.invoke("file-service:to-file-url", pathFile),
};

try {
  const exposes = {
    windowApi: windowApi,
    themeApi: themeApi,
    fileDialogApi: FileDialogApi,
    fileService: fileService,
  };
  Object.entries(exposes).forEach(([k, v]) =>
    contextBridge.exposeInMainWorld(k, v),
  );
} catch {}

window.addEventListener("keypress", (e) => {
  if (e) {
    if (e.key === "F11") e.preventDefault();
    if (e.key === "F5") e.preventDefault();
  }
});

contextBridge.exposeInMainWorld("electron", {
  showFile: (filePath: string) =>
    ipcRenderer.invoke("show-file-execution", filePath),
});
