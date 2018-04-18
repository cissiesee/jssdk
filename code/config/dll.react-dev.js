var webpack = require("webpack");
var AssetsPlugin = require("assets-webpack-plugin");
var path = require("path");
var constant = require("./constant");

module.exports = {
    entry: {
        "reactRel": constant.reactVendor
    },
    output: {
        path: path.resolve(__dirname, constant.debugDir + "lib"),
        filename: "[name]." + constant.timeStamp + ".js",
        library: "[name]"
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.resolve(__dirname, constant.libConfig, "manifest-react.json"),
            name: "[name]",
            context: __dirname
        }),
        new AssetsPlugin({
            path: __dirname,
            filename: constant.libConfig + "react-config.json"
        })
    ],
};