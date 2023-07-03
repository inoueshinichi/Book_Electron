// const message: string = "Hello, world!";
// console.log(message);

const { app, BrowserWindow } = require('electron');

// const html = '<html><head>'
//     + '<titile>HTML STRING</title>'
//     + '</head><body>'
//     + '<h1>HTML STRING</h1>'
//     + '<p>This is string content.</p>'
//     + '</body></html>';

function createWindow(): void {
    let win = new BrowserWindow({
        width: 1024,
        height: 768,
        backgroundColor: '#660066',
        webPreferences: {
            nodeIntegration: true
        }
    });
    win.loadFile('../html/index.html');
    // win.loadURL('https://www.tuyano.com');
    // win.loadURL('data:text/html;charset=utf-8,' + html);

    // let child = new BrowserWindow({
    //     width: 350,
    //     height: 200,
    //     parent: win,
    //     webPreferences: {
    //         nodeIntegration: true
    //     }
    // });

    // child.loadURL('data:text/html;charset=utf-8,' + html);

    let child = new BrowserWindow({
        width: 500,
        height: 400,
        parent: win,
        frame: false,
        modal: true,
    });
    child.loadFile('../html/sub.html')
    
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform == 'darwin') {
        app.quit();
    }
})