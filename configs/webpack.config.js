var webpack = require("webpack");
const path = require('path');

module.exports = {
    mode: 'production',
    performance: {
        hints: false,
        maxEntrypointSize: 5120000,
        maxAssetSize: 5120000
    },
    entry: {
        xrapp: [
            './src/index.js',
        ],
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'xrml.js',
//        libraryTarget: "var",
//        library: "xrapp",
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.js$/,
                exclude: [
                    path.resolve(__dirname, '../src/query/'),
                    path.resolve(__dirname, '../src/global/'),
                ],
            }
        ]
    },
    optimization: {
        mangleExports: false,
        minimize: false,
    },
}
