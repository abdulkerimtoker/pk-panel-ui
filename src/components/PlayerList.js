import React from "react";
import {Button} from "antd";

export default class PlayerList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Button onClick={this.props.fetchPlayerList}>Fetch</Button>
                {
                    this.props.playerList ?
                        this.props.playerList.map(player => (
                            <h6>{player.name}</h6>
                        ))
                        : null
                }
            </div>
        );
    }
}