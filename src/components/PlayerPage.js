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
        }
    }

    handleInventorySlotChange = updatedSlot => {
        this.props.updateInventorySlot(this.props.inventory.id, updatedSlot);
    };

    handleDoorKeyChange = doorKey => {
        this.props.saveDoorKey(this.props.player.id, doorKey);
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
                            {this.props.doorKeys ? (
                                <div>
                                    {this.props.doorKeys.map(doorKey => (
                                        <PlayerField type="doorKey" object={doorKey} field="door" title={'ID: ' + doorKey.id} onChange={this.handleDoorKeyChange}
                                                     objectList={this.props.doorList} key={doorKey.id.toString()} />
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

const fieldTypes = {
    text: 'text',
    number: 'number',
    troop: 'troop',
    faction: 'faction',
    item: 'item',
    doorKey: 'doorKey'
};

class PlayerField extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
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
                let selectedTroop = this.props.objectList.filter((troop) => troop.id.toString() === event.toString())[0];
                object[this.props.field] = selectedTroop;
                break;
            case fieldTypes.item:
                let selectedItem = this.props.objectList.filter((troop) => troop.id.toString() === event.toString())[0];
                object[this.props.field] = selectedItem;
                this.setState({filteredItems: null});
                break;
            case fieldTypes.doorKey:
                let selectedDoor = this.props.objectList.filter((door) => door.id.toString() === event.toString())[0];
                object[this.props.field] = selectedDoor;
                this.setState({filteredDoors: null});
                break;
        }
        this.props.onChange(object);
    };

    onItemSearch = (searchTerm) => {
        if (searchTerm && searchTerm !== '') {
            let filteredItems = this.props.objectList.filter(item =>
                item.id.toString().includes(searchTerm) || item.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            this.setState({filteredItems: filteredItems});
        } else {
            this.setState({filteredItems: null});
        }
    };

    onDoorSearch = (searchTerm) => {
        if (searchTerm && searchTerm !== '') {
            let filteredDoors = this.props.objectList.filter(door =>
                door.id.toString().includes(searchTerm) || door.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            this.setState({filteredDoors: filteredDoors});
        } else {
            this.setState({filteredDoors: null});
        }
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
                    <Select value={this.props.object[this.props.field].id.toString()}
                            onChange={this.handleChange}>
                        {this.props.objectList ? (
                            this.props.objectList.map((troop) => (
                                <Option value={troop.id.toString()} key={troop.id.toString()}>
                                    {troop.id + ' - ' + troop.name}
                                </Option>
                            ))
                        ) : null}
                    </Select>
                );
                break;
            case fieldTypes.item:
                inputField = (
                    <Select showSearch showArrow={false} filterOption={false} value={this.props.object[this.props.field].id.toString()}
                            onSelect={this.handleChange} onSearch={this.onItemSearch} style={{width: '100%'}} notFoundContent="No Match">
                        {this.state.filteredItems ? (
                            this.state.filteredItems.map((item) => (
                                <Option value={item.id.toString()} key={item.id.toString()}>
                                    {item.id + ' - ' + item.name}
                                </Option>
                            ))
                        ) : (
                            <Option value={this.props.object[this.props.field].id.toString()}>
                                {this.props.object[this.props.field].id + ' - ' + this.props.object[this.props.field].name}
                            </Option>
                        )}
                    </Select>
                );
                break;
            case fieldTypes.doorKey:
                inputField = (
                    <Select showSearch showArrow={false} filterOption={false} value={this.props.object[this.props.field].id.toString()}
                            onSelect={this.handleChange} onSearch={this.onDoorSearch} style={{width: '100%'}} notFoundContent="No Match">
                        {this.state.filteredDoors ? (
                            this.state.filteredDoors.map((door) => (
                                <Option value={door.id.toString()} key={door.id.toString()}>
                                    {door.id + ' - ' + door.name}
                                </Option>
                            ))
                        ) : (
                            <Option value={this.props.object[this.props.field].id.toString()}>
                                {this.props.object[this.props.field].id + ' - ' + this.props.object[this.props.field].name}
                            </Option>
                        )}
                    </Select>
                );
                break;
        }

        return (
            <Row style={{marginBottom: 10}}>
                <Col span={4}>
                    <label>{this.props.title}:</label>
                </Col>
                <Col span={20}>{inputField}</Col>
            </Row>
        );
    }
}