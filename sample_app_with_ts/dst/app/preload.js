"use strict";
// eslint-disable-next-line
const { clipboard, contextBridge, ipcRenderer } = require('electron');
// セキュリティ的にアウトだけどとりあえず
window.clipboard = clibboard;
// メインプロセスとレンダープロセスを疎結合にして、APIを通してプロセス間通信する方法.
contextBridge.exposeInMainWorld('api', {
    writeFile: (data) => {
        ipcRenderer.send('writeFile', data);
    },
});
//# sourceMappingURL=preload.js.map