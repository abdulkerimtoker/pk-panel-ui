import React from "react";
import {Button, Col, Input, Row, Select, Tabs} from "antd";
import {Redirect} from "react-router-dom";

const { Option } = Select;
const { TabPane } = Tabs;

export class PlayerPage extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        let playerId = this.props.match.params.id;
        this.props.fetchPlayer(playerId);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        let playerId = this.props.match.params.id;
        if (playerId !== prevProps.match.params.id) {
            this.props.fetchPlayer(playerId);
        }
    }

    handleFieldChange = (updatedPlayer) => {
        this.props.setPlayer(updatedPlayer);
    };

    handleTabChange = (tab) => {
        let playerId = this.props.match.params.id;
        this.props.history.push('/player/' + playerId + '/' + tab);
        this.loadDataForTab(tab);
    };

    loadDataIfNotExists(dataKeys) {
        let playerId = this.props.match.params.id;
        dataKeys.forEach(key => {
            if (!(this.props[key])) {
                switch (key) {
                    case 'inventory':
                        this.props.fetchInventory(playerId);
                        break;
                    case 'troopList':
                        this.props.fetchTroopList();
                        break;
                    case 'factionList':
                        this.props.fetchFactionList();
                        break;
                    case 'itemList':
                        this.props.fetchItemList();
                        break;
                }
            }
        });
    }

    loadDataForTab(tab) {
        switch (tab) {
            case 'character':
                this.loadDataIfNotExists(['troopList', 'factionList', 'itemList']);
                break;
            case 'inventory':
                this.loadDataIfNotExists(['inventory', 'itemList']);
                break;
        }
    }

    handleInventorySlotChange() {

    }

    render() {
        return (
            this.props.player ?
                <div>
                    <Tabs defaultActiveKey={this.props.match.params.tab ? this.props.match.params.tab : 'character'}
                          onChange={this.handleTabChange}>
                        <TabPane tab="Character" key="character">
                            <h3>{this.props.player.name}</h3>
                            <PlayerField type="text" object={this.props.player} field="name" title="Name" onChange={this.handleFieldChange} />
                            <PlayerField type="number" object={this.props.player} field="uniqueId" title="GUID" onChange={this.handleFieldChange} />
                            <PlayerField type="number" object={this.props.player} field="gold" title="Gold" onChange={this.handleFieldChange} />
                            <PlayerField type="number" object={this.props.player} field="hp" title="Health" onChange={this.handleFieldChange} />
                            <PlayerField type="number" object={this.props.player} field="food" title="Food" onChange={this.handleFieldChange} />
                            <PlayerField type="troop" object={this.props.player} field="troop" title="Troop" onChange={this.handleFieldChange} troopList={this.props.troopList} />
                            <PlayerField type="troop" object={this.props.player} field="faction" title="Faction" onChange={this.handleFieldChange} troopList={this.props.factionList} />
                            <Button onClick={() => this.props.updatePlayer(this.props.player)}>Save</Button>
                            <Redirect to={'/player/' + this.props.match.params.id + '/character'} />
                        </TabPane>
                        <TabPane tab="Inventory" key="inventory">
                            {this.props.inventory ? (
                                <div>
                                    {this.inventory.slots.map(slot => (
                                        <PlayerField type="troop" player={slot} field="item" title={'Slot ' + slot.slot} />
                                    ))}
                                </div>
                            ) : null}
                        </TabPane>
                        <TabPane tab="Door Keys" key="doorkeys">
                            Content of Tab Pane 3
                        </TabPane>
                    </Tabs>
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
    }

    handleChange = (event) => {
        let object = Object.assign({}, this.props.object);
        switch (this.props.type) {
            case fieldTypes.text:
                object[this.props.field] = event.target.value;
                break;
            case fieldTypes.number:
                object[this.props.field] = parseInt(event.target.value);
                break;
            case fieldTypes.troop:
                let selectedTroop = this.props.troopList.filter((troop) => troop.id.toString() === event.toString())[0];
                object[this.props.field] = selectedTroop;
                break;
        }
        this.props.onChange(object);
    };

    render() {
        let inputField;

        switch (this.props.type) {
            case fieldTypes.text:
                inputField = <Input type="text" value={this.props.object[this.props.field]} onChange={this.handleChange} />;
                break;
            case fieldTypes.number:
                inputField = <Input type="number" value={this.props.object[this.props.field].toString()} onChange={this.handleChange} />;
                break;
            case fieldTypes.troop:
                inputField = (
                    <Select value={this.props.object[this.props.field].id.toString()} onChange={this.handleChange}>
                        {
                            this.props.troopList.map((troop) => (
                                <Option value={troop.id.toString()} key={troop.id.toString()}>
                                    {troop.id + ' - ' + troop.name}
                                </Option>
                            ))
                        }
                    </Select>
                );
                break;
        }

        return (
            <Row>
                <Col span={4}>
                    <label>{this.props.title}:</label>
                </Col>
                <Col span={20}>{inputField}</Col>
            </Row>
        );
    }
}