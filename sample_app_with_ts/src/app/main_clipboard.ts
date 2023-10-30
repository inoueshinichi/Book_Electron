// const electron = require('electron');
import { app, BrowserWindow, ipcMain, clipboard } from 'electron';
import * as path from 'path';
import { writeFileSync } from 'fs';

/* レンダラープロセスに公開するAPI */
// on = handle at Main
// send = invoke at Renderer

// Main -> Renderer
ipcMain.handle('get-clipboard-text', (event) => {
    const clipboardText = clipboard.readText();
    return clipboardText;
});

// Main <- Renderer
ipcMain.handle('set-clipboard-text', (event, text) => {
    clipboard.writeText(text);
});

// Main <- Renderer
ipcMain.on('writeFile', (event, data) => {
    const jsonStr = JSON.stringify(data, null, 4);
    writeFileSync(path.join(app.getPath('userData')), jsonStr, 'utf8');
});


app.on('ready', createWindow);

function createWindow(): void {

    // Top-Level ウィンドウ
    let win = new BrowserWindow({
        width: 1024,
        height: 768,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, "..", "preload.js")
        }
    });

    // console.log(`[Check __dirname] ${__dirname}`);
    const pathname: string = path.join(__dirname, "..", "..", "html", "clipboard_index.html");
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
    const fn = (event: any) => {
        console.log('[Callback] focus: ' + event.sender/*.id*/);
    }

    
} // function createWindow(): void

// app.whenReady().then(createWindow); // 非同期


/* イベント */

// 起動処理の完了
app.on('will-finish-launching', () => {
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
app.on('browser-window-focus', (event: any) => {
    console.log('[Event] browser-window-focus; Forcacing window with ' + event.sender/*.id*/);
});

// ウィンドウのフォーカスが外れた
app.on('browser-window-blur', (event: any) => {
    console.log('[Event] browser-window-blur; Unforcasing widnow with ' + event.sender/*.id*/);
});

// event.sender: イベントが発生したウィンドウ
// evnet.sender.id: イベントが発生したウィンドウのID(Unique)

// BrowserWindowが生成された
app.on('browser-window-created', (event: any) => {
    console.log('[Event] browser-window-created: ' + event.sender/*undefined*/);
});

// Webコンテンツが生成された
app.on('web-contents-created', (event: any) => {
    console.log('[Event] web-contents-created: ' + event.sender/*undefined*/);
});

// 全ウィンドウ削除時
app.on('window-all-closed', () => {
    console.log("[Event] window-all-closed; Electron has closed all windows.");
    if (process.platform == 'darwin') {
        app.quit();
    }
});

// Windowsの場合, すべてのウィンドウを閉じ始める前に呼ばれる
app.on('before-quit', () => {
    // macOSの場合アプリを落とす直前に呼ばれる.
    console.log("[Event] before-quit; Electron is going to remove all windows.");
});

// Windowsの場合, 終了する直前に呼ばれる
app.on('will-quit', () => {
    // macOSの場合アプリを落とす直前に呼ばれる.
    console.log("[Event] will-quit; Electron is quiting...");
});

// 終了時に呼ばれる
app.on('quit', () => {
    console.log("[Event] quit; Electron has quited (terminated).");
});
