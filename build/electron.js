const path = require("path");
const { app, BrowserWindow } = require("electron");
const isDev = require("electron-is-dev");

function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false,
    },
  });
  win.setMenu(null);
  win.maximize();
  // and load the index.html of the app.
  // win.loadFile("index.html");
  win.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
  // Open the DevTools.
  win.webContents.openDevTools({ mode: "detach" });
  /* if (isDev) {
  } */
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  console.log("ready!!!!");
  createWindow();
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bars to stay active until the user quits
// explicitly with Cmd + Q.
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
