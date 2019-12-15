module.exports = {
    entry: "./app/components/Home.js",
    output: {
        filename: "public/bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loaders: ["babel-loader"],
            }
        ],
    },

};