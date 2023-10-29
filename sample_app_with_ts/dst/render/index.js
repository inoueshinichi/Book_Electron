"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const { React, Component } = require('react');
const ReactDOM = require('react-dom/client');
// import React from "react";
// import ReactDOM from "react-dom";
// const StrictModeApp = require('./StrictMoeApp');
// import StrictModeApp from "./StrictMoeApp";
// テスト
function calcAdd(a, b) {
    return a + b;
}
// Reactコンポーネント
const App = () => {
    return (0, jsx_runtime_1.jsx)("h1", { children: "Hello World! React with Typescript" });
};
// DOMを書き換え
// ReactDOM.render(<App />, document.getElementById('app'));
// ReactDOM.render(<StrictModeApp />, document.getElementById('root'));
// React.StrictModeはcreateRootが必要?
const root = ReactDOM.createRoot(document.getElementById('root'));
// https://stackoverflow.com/questions/66480176/why-there-is-there-an-error-when-using-react-strict-mode
// React.StrictModeは, ESModulesに沿って、exportが解釈される場合に有効. でもサーバーサイドは依然としてCommonJSなので、
// 基本フロントエンド以外は現状使わ内容が良さそう.
root.render(
// <React.StrictMode>
// <StrictModeApp />
(0, jsx_runtime_1.jsx)(App, {})
// </React.StrictMode>
);
