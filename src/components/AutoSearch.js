import React from "react";
import {Input} from "antd";

class AutoSearch extends React.Component {
    constructor(props) {
        super(props);
        this._searchInterval = this.props.searchInterval ? this.props.searchInterval : 2000;
    }

    componentDidMount() {
        this._lastSearchTime = new Date();
        this._intervalId = setInterval(() => {
            this._lastSearchTime.
        }, this._searchInterval);
    }

    componentWillUnmount() {
        clearInterval(this._intervalId);
    }

    onChange = (event) => {
        this._lastSearchTime = new Date();
        if (this.props.onSearch) {
            this.props.onSearch(event.target.value);
        }
    };

    render() {
        return (
            <Input onChange={this.onChange} />
        );
    }
}