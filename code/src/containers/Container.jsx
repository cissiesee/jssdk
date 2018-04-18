import * as React from "react";
import { CSSTransitionGroup } from "react-transition-group";
import ImmutableRenderMixin from "react-immutable-render-mixin";
import { Switch } from "react-router";
import { Route, Link } from "react-router-dom";

import MainContainer from "./main/MainContainer";
import SecondContainer from "./second/SecondContainer";
import ThirdContainer from "./third/ThirdContainer";
import { initJssdk, wxShareAppMessage, wxShareTimeline } from "../utils/jssdkApi";

import "../styles/ui.less";
import "../styles/reset.less";
import "./container.less";
import "./router-animate.less";

class Container extends React.Component {
    componentWillMount() {
        document.body.style.margin = "0px";
        // 这是防止页面被拖拽
        // document.body.addEventListener("touchmove", (ev) => {
        //     ev.preventDefault();
        // });

        //微信二次分享
        // initJssdk("")
        //     .then(() => {
        //         logger.primary("initJssdk");
        //         wxShareAppMessage({
        //             title: "",
        //             desc: "",
        //             imgUrl: ""
        //         });
        //         wxShareTimeline({
        //             title: "",
        //             imgUrl: ""
        //         });
        //         logger.primary("initJssdk finished");
        //     })
        //     .catch((error) => {
        //         // alert(error)
        //     });
    }
    render() {
        // console.log(this.props.location.pathname, ",", this.props.history.action);
        const action = this.props.history.action;
        const location = this.props.location;
        const isPop = action === "POP" ? true : false;
        const transitionName = "transitionWrapper" + (isPop ? "-back" : "");
        const duration = 500;
        return (
            <CSSTransitionGroup
                transitionName={transitionName}
                component="div"
                className="transitionWrapper"
                transitionEnterTimeout={duration}
                transitionLeaveTimeout={duration}>
                <Switch key={location.pathname} location={location}>
                    <Route exact path="/" component={MainContainer} />
                    <Route path="/second" component={SecondContainer} />
                    <Route path="/third" component={ThirdContainer} />
                </Switch>
            </CSSTransitionGroup>
        );
    }
}

export default Container;
