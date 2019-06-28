import React from "react";
import {Col, Input, Row, Select} from "antd";

const { Option } = Select;

export class PlayerPage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let playerId = this.props.match.params.id;
        this.props.fetchPlayer(playerId);
        this.props.fetchTroopList();
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
                    <h6>{this.props.player.name}</h6>
                    <PlayerField type="troop" troopList={this.props.troopList} field="troop" player={this.props.player} title="Troop" />
                </div>
                : null
        );
    }
}

const fieldTypes = {
    text: 'text',
    number: 'number',
    troop: 'troop',
    faction: 'faction',
    item: 'item'
};

class PlayerField extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: this.props.player[this.props.field]};
    }

    handleChange = (event) => {
        this.setState({})
    };

    render() {
        let inputField;

        switch (this.props.type) {
            case fieldTypes.text:
                inputField = <Input type="text" value={this.state.value} />;
                break;
            case fieldTypes.number:
                inputField = <Input type="number" value={this.state.value} />;
                break;
            case fieldTypes.troop:
                inputField = (
                    <Select value={this.state.value.id.toString()}
                            onChange={(e) => {}}>
                        {
                            this.props.troopList.map((troop) => (
                                <Option value={troop.id.toString()} key={troop.id.toString()}>
                                    {troop.name}
                                </Option>
                            ))
                        }
                    </Select>
                );
                break;
        }

        return (
            <Row>
                <Col span={2}>
                    <label>{this.props.title}:</label>
                </Col>
                <Col span={10}>{inputField}</Col>
            </Row>
        );
    }
}