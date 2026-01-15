/* eslint-disable @typescript-eslint/no-explicit-any */
// Tipos auxiliares
type FileUpload = {
  name: string;
  buffer: Uint8Array;
  type: string;
};

class FileIpc {
  name: string;
  base64: string;
}

interface FileInStorage {
  name: string;
  seed: string;
  type: string;
}

interface FileUploadStorage {
  name: string;
  pathFile: string;
}

interface WindowApi {
  fileDialog: () => Promise<FileInStorage[]>;
  loadPreferences: () => Promise<unknown>;
  closeWindow: () => void;
  maximizeWindow: () => void;
  minimizeWindow: () => void;
}

interface ThemeApi {
  toggleDarkMode: () => Promise<void>;
  toggleToSystem: () => Promise<void>;
  toggleLightMode: () => Promise<void>;
  currentPreset: () => Promise<Theme>;
}

interface authService {
  autenticarUsuario: (data: Record<string, any>) => Promise<AuthReturn>;
}

interface cookieService {
  getCookies: () => Promise<cookieApp[]>;
}

interface safeStorageApi {
  load: (key: string) => Promise<string>;
  save: (opt: optSave) => Promise<string>;
}

interface fileService {
  downloadExecucao: (kw: PayloadDownloadExecucao) => Promise<string | void>;
  toFileUrl: (pathFile: string) => Promise<string>;
}
