import React from "react";
import {Button, Select, Tabs, Col, Row, Checkbox} from "antd";
import {Redirect} from "react-router-dom";
import PlayerField, {CheckBoxAssignField, PlayerAssignField} from "./field";

const { TabPane } = Tabs;

export class Index extends React.Component {

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
                                                     objectList={this.props.itemList} key={slot.slot.toString()}
                                                     extraFields={[
                                                         {name: 'ammo', type: 'number'}
                                                     ]} />
                                    ))}
                                </div>
                            ) : null}
                        </TabPane>
                        <TabPane tab="Door Keys" key="doorkeys">
                            {this.props.doorList ? (
                                <PlayerAssignField type="doorKey" field="door"
                                                   objectList={this.props.doorList} onSave={this.handleDoorKeyChange}
                                                   extraFields={[
                                                       {name: 'isOwner', type: 'boolean', label:'Is Owner?'}
                                                   ]}/>
                            ) : null}
                            {this.props.doorKeys ? (
                                <div>
                                    {this.props.doorKeys.map(doorKey => (
                                        <PlayerField type="doorKey" object={doorKey} field="door" title={'ID: ' + doorKey.id} onChange={this.handleDoorKeyChange}
                                                     objectList={this.props.doorList} key={doorKey.id.toString()}
                                                     extraFields={[
                                                         {name: 'isOwner', type: 'boolean', label:'Is Owner?'}
                                                     ]} />
                                    ))}
                                </div>
                            ) : null}
                        </TabPane>
                        <TabPane tab="Board Accesses" key="boardaccesses">
                            {this.props.boardList ? (
                                <PlayerAssignField type="boardAccess" field="board"
                                                   objectList={this.props.boardList} onSave={this.handleBoardAccessChange}
                                                   extraFields={[
                                                       {name: 'isOwner', type: 'boolean', label:'Is Owner?'}
                                                   ]}/>
                            ) : null}
                            {this.props.boardAccesses ? (
                                <div>
                                    {this.props.boardAccesses.map(boardAccess => (
                                        <PlayerField type="boardAccess" object={boardAccess} field="board" title={'ID: ' + boardAccess.id} onChange={this.handleBoardAccessChange}
                                                     objectList={this.props.boardList} key={boardAccess.id.toString()}
                                                     extraFields={[
                                                         {name: 'isOwner', type: 'boolean', label:'Is Owner?'}
                                                     ]} />
                                    ))}
                                </div>
                            ) : null}
                        </TabPane>
                        <TabPane tab="Professions" key="professions">
                            {this.props.boardList ? (
                                <PlayerAssignField type="profession" field="profession"
                                                   objectList={this.props.boardList} onSave={this.handleBoardAccessChange}
                                                   extraFields={[
                                                       {name: 'isOwner', type: 'boolean', label:'Is Owner?'}
                                                   ]}/>
                            ) : null}
                            {this.props.boardAccesses ? (
                                <div>
                                    {this.props.boardAccesses.map(boardAccess => (
                                        <PlayerField type="boardAccess" object={boardAccess} field="board" title={'ID: ' + boardAccess.id} onChange={this.handleBoardAccessChange}
                                                     objectList={this.props.boardList} key={boardAccess.id.toString()}
                                                     extraFields={[
                                                         {name: 'isOwner', type: 'boolean', label:'Is Owner?'}
                                                     ]} />
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
