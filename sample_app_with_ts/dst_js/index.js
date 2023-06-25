"use strict";
// const message: string = "Hello, world!";
// console.log(message);
const { app, BrowserWindow } = require('electron');
function createWindow() {
    let win = new BrowserWindow({
        width: 400,
        height: 200,
        webPreferences: {
            nodeIntegration: true
        }
    });
    win.loadFile('../html/index.html');
}
app.whenReady().then(createWindow);
