module.exports = {
    entry: {
        bundle: "./src/main/webapp/scripts/app/app.ts"
    },
    output: {
        path: __dirname + "/src/dist/",
        filename: "[name].js",
    },
    module: {
        rules: [
            {
                test: /\.ts?$/,
                loader: 'ts-loader'
            },
            {
                test: /\.js$/,
                loader: 'source-map-loader'
            }
        ]
    },
    stats: {
        modules: true,
        reasons: true
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    devtool: 'source-map'
};
