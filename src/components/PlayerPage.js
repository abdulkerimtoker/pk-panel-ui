import React from "react";

export class PlayerPage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let playerId = this.props.match.params.id;
        this.props.fetchPlayer(playerId);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        let playerId = this.props.match.params.id;
        if (playerId !== prevProps.match.params.id) {
            this.props.fetchPlayer(playerId);
        }
    }

    render() {
        return (
            this.props.player ?
                <div>

                </div>
                : null
        );
    }
}