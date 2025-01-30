const { app, BrowserWindow } = require("electron");
const path = require("path");

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
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
