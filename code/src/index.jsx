// import * as React from "react";
// import { render } from "react-dom";
// import { Provider } from "react-redux";
// import Container from "./containers/Container";
// import configureStore from "./configureStore";
// import "./utils/responsive";
import { initJssdk, wxShareAppMessage, wxShareTimeline } from "lk-wxjssdk";
// import { Router, Route, IndexRoute } from "react-router";
// import { RouteTransition } from 'react-router-transition';
// import {
//     HashRouter,
//     Route
// } from "react-router-dom";

// import lkLog from "lk-log";
// lkLog.config({
//     logUrl: "./log",
//     logLevel: 0
// });
// const logger = lkLog.getLogger("index");

// window.onerror = function (msg, url, l) {
//     let errMsg = "";
//     errMsg = "There was an error on this page.;";
//     errMsg += "Error: " + msg + ";";
//     errMsg += "URL: " + url + ";";
//     errMsg += "Line: " + l + ";";
//     logger.primary(errMsg);
// };

// const store = configureStore();

const currentUrl = window.location.origin + window.location.pathname + window.location.search;

initJssdk("/signature", {
    // 是否调试模式，默认关闭
    debug: true,
    // 获得签名请求所需数据
    data: {
        url: currentUrl
    }
}).then(() => {
    const imgUrl = "https://imgsrc.baidu.com/baike/pic/item/509b9fcb7bf335ab52664fdb.jpg";
    wxShareAppMessage({
        title: "自定义标题", // 分享标题
        desc: "自定义描述", // 分享描述
        imgUrl, // 分享图标
        link: currentUrl
    });
    wxShareTimeline({
        title: "自定义标题", // 分享标题
        imgUrl, // 分享图标
        link: currentUrl
    });
}).catch((error)=>{
    alert(error);
});

// render(
//     <Provider store={store}>
//         <HashRouter>
//             <Route path="/" component={Container} />
//         </HashRouter>
//     </Provider>, document.getElementById("app")
// );