// const message: string = "Hello, world!";
// console.log(message);

const { app, BrowserWindow } = require('electron');

function createWindow(): void {
    let win = new BrowserWindow({
        width: 400,
        height: 200,
        webPreferences: {
            nodeIntegration: true
        }
    });
}

app.whenReady().then(createWindow);