import { app, BrowserWindow, ipcMain, nativeTheme } from 'electron';
import path from 'path';
import fs from 'fs';
import url from 'url';
import windowStateKeeper from 'electron-window-state'

let window: BrowserWindow | null = null;
const args = process.argv.slice(1);
const serve = args.some(val => val === '--serve');

function createWindow(): BrowserWindow {
  const savedWindowState = windowStateKeeper({
    defaultWidth: 960,
    defaultHeight: 660,
    maximize: false,
  });

  const windowOptions: Electron.BrowserWindowConstructorOptions = {
    x: savedWindowState.x,
    y: savedWindowState.y,
    width: savedWindowState.width,
    height: savedWindowState.height,
    minWidth: 500,
    minHeight: 400,
    show: false,
    backgroundColor: '#303030',
    webPreferences: {
      disableBlinkFeatures: 'Auxclick',
      nodeIntegration: true,
      spellcheck: true,
      contextIsolation: false,
      allowRunningInsecureContent: (serve) ? true : false
    },
    acceptFirstMouse: true,
    icon: path.join(__dirname, '../assets/icons/favicon.png')
  };

  if (process.platform === 'darwin') {
    windowOptions.titleBarStyle = 'hidden'
  } 
  else if (process.platform === 'win32') {
    windowOptions.frame = false
  } 

  // Create the browser window.
  window = new BrowserWindow(windowOptions);
  savedWindowState.manage(window);

  if (serve) {
    require('electron-reload')(__dirname, {
      electron: require(path.join(__dirname, '/../node_modules/electron'))
    });
    window.loadURL('http://localhost:4200');
  } else {
    // Path when running electron executable
    let pathIndex = './index.html';

    if (fs.existsSync(path.join(__dirname, '../dist/index.html'))) {
      // Path when running electron in local folder
      pathIndex = '../dist/index.html';
    }

    window.loadURL(url.format({
      pathname: path.join(__dirname, pathIndex),
      protocol: 'file:',
      slashes: true
    }));
  }

  // Emitted when the window is closed.
  window.on('closed', () => {
    // Dereference the window object, usually you would store window
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    window = null;
  });

  // Only show once fully loaded
  window.webContents.on('did-finish-load', () => {
    window?.show();
  });

  // Window Controls
  ipcMain.on('minimize', () => {
    window?.minimize();
  });
  ipcMain.on('maximize', () => {
    if (window?.isMaximized()) {
      window?.restore();
    }
    else {
      window?.maximize();
    }
  });
  ipcMain.on('close', () => {
    window?.close();
  });

  return window;
}

try {
  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on('ready', () => createWindow());

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (window === null) {
      createWindow();
    }
  });

} catch (e) {
  // Catch Error
  // throw e;
}