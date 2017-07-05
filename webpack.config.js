const webpack = require("webpack");

module.exports = {
    entry: {
        bundle: "./src/main/webapp/scripts/app/app.js"
    },
    output: {
        path: __dirname + "/src/dist/",
        filename: "[name].js",
    },
    module: {
        rules: [
            {
                enforce: "pre",
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: "eslint-loader",
                options: {
                    configFile: "./.eslintrc.json"
                }
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.jsx?$/,
                loader: 'source-map-loader'
            },
            {
                test: /\.css$/,
                use: [
                    { loader: "style-loader" },
                    { loader: "css-loader" }
                ],
            }
        ]
    },
    stats: {
        modules: true,
        reasons: true
    },
    resolve: {
        extensions: ['.jsx', '.js']
    },
    devtool: 'source-map',
    devServer: {
        port: 9000,
        compress: true,
        hot: true
    }
};
