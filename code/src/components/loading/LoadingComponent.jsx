import * as React from "react";
import { immutableRenderDecorator } from "react-immutable-render-mixin";
import PropTypes from "prop-types";

import "./loading-component.less";

class Loading extends React.Component {
    static defaultProps = {
        name: "stranger"
    }
    componentDidMount() {
        // TODO
    }
    render() {
        return (
            <div className="loading-component">loading...</div>
        );
    }
}

Loading.propTypes = {
    name: PropTypes.string.isRequired
}
export default immutableRenderDecorator(Loading);