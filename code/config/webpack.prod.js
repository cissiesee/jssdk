var webpack = require("webpack");
var path = require("path");
var merge = require("webpack-merge");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var DllReferencePlugin = require("webpack/lib/DllReferencePlugin");
var DefinePlugin = require("webpack/lib/DefinePlugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var common = require("./webpack.common");
var UglifyJsPlugin = require("webpack/lib/optimize/UglifyJsPlugin");

var constant = require("./constant");

var reactConfig = require("./lib/react_min-config.json");
var libConfig = require("./lib/lib_min-config.json");

module.exports = merge(common, {
    output: {
        path: path.resolve(__dirname, constant.releaseDir),
        publicPath: constant.publicPath,
        filename: "[name]." + constant.timeStamp + ".min.js"
    },
    plugins: [
        new ExtractTextPlugin("[name]." + constant.timeStamp + ".min.css"),
        new DllReferencePlugin({
            context: __dirname,
            manifest: require(path.resolve(__dirname, constant.libConfig, "manifest-react_min.json"))
        }),
        new DllReferencePlugin({
            context: __dirname,
            manifest: require(path.resolve(__dirname, constant.libConfig, "manifest-lib_min.json"))
        }),
        new DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        }),
        // new UglifyJsPlugin(),
        new HtmlWebpackPlugin({
            filename: path.resolve(__dirname, constant.releaseDir + "index.html"),
            template: path.resolve(__dirname, constant.srcDir + "tpl/index.html"),
            _reactRel: reactConfig.reactRel_min.js,
            _lib: libConfig.lib_min.js,
            xhtml: true
        })
    ]
});