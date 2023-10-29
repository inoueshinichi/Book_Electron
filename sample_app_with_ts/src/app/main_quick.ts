// Electronに必要なモジュールを読み込む
const electron = require('electron');
const path = require('path');
const url = require('url');

const app: any = electron.app;
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
        windth: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: false
        }
    });

    
    console.log(`[Check __dirname] ${__dirname}`);
    const pathname: string = path.join(__dirname, "..", "..", "html", "quick_index.html");
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
    mainWindow.on('closed', function() {
        mainWindow = null;
    });
}