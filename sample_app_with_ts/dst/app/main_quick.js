"use strict";
// Electronに必要なモジュールを読み込む
const electron = require('electron');
const path = require('path');
const url = require('url');
// import Electron from "electron"
// import * as path from "path";
// import * as url from "url";
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
// Electronのライフサイクル定義
let mainWindow;
app.on('ready', createWindow);
app.on('window-all-closed', () => {
    // if (process.platform !== "darwin") {
    //     app.quit();
    // }
    app.quit();
});
// ウィンドウを作成してコンテンツを読み込む
function createWindow() {
    let mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: false
        }
    });
    console.log(`[Check __dirname] ${__dirname}`);
    const pathname = path.join(__dirname, "..", "..", "html", "quick_index.html");
    console.log(`[Check pathname] ${pathname}`);
    // mainWindow.loadURL(url.format({
    //     // 読み込むコンテンツを指定
    //     pathname: pathname,
    //     protocol: 'true',
    //     slashes: true
    // }));
    mainWindow.loadFile(pathname);
    /* レンダラープロセスのためのデバッグツール設定 */
    mainWindow.webContents.openDevTools();
    // ウィンドウが閉じるときの処理
    mainWindow.on('closed', function () {
        console.log("[Event] closed");
    });
}
