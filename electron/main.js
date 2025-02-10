const { app, BrowserWindow } = require("electron");
const path = require("path");
const AutoLaunch = require("auto-launch");

const autoLauncher = new AutoLaunch({
  name: "ElectronApp",
});

function createWindow() {
  const win = new BrowserWindow({
    width: 375,
    height: 767,
    webPreferences: {
      nodeIntegration: true,
      webviewTag: true,
    },
  });

  // Vite 개발 서버 사용
  win.loadURL("https://www.aplayz.co.kr");

  // 개발자 도구 열기
  //win.webContents.openDevTools();
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();

    autoLauncher
      .isEnabled()
      .then((isEnabled) => {
        if (!isEnabled) {
          return autoLauncher.enable();
        }
      })
      .catch((err) => {
        console.error("자동 시작 설정 실패:", err);
      });
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
