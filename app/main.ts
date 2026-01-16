import IpcApp from "@/ipc";
import IpcFile from "@/ipc/IpcFile";
import IpcTheme from "@/ipc/IpcTheme";
import { BrowserWindow, app } from "electron";
import started from "electron-squirrel-startup";
import path from "node:path";

if (started) {
  app.quit();
}

const appName = import.meta.env.VITE_APP_NAME;
const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";

function createWindow() {
  const mainWindow = new BrowserWindow({
    title: appName,
    width: 1280,
    height: 720,
    minWidth: 1280,
    minHeight: 720,
    frame: false,
    fullscreenable: false,
    webPreferences: {
      nodeIntegration: false,
      sandbox: true,
      contextIsolation: true,
      devTools: !app.isPackaged,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
    mainWindow.webContents.openDevTools({ mode: "detach" });
  } else {
    mainWindow.loadFile(
      path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`)
    );
  }
  IpcTheme();
  IpcApp(mainWindow);
  IpcFile(mainWindow);
  // Adiciona Content Security Policy segura via header, incluindo VITE_API_URL em connect-src
  let connectSrc = "'self' ws:";
  if (apiUrl) {
    try {
      const url = new URL(apiUrl);
      connectSrc += ` ${url.origin}`;
    } catch {
      // Se não for uma URL válida, ignora
    }
  }
  mainWindow.webContents.session.webRequest.onHeadersReceived(
    (details, callback) => {
      callback({
        responseHeaders: {
          ...details.responseHeaders,
          "Content-Security-Policy": [
            `default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src ${connectSrc};`,
          ],
        },
      });
    }
  );
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
