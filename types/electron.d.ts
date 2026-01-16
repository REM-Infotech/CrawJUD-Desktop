/* eslint-disable @typescript-eslint/no-explicit-any */
interface WindowApi {
  fileDialog: () => Promise<FileInStorage[]>;
  loadPreferences: () => Promise<unknown>;
  closeWindow: () => Promise<void>;
  maximizeWindow: () => Promise<void>;
  minimizeWindow: () => Promise<void>;
}

interface ThemeApi {
  toggleDarkMode: () => Promise<void>;
  toggleToSystem: () => Promise<void>;
  toggleLightMode: () => Promise<void>;
  currentPreset: () => Promise<Theme>;
}

interface fileDialogApi {
  openFileXlsx: () => Promise<FileObject | undefined>;
  openFiles: () => Promise<FileObject[] | undefined>;
}
