var webpack = require("webpack");
var path = require("path");
var AssetsPlugin = require("assets-webpack-plugin");
//var merge = require("webpack-merge");
//var dllreact = require("./dll.react-dev");
var constant = require("./constant");

var UglifyJsPlugin = require("webpack/lib/optimize/UglifyJsPlugin");

module.exports = {
    entry: {
        "reactRel_min": constant.reactVendor
    },
    output: {
        path: path.resolve(__dirname, constant.releaseDir + "lib"),
        filename: "[name]." + constant.timeStamp + ".js",
        library: "[name]"
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.resolve(__dirname, constant.libConfig, "manifest-react_min.json"),
            name: "[name]",
            context: __dirname
        }),
        new AssetsPlugin({
            path: __dirname,
            filename: constant.libConfig + "react_min-config.json"
        }),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        }),
        new UglifyJsPlugin()
    ]
};