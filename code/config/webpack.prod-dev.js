var path = require("path");
var merge = require("webpack-merge");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var DllReferencePlugin = require("webpack/lib/DllReferencePlugin");
var DefinePlugin = require("webpack/lib/DefinePlugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var common = require("./webpack.common");

var reactConfig = require("./react-config");
var libConfig = require("./lib-config");

var constant = require("./constant");
var srcDir = constant.srcDir;
var releaseDir = constant.releaseDir;
var publicPath = constant.publicPath;
var libPath = constant.libPath;
var tplDir = constant.tplDir;

module.exports = merge(common, {
    devtool: "source-map",
    output: {
        path: path.resolve(__dirname, releaseDir),
        publicPath: constant.publicPath,
        filename: "[name]." + constant.timeStamp + ".js"
    },
    plugins: [
        new ExtractTextPlugin("[name]." + constant.timeStamp + ".css"),
        new DllReferencePlugin({
            context: __dirname,
            manifest: require(path.resolve(__dirname, constant.libConfig, "manifest-react.json"))
        }),
        new DllReferencePlugin({
            context: __dirname,
            manifest: require(path.resolve(__dirname, constant.libConfig, "manifest-lib.json"))
        }),
        new DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        }),
        new HtmlWebpackPlugin({
            filename: path.resolve(__dirname, releaseDir + "main.html"),
            template: path.resolve(__dirname, srcDir + "tpl/index.html"),
            _reactRel: reactConfig.reactRel.js,
            _lib: libConfig.lib.js,
            xhtml: true
        })
    ]
});