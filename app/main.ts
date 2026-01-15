import IpcApp from "@/ipc";
import IpcTheme from "@/ipc/IpcTheme";
import { BrowserWindow, app } from "electron";
import started from "electron-squirrel-startup";
import path from "node:path";

if (started) {
  app.quit();
}

const appName = import.meta.env.VITE_APP_NAME;
function createWindow() {
  const mainWindow = new BrowserWindow({
    title: appName,
    width: 1280,
    height: 720,
    minWidth: 1280,
    minHeight: 720,
    resizable: true,
    maximizable: true,
    frame: false,
    transparent: false,
    fullscreenable: false,
    webPreferences: {
      nodeIntegration: false,
      devTools: !app.isPackaged,
      preload: path.join(__dirname, "preload.js"),
      partition: `persist:${appName}`,
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
  IpcApp(mainWindow);
  IpcTheme();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
