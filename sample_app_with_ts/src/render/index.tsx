const { React, Component } = require('react');
const ReactDOM = require('react-dom');


// テスト
export function calcAdd(a: number, b: number): number {
    return a + b;
}


// Reactコンポーネント
export class App extends Component {
    render(): React.ReactNode {
        return (
            <div>
                <h1>Hello</h1>
            </div>
        );
    }
}

// DOMを書き換え
ReactDOM.render(
    <React.StrictMode >
        <App />
    </React.StrictMode>,
    document.getElementById('root'));