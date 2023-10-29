// Reactの変換設定
const path = require('path');
const webpack = require('webpack');

// 変換対象から除外するモジュール(Electron)
const externalPlugins = new webpack.ExternalsPlugin('commonjs', [
    'app',
    'auto-updater',
    'browser-window',
    'content-traicing',
    'dialog',
    'electron',
    'gloal-shortcut',
    'ipc',
    'menu',
    'menu-item',
    'power-monitor',
    'protocol',
    'tray',
    'remote',
    'web-frame',
    'clipboard',
    'crash_reporter',
    'screen',
    'shell'
]);

module.exports = {
    // モード値を production に設定すると最適化された状態で、
    // development に設定するとソースマップ有効でJSファイルが出力される
    mode: 'development', // "production" | "development" | "none"

    devtool: "source-map", // *.js.mapが出力される

    entry: {
        bundle: path.join(__dirname, 'dst', 'render', 'index.js')
    },

    output: {
        path: path.join(__dirname, 'html', "static", "js"),
        filename: '[name].js'
    },
    
    module: {
        rules: [
            // JSの場合
            {
                test: /\.js[x]?$/, 
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: [
                        '@babel/preset-env',
                        '@babel/preset-react',
                    ]
                }
            },
            // TSの場合
            {
                test: /\.ts[x]?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: [
                        '@babel/prest-env',
                        '@babel/preset-react',
                        '@babel/preset-typescript'
                    ]
                }
            },
            // CSSの場合
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader'
                    }
                ]
            }
        ]
    },

    target: 'node',

    resolve: {
        extensions: [".js", ".jsx"]
    },

    plugins: [
        externalPlugins
    ]
};