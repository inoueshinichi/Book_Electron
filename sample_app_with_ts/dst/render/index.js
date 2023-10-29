"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = exports.calcAdd = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const { React, Component } = require('react');
const ReactDOM = require('react-dom');
// テスト
function calcAdd(a, b) {
    return a + b;
}
exports.calcAdd = calcAdd;
// Reactコンポーネント
class App extends Component {
    render() {
        return ((0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)("h1", { children: "Hello" }) }));
    }
}
exports.App = App;
// DOMを書き換え
ReactDOM.render((0, jsx_runtime_1.jsx)(React.StrictMode, { children: (0, jsx_runtime_1.jsx)(App, {}) }), document.getElementById('root'));
