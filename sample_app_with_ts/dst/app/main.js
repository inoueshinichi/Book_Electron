"use strict";
// const message: string = "Hello, world!";
// console.log(message);
const { app, BrowserWindow } = require('electron');
// import { app, BrowserWindow } from 'electron';
const html = '<html><head>'
    + '<titile>HTML STRING</title>'
    + '</head><body>'
    + '<h1>HTML STRING</h1>'
    + '<p>This is string content.</p>'
    + '</body></html>';
function createWindow() {
    // Top-Level ウィンドウ
    let win = new BrowserWindow({
        width: 1024,
        height: 768,
        // show: false, // false
        backgroundColor: '#3F4551',
        webPreferences: {
            nodeIntegration: false
        }
    });
    win.loadFile('../../html/index.html');
    /* レンダラープロセスのためのデバッグツール設定 */
    // win.webContents.openDevTools();
    // Web経由でデータを取得
    // win.loadURL('https://www.tuyano.com');
    // win.loadURL('data:text/html;charset=utf-8,' + html);
    // モードレスウィンド
    // let child = new BrowserWindow({
    //     width: 350,
    //     height: 200,
    //     parent: win,
    //     webPreferences: {
    //         nodeIntegration: true
    //     }
    // });
    // child.loadURL('data:text/html;charset=utf-8,' + html);
    // // モーダルウィンドウ
    // let child = new BrowserWindow({
    //     width: 500,
    //     height: 400,
    //     /* モーダル設定 */
    //     parent: win,
    //     frame: false,
    //     modal: true,
    // });
    // child.loadFile('../html/sub.html')
    // 透過ウィンドウ
    let child_transparent = new BrowserWindow({
        width: 350,
        height: 250,
        parent: win,
        frame: false,
        /* transparent */
        // transparentにする場合 frame: false にする. この設定を怠ると, windowsで透過ウィンドウを実現できない.
        transparent: true
    });
    child_transparent.loadFile("../../html/sub.html");
    /* 0: 透明, 1: 不透過 */
    let child_opacity = new BrowserWindow({
        width: 350,
        height: 250,
        parent: win,
        /* opacity */
        opacity: 0.7
    });
    child_opacity.loadFile("../../html/sub.html");
    /* BrowserWindowを対象にした個別イベント */
    // ウィンドウを表示する準備が完了したとき
    child_opacity.on('ready-to-show', (event) => {
        console.log('[Event] ready-to-show; BrowserWindow(child_opacity) was ready');
    });
    // ウィンドウが表示される時
    child_opacity.on('show', (event) => {
        console.log('[Event] show; BrowserWindow(child_opacity) is showing...');
    });
    // ウィンドウが非表示になる時
    child_opacity.on('hide', (event) => {
        console.log('[Event] hide; BrowserWindow(child_opacity) is hiding...');
    });
    // ウィンドウが閉じる直前
    child_opacity.on('close', (event) => {
        console.log('[Event] close; BrowserWindow(child_opacity) is closing...');
    });
    // ウィンドウが閉じた直後
    child_opacity.on('closed', (event) => {
        console.log('[Event] closed; BrowserWindow(child_opacity) has closed just now');
    });
} // function createWindow(): void
app.whenReady().then(createWindow); // 非同期
/* イベント */
// 起動処理の完了
app.on('will-finish-launching', () => {
    /* windowsではここに初期化処理を記述する */
    // macOSのCOCOAフレームワークにあるapplicationWillFinishLaunchingイベントに相当する
    console.log('[Event] will-finish-launching');
});
// 初期化処理終了(macOS)
app.on('ready', () => {
    /* macOSではこちらに初期化処理を記述する */
    console.log('[Event] ready');
});
// ウィンドウがフォーカスされた
app.on('browser-window-focus', (event) => {
    console.log('[Event] browser-window-focus; Forcacing window with ' + event.sender /*.id*/);
});
// ウィンドウのフォーカスが外れた
app.on('browser-window-blur', (event) => {
    console.log('[Event] browser-window-blur; Unforcasing widnow with ' + event.sender /*.id*/);
});
// event.sender: イベントが発生したウィンドウ
// evnet.sender.id: イベントが発生したウィンドウのID(Unique)
// BrowserWindowが生成された
app.on('browser-window-created', (event) => {
    console.log('[Event] browser-window-created: ' + event.sender /*undefined*/);
});
// Webコンテンツが生成された
app.on('web-contents-created', (event) => {
    console.log('[Event] web-contents-created: ' + event.sender /*undefined*/);
});
// 全ウィンドウ削除時
app.on('window-all-closed', () => {
    console.log("[Event] window-all-closed; Electron has closed all windows.");
    if (process.platform !== 'darwin') {
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
