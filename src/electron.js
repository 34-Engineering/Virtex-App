"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var path = require("path");
var url = require("url");
var win = null;
var args = process.argv.slice(1), serve = args.some(function (val) { return val === '--serve'; });
function createWindow() {
    win = new electron_1.BrowserWindow({
        width: 1200,
        height: 900,
        frame: false,
        icon: __dirname + '/assets/icons/icon.png',
        webPreferences: {
            nodeIntegration: true,
            allowRunningInsecureContent: (serve) ? true : false,
            contextIsolation: false,
            enableRemoteModule: true
        }
    });
    //Serving
    if (serve) {
        require('electron-reload')(__dirname, {
            electron: require(__dirname + "/../node_modules/electron")
        });
        win.loadURL('http://localhost:4200');
    }
    //App
    else {
        win.loadURL(url.format({
            pathname: path.join(__dirname, '/../dist/index.html'),
            protocol: 'file:',
            slashes: true
        }));
    }
    win.on('closed', function () {
        win = null;
    });
    return win;
}
try {
    electron_1.app.on('ready', function () { return setTimeout(createWindow, 400); });
    electron_1.app.on('window-all-closed', function () {
        if (process.platform !== 'darwin') {
            electron_1.app.quit();
        }
    });
    electron_1.app.on('activate', function () {
        if (win === null) {
            createWindow();
        }
    });
}
catch (e) { }
//# sourceMappingURL=electron.js.map