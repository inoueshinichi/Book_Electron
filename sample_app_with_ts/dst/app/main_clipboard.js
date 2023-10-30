"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
// const electron = require('electron');
const electron_1 = require("electron");
const path = __importStar(require("path"));
const fs_1 = require("fs");
/* レンダラープロセスに公開するAPI */
// on = handle at Main
// send = invoke at Renderer
// Main -> Renderer
electron_1.ipcMain.handle('get-clipboard-text', (event) => {
    const clipboardText = electron_1.clipboard.readText();
    return clipboardText;
});
// Main <- Renderer
electron_1.ipcMain.handle('set-clipboard-text', (event, text) => {
    electron_1.clipboard.writeText(text);
});
// Main <- Renderer
electron_1.ipcMain.on('writeFile', (event, data) => {
    const jsonStr = JSON.stringify(data, null, 4);
    (0, fs_1.writeFileSync)(path.join(electron_1.app.getPath('userData')), jsonStr, 'utf8');
});
electron_1.app.on('ready', createWindow);
function createWindow() {
    // Top-Level ウィンドウ
    let win = new electron_1.BrowserWindow({
        width: 1024,
        height: 768,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, "..", "preload.js")
        }
    });
    // console.log(`[Check __dirname] ${__dirname}`);
    const pathname = path.join(__dirname, "..", "..", "html", "clipboard_index.html");
    // console.log(`[Check pathname] ${pathname}`);
    // ローカルファイル
    win.loadFile(pathname);
    /* レンダラープロセスのためのデバッグツール設定 */
    win.webContents.openDevTools();
    // htmlをロードしてから画面表示させる
    win.on('ready-to-show', () => {
        win.show();
    });
    win.on('show', () => {
        console.log('show browser-window.');
    });
    // コールバック
    const fn = (event) => {
        console.log('[Callback] focus: ' + event.sender /*.id*/);
    };
} // function createWindow(): void
// app.whenReady().then(createWindow); // 非同期
/* イベント */
// 起動処理の完了
electron_1.app.on('will-finish-launching', () => {
    /* windowsではここに初期化処理を記述する */
    // macOSのCOCOAフレームワークにあるapplicationWillFinishLaunchingイベントに相当する
    console.log('[Event] will-finish-launching');
});
// 初期化処理終了(macOS)
// app.on('ready', () => {
//     /* macOSではこちらに初期化処理を記述する */
//     console.log('[Event] ready');
// });
// ウィンドウがフォーカスされた
electron_1.app.on('browser-window-focus', (event) => {
    console.log('[Event] browser-window-focus; Forcacing window with ' + event.sender /*.id*/);
});
// ウィンドウのフォーカスが外れた
electron_1.app.on('browser-window-blur', (event) => {
    console.log('[Event] browser-window-blur; Unforcasing widnow with ' + event.sender /*.id*/);
});
// event.sender: イベントが発生したウィンドウ
// evnet.sender.id: イベントが発生したウィンドウのID(Unique)
// BrowserWindowが生成された
electron_1.app.on('browser-window-created', (event) => {
    console.log('[Event] browser-window-created: ' + event.sender /*undefined*/);
});
// Webコンテンツが生成された
electron_1.app.on('web-contents-created', (event) => {
    console.log('[Event] web-contents-created: ' + event.sender /*undefined*/);
});
// 全ウィンドウ削除時
electron_1.app.on('window-all-closed', () => {
    console.log("[Event] window-all-closed; Electron has closed all windows.");
    if (process.platform == 'darwin') {
        electron_1.app.quit();
    }
});
// Windowsの場合, すべてのウィンドウを閉じ始める前に呼ばれる
electron_1.app.on('before-quit', () => {
    // macOSの場合アプリを落とす直前に呼ばれる.
    console.log("[Event] before-quit; Electron is going to remove all windows.");
});
// Windowsの場合, 終了する直前に呼ばれる
electron_1.app.on('will-quit', () => {
    // macOSの場合アプリを落とす直前に呼ばれる.
    console.log("[Event] will-quit; Electron is quiting...");
});
// 終了時に呼ばれる
electron_1.app.on('quit', () => {
    console.log("[Event] quit; Electron has quited (terminated).");
});
//# sourceMappingURL=main_clipboard.js.map