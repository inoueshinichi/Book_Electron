import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import ReactDOM from 'react-dom';
// レンダラープロセスのコンテキストにあるスクリプトは, CommonJS(Node.js)のrequireを使えない.
// TSコンパイルで内部的にCommpnJSのrequireが呼び出されるので注意. 
// 基本、レンダラープロセスのコンテキスト(Webフロントエンド)ではCommonJSの文脈を使わない.
// const electron = require('electron');
// const clipboard = electron.clipboard;
// import { clipboard } from "electron";
// Eelectronでは, preload.js内にcontextBridge.exposeInMainWorldメソッドで,
// メインプロセス側のメソッドをブラウザのwindow.*を通して使用する。
// https://chiilabo.com/2021-12/electron-require-error-process-script-context/
console.log('[Check window.electron]');
console.log(window.electron);
console.log('[End]');
class ClipboardApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "ＡＢＣこんにちはHelloWorldＸＹＺ",
            isFirst: false,
            isActive: false,
            zen2han: true,
        };
        // クリップボード監視用タイマーをセット
        setInterval((e) => this.tick(), 1000);
    }
    // 全角英数を半角英数に変換する
    convToHalfWidth(str) {
        const s2 = str.replace(/[Ａ-Ｚａ-ｚ０-９]/g, (s) => {
            return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
        });
        return s2;
    }
    async tick() {
        if (!this.state.isActive) {
            return;
        }
        let text;
        let flag = this.state.isFirst;
        if (!flag) {
            text = this.state.text;
            flag = true;
        }
        else {
            text = await window.electron.getClipboardText();
        }
        // text = this.state.text;
        let clip;
        if (this.state.zen2han) {
            clip = this.convToHalfWidth(text);
        }
        if (clip !== text) {
            await window.electron.setClipboardText(clip);
        }
        // 再描画
        this.setState({
            text: clip,
            isFirst: flag
        });
    }
    changeState(e) {
        const name = e.target.name;
        // 再描画
        this.setState({
            [name]: !this.state[name]
        });
    }
    // クリップボードの入力再描画用
    doChange(e) {
        const clipboardText = e.target.value;
        // 再描画
        this.setState({
            text: clipboardText
        });
    }
    render() {
        const taStyle = {
            width: '100%',
            height: '300px',
            backgroundColor: '#F4F4F4'
        };
        return (_jsx("div", { className: 'window', children: _jsx("div", { className: 'window-content', children: _jsxs("div", { className: 'pane-group', children: [_jsx("div", { className: 'pane-sm sidebar', children: _jsx("div", { children: _jsxs("ul", { className: 'list-group', children: [_jsx("li", { className: 'list-group-item', children: _jsxs("label", { children: [_jsx("input", { type: 'checkbox', checked: this.state.isActive, name: 'isActive', onChange: e => this.changeState(e) }), "\u76E3\u8996\u3092\u6709\u52B9"] }) }), _jsx("li", { className: 'list-group-item', children: _jsxs("label", { children: [_jsx("input", { type: 'checkbox', checked: this.state.zen2han, name: 'zen2han', onChange: e => this.changeState(e) }), "\u5168\u89D2\u82F1\u6570\u3092\u534A\u89D2\u82F1\u6570\u306B\u3059\u308B"] }) })] }) }) }), _jsx("div", { className: 'pane', children: _jsxs("div", { className: 'padded-more', children: ["\u30AF\u30EA\u30C3\u30D7\u30DC\u30FC\u30C9:", _jsx("br", {}), _jsx("textarea", { style: taStyle, value: this.state.text, onChange: e => this.doChange(e) })] }) })] }) }) }));
    }
}
// React < 17.x
ReactDOM.render(_jsx(ClipboardApp, {}), document.getElementById('root'));
//# sourceMappingURL=clipboard_index.js.map