var path = require("path");
var merge = require("webpack-merge");
var common = require("./webpack.common");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var BrowserSyncPlugin = require("browser-sync-webpack-plugin");
var DllReferencePlugin = require("webpack/lib/DllReferencePlugin");
//var HotModuleReplacementPlugin = require("webpack/lib/HotModuleReplacementPlugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var reactConfig = require("./lib/react-config");
var libConfig = require("./lib/lib-config");

var constant = require("./constant");
var outDir = constant.outDir;
var srcDir = constant.srcDir;
var libPath = constant.libPath;
var tplDir = constant.tplDir;
var publicPath = constant.publicPath;

module.exports = merge(common, {
    devtool: "source-map",
    output: {
        //path: path.resolve(__dirname, outDir),
        //publicPath: publicPath,
        path: "/",
        publicPath: "/",
        filename: "[name].[hash].js"
    },
    plugins: [
        new ExtractTextPlugin("[name].[hash].css"),
        new DllReferencePlugin({
            context: __dirname,
            manifest: require(path.resolve(__dirname, constant.libConfig, "manifest-react.json"))
        }),
        new DllReferencePlugin({
            context: __dirname,
            manifest: require(path.resolve(__dirname, constant.libConfig, "manifest-lib.json"))
        }),
        //new HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            //filename: path.resolve(__dirname, tplDir + "index.html"),
            template: path.resolve(__dirname, srcDir + "tpl/index.html"),
            _reactRel: reactConfig.reactRel.js,
            _lib: libConfig.lib.js,
            xhtml: true
        }),
        new BrowserSyncPlugin(
            {
                // browse to http://localhost:3000/ during development
                host: "0.0.0.0",
                port: 3456, //代理后访问的端口
                //server: { baseDir: [path.resolve(__dirname, outDir)] }
                proxy: "localhost:3003"//要代理的端口
            }, {
                reload: true
            }
        )
    ]
});