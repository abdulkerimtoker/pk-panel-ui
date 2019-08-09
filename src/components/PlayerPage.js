import React from "react";
import {Button, Select, Tabs, Col, Row, Checkbox} from "antd";
import {Redirect} from "react-router-dom";
import PlayerField from "./PlayerField";

const { TabPane } = Tabs;

export class PlayerPage extends React.Component {

    componentWillMount() {
        let playerId = this.props.match.params.id;
        this.props.fetchPlayer(playerId);
        let tab = this.props.match.params.tab;
        if (tab) {
            this.loadDataForTab(tab);
        }
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
                    case 'doorKeys':
                        this.props.fetchDoorKeys(playerId);
                        break;
                    case 'boardAccesses':
                        this.props.fetchBoardAccesses(playerId);
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
                    case 'doorList':
                        this.props.fetchDoorList();
                        break;
                    case 'boardList':
                        this.props.fetchBoardList();
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
            case 'doorkeys':
                this.loadDataIfNotExists(['doorKeys', 'doorList']);
                break;
            case 'boardaccesses':
                this.loadDataIfNotExists(['boardList', 'boardAccesses']);
                break;
        }
    }

    handleInventorySlotChange = updatedSlot => {
        this.props.updateInventorySlot(this.props.inventory.id, updatedSlot);
    };

    handleDoorKeyChange = doorKey => {
        this.props.saveDoorKey(this.props.player.id, doorKey);
    };

    handleBoardAccessChange = boardAccess => {
        this.props.saveBoardAccess(this.props.player.id, boardAccess);
    };

    render() {
        return (
            this.props.player ?
                <div>
                    <h3>{this.props.player.name}</h3>
                    <Tabs activeKey={this.props.match.params.tab ? this.props.match.params.tab : 'character'}
                          onChange={this.handleTabChange}>
                        <TabPane tab="Character" key="character">
                            <PlayerField type="text" object={this.props.player} field="name" title="Name" onChange={this.handleFieldChange} key="name" />
                            <PlayerField type="number" object={this.props.player} field="uniqueId" title="GUID" onChange={this.handleFieldChange} key="uniqueId" />
                            <PlayerField type="number" object={this.props.player} field="gold" title="Gold" onChange={this.handleFieldChange} key="gold" />
                            <PlayerField type="number" object={this.props.player} field="hp" title="Health" onChange={this.handleFieldChange} key="hp" />
                            <PlayerField type="number" object={this.props.player} field="food" title="Food" onChange={this.handleFieldChange} key="food" />
                            <PlayerField type="troop" object={this.props.player} field="troop" title="Troop" onChange={this.handleFieldChange} objectList={this.props.troopList} key="troop" />
                            <PlayerField type="troop" object={this.props.player} field="faction" title="Faction" onChange={this.handleFieldChange} objectList={this.props.factionList} key="faction" />
                            <Button onClick={() => this.props.updatePlayer(this.props.player)}>Save</Button>
                            <Redirect to={'/player/' + this.props.match.params.id + '/character'} />
                        </TabPane>
                        <TabPane tab="Inventory" key="inventory">
                            {this.props.inventory ? (
                                <div>
                                    {this.props.inventory.slots.map(slot => (
                                        <PlayerField type="item" object={slot} field="item" title={'Slot ' + slot.slot} onChange={this.handleInventorySlotChange}
                                                     objectList={this.props.itemList} key={slot.slot.toString()} />
                                    ))}
                                </div>
                            ) : null}
                        </TabPane>
                        <TabPane tab="Door Keys" key="doorkeys">
                            {this.props.doorList ? (
                                <PlayerAssignField type="doorKey" field="door"
                                                   objectList={this.props.doorList} onSave={this.handleDoorKeyChange}>
                                    <CheckBoxField field="isOwner" defaultValue={false} label="Is Owner?" />
                                </PlayerAssignField>
                            ) : null}
                            {this.props.doorKeys ? (
                                <div>
                                    {this.props.doorKeys.map(doorKey => (
                                        <PlayerField type="doorKey" object={doorKey} field="door" title={'ID: ' + doorKey.id} onChange={this.handleDoorKeyChange}
                                                     objectList={this.props.doorList} key={doorKey.id.toString()} />
                                    ))}
                                </div>
                            ) : null}
                        </TabPane>
                        <TabPane tab="Board Accesses" key="boardaccesses">
                            {this.props.boardList ? (
                                <PlayerAssignField type="boardAccess" field="board"
                                                   objectList={this.props.boardList} onSave={this.handleBoardAccessChange}>
                                    <CheckBoxField field="isOwner" defaultValue={false} label="Is Owner?" />
                                </PlayerAssignField>
                            ) : null}
                            {this.props.boardAccesses ? (
                                <div>
                                    {this.props.boardAccesses.map(boardAccess => (
                                        <PlayerField type="boardAccess" object={boardAccess} field="board" title={'ID: ' + boardAccess.id} onChange={this.handleBoardAccessChange}
                                                     objectList={this.props.boardList} key={boardAccess.id.toString()} />
                                    ))}
                                </div>
                            ) : null}
                        </TabPane>
                    </Tabs>
                </div>
                : null
        );
    }
}

class PlayerAssignField extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            object: {
                [this.props.field]: this.props.objectList[0]
            }
        };
    }

    onChange = (newObjectState) => {
        this.setState({object: newObjectState});
    };

    setObjectField = (field, value) => {
        this.setState({object: Object.assign({}, this.state.object, {[field]: value})});
        console.log(field + value + ' ' + JSON.stringify(this.state));
    };

    render() {
        let spanForSubFields = React.Children.count(this.props.children) * 3;
        return (
            <Row style={{marginBottom: 10}}>
                <Col span={22 - spanForSubFields}>
                    <PlayerField type={this.props.type} object={this.state.object} field={this.props.field}
                                 title={this.props.title} onChange={this.onChange} objectList={this.props.objectList} />
                </Col>
                {React.Children.map(this.props.children, child => (
                    <Col span={3}>
                        { React.cloneElement(child,
                            {setObjectField: this.setObjectField, value: this.state.object[child.props.field]}) }
                    </Col>
                ))}
                <Col span={2}>
                    <Button onClick={() => this.props.onSave(this.state.object)}>Assign</Button>
                </Col>
            </Row>
        );
    }
}

class CheckBoxField extends React.Component {

    componentDidMount() {
        this.props.setObjectField(this.props.field, this.props.defaultValue);
    }

    render() {
        return (
            <Checkbox value={this.props.value} style={{marginLeft: 10}}
                      onChange={(event) => this.props.setObjectField(this.props.field, event.target.checked)}>
                {this.props.label}
            </Checkbox>
        );
    }
}