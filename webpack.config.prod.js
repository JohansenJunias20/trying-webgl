const path = require('path');

module.exports = {
    entry: path.join(__dirname,"/src/", '/index.ts'),
    mode: "production",
    devtool: "inline-source-map",
    output: {
        filename: 'index.js',
        path: __dirname+"/public/"
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
            },
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    },
};