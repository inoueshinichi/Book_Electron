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

type ClipboardState = {
    text: string;
    isActive: boolean;
    zen2han: boolean;
};

class ClipboardApp extends React.Component {
    state: ClipboardState;

    constructor(props: Readonly<{}>) {
        super(props);
        this.state = {
            text: "ＡＢＣこんにちはHelloWorldＸＹＺ",
            isFirst: false,
            isActive: false,
            zen2han: true,
        };

        // クリップボード監視用タイマーをセット
        setInterval((e: any): void => this.tick(), 1000);
    }

    // 全角英数を半角英数に変換する
    convToHalfWidth(str: string): string {
        const s2: string = str.replace(/[Ａ-Ｚａ-ｚ０-９]/g, (s: string) => {
            return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
        });
        return s2;
    }

    async tick(): void {
        if (!this.state.isActive) {
            return;
        }

        let text: string;
        let flag: boolean = this.state.isFirst;
        if (!flag) {
            text = this.state.text;
            flag = true;
        } else {
            text = await window.electron.getClipboardText();
        }
        // text = this.state.text;
        
        let clip: string;
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

    changeState(e: React.ChangeEvent<HTMLInputElement>): void {
        const name: string = e.target.name;
        // 再描画
        this.setState({
            [name]: !this.state[name]
        });
    }

    // クリップボードの入力再描画用
    doChange(e: React.ChangeEvent<HTMLInputElement>): void {
        const clipboardText: string = e.target.value;
        // 再描画
        this.setState({
            text: clipboardText
        });
    }

    render(): React.ReactNode {
        const taStyle: {} ={
            width: '100%',
            height: '300px',
            backgroundColor: '#F4F4F4'
        };

        return (
            <div className='window'>
                <div className='window-content'>
                    <div className='pane-group'>
                        <div className='pane-sm sidebar'>
                            <div>
                                <ul className='list-group'>
                                    <li className='list-group-item'>
                                        <label>
                                            <input type='checkbox'
                                                checked={this.state.isActive}
                                                name='isActive'
                                                onChange={e => this.changeState(e)}
                                            />
                                            監視を有効
                                        </label>
                                    </li>
                                    <li className='list-group-item'>
                                        <label>
                                            <input type='checkbox'
                                                checked={this.state.zen2han}
                                                name='zen2han'
                                                onChange={e => this.changeState(e)}
                                            />
                                            全角英数を半角英数にする
                                        </label>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className='pane'>
                            <div className='padded-more'>
                                クリップボード:<br />
                                <textarea style={taStyle} 
                                    value={this.state.text}
                                    onChange={e => this.doChange(e)} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

// React < 17.x
ReactDOM.render(<ClipboardApp />, document.getElementById('root'));

// Recomend : React > 18.x
// const root = ReactDOM.createRoot(
//     document.getElementById('root') as HTMLElement
// );
// root.render(<ClipboardApp />);