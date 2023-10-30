"use strict";
const { app, BrowserWindow } = require('electron');
function createWindow() {
    // Top-Level ウィンドウ
    let win = new BrowserWindow({
        width: 1024,
        height: 768,
        show: false,
        webPreferences: {
            nodeIntegration: false
        }
    });
    // Web経由でデータを取得
    win.loadURL('https://www.tuyano.com');
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
    let siblign_win = new BrowserWindow({
        width: 400,
        height: 200,
        backgroundColor: '#3F4551',
        // parent: win,
    });
    siblign_win.loadFile('../../html/sub.html');
    siblign_win.on('focus', fn);
    const siblign_win2 = new BrowserWindow({
        width: 400,
        height: 400,
        backgroundColor: '#3F4551',
    });
    siblign_win2.flag = true;
    siblign_win2.on('focus', (event) => {
        event.sender /*.flag*/ = !event.sender /*.flag*/;
        console.log('[Callback] flag: ' + event.sender /*.flag*/);
    });
    siblign_win2.on('will-move', (event) => {
        if (event.sender.flag /*true*/) {
            event.preventDefault();
        }
    });
    siblign_win2.on('move', (event) => {
        console.log(event.sender.getPosition());
    });
    siblign_win2.on('will-resize', (event) => {
        if (!event.sender.flag /*false*/) {
            event.preventDefault();
        }
    });
    siblign_win2.on('resize', (event) => {
        console.log(event.sender.getSize());
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
//# sourceMappingURL=main2.js.map