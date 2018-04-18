var timeStamp = (new Date()).getTime() + "";

module.exports = {
    timeStamp: "jssdk" + timeStamp,
    publicPath: "",//"./dist/",
    releaseDir: "../release/",
    debugDir: "../public/",
    srcDir: "../src/",
    libConfig: "./lib/",
    reactVendor: [
        "react",
        "react-immutable-render-mixin",
        "react-dom",
        "react-transition-group",
        "react-router",
        "react-router-dom",
        "redux",
        "redux-thunk",
        "react-redux"
    ],
    libVendor: [
        "babel-polyfill",
        "immutable",
        "react-loadable",
        "react-fastclick"
        // "echarts/lib/echarts",
        // "echarts/lib/chart/line",
        // "echarts/lib/chart/lines",
        // "echarts/lib/chart/pie"
    ],
    lessAutoPrefixConfig: [
        "last 2 Chrome versions",
        "ie >= 8",
        "Firefox >= 20",
        "iOS 7",
        "> 5%"
    ]
}