/* eslint-disable @typescript-eslint/no-explicit-any */
import { contextBridge, ipcRenderer } from "electron";

const windowApi = {
  loadPreferences: (): PromieVoid => ipcRenderer.invoke("load-preferences"),
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
  toggleDarkMode: (): PromieVoid => ipcRenderer.invoke("dark-mode:toggle-dark"),
  toggleToSystem: (): PromieVoid =>
    ipcRenderer.invoke("dark-mode:toggle-system"),
  toggleLightMode: (): PromieVoid =>
    ipcRenderer.invoke("dark-mode:toggle-light"),
  currentPreset: (): PromieVoid =>
    ipcRenderer.invoke("dark-mode:current-preset"),
};

try {
  const exposes = {
    windowApi: windowApi,
    themeApi: themeApi,
    fileDialogApi: FileDialogApi,
  };
  Object.entries(exposes).forEach(([k, v]) =>
    contextBridge.exposeInMainWorld(k, v)
  );
} catch {}

window.addEventListener("keypress", (e) => {
  if (e) {
    if (e.key === "F11") e.preventDefault();
    if (e.key === "F5") e.preventDefault();
  }
});
