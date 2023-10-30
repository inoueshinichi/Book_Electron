"use strict";
// eslint-disable-next-line
const { contextBridge } = require('electron');
const { ipcRenderer } = require('electron');
const { clipboard } = require('electron');
// メインプロセス側のAPI(Node.js; e.g. require etc..)をレンダラープロセス側に公開する
// (セキュリティUP; nodeIntegration: false)
contextBridge.exposeInMainWorld('electron', {
    // Rendererプロセス側は, window.electronプロパティで公開したオブジェクトを参照できる.
    display: "API Electron!",
    ipcRenderer: ipcRenderer,
    getClipboardText: () => ipcRenderer.invoke('get-clipboard-text'),
    setClipboardText: (text) => ipcRenderer.invoke('set-clipboard-text', text),
    writeFile: (data) => ipcRenderer.send('writeFile', data),
});
//# sourceMappingURL=preload.js.map