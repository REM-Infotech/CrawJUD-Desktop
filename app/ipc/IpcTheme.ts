/* eslint-disable @typescript-eslint/no-unused-vars */
import { ipcMain, type IpcMainInvokeEvent, nativeTheme } from "electron";
import Store from "electron-store";

type ThemeElectron = "system" | "light" | "dark";
const store = new Store();

class ThemeService {
  static async toggleDarkMode(_: IpcMainInvokeEvent) {
    store.set("themeSource", "dark");
    nativeTheme.themeSource = "dark";
  }

  static async toggleToSystem(_: IpcMainInvokeEvent) {
    store.set("themeSource", "system");
    nativeTheme.themeSource = "system";
  }

  static async toggleLightMode(_: IpcMainInvokeEvent) {
    store.set("themeSource", "light");
    nativeTheme.themeSource = "light";
  }
  static async currentPreset(_: IpcMainInvokeEvent) {
    const source = nativeTheme.themeSource;
    const storedTheme = store.get("themeSource", source) as ThemeElectron;
    if (storedTheme !== nativeTheme.themeSource) {
      nativeTheme.themeSource = storedTheme;
    }

    return nativeTheme.themeSource;
  }
}

export default function () {
  ipcMain.handle("dark-mode:toggle-dark", ThemeService.toggleDarkMode);
  ipcMain.handle("dark-mode:toggle-system", ThemeService.toggleToSystem);
  ipcMain.handle("dark-mode:toggle-light", ThemeService.toggleLightMode);
  ipcMain.handle("dark-mode:current-preset", ThemeService.currentPreset);
}
