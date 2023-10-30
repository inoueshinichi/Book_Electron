import { jsx as _jsx } from "react/jsx-runtime";
import ReactDOM from "react-dom";
// テスト
function calcAdd(a, b) {
    return a + b;
}
// Reactコンポーネント
const App = () => {
    return _jsx("h1", { children: "Hello World! React with Typescript" });
};
// DOMを書き換え
// ReactDOM.render(<App />, document.getElementById('root'));
// ReactDOM.render(<StrictModeApp />, document.getElementById('root'));
// React.StrictModeはcreateRootが必要?
const root = ReactDOM.createRoot(document.getElementById('root'));
// https://stackoverflow.com/questions/66480176/why-there-is-there-an-error-when-using-react-strict-mode
// React.StrictModeは, ESModulesに沿って、exportが解釈される場合に有効. 
// しかし、サーバーサイドは依然としてCommonJSなので、基本フロントエンド以外は現状使わ内容が良さそう.
root.render(
// <React.StrictMode>
// <StrictModeApp />
_jsx(App, {})
// </React.StrictMode>
);
//# sourceMappingURL=quick_index.js.map