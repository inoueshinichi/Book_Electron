// const { React, Component } = require('react');
// const ReactDOM = require('react-dom/client');
import React from "react";
import ReactDOM from "react-dom";

// const StrictModeApp = require('./components/StrictMoeApp');
import StrictModeApp from "./components/StrictModeApp";


// テスト
function calcAdd(a: number, b: number): number {
    return a + b;
}


// Reactコンポーネント
const App = () => {
    return <h1>Hello World! React with Typescript</h1>;
}

// DOMを書き換え
// ReactDOM.render(<App />, document.getElementById('root'));
// ReactDOM.render(<StrictModeApp />, document.getElementById('root'));


// React.StrictModeはcreateRootが必要?
const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

// https://stackoverflow.com/questions/66480176/why-there-is-there-an-error-when-using-react-strict-mode
// React.StrictModeは, ESModulesに沿って、exportが解釈される場合に有効. 
// しかし、サーバーサイドは依然としてCommonJSなので、基本フロントエンド以外は現状使わ内容が良さそう.
root.render(
    // <React.StrictMode>
        // <StrictModeApp />
        <App />
    // </React.StrictMode>
);

// Webpackはデフォルトで、CommonJSに変換する.
//　https://qiita.com/jkr_2255/items/7994a395fbcd80be4279




