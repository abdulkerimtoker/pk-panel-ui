import React from "react";
import {Col, Input, Row, Select} from "antd";

const { Option } = Select;

const fieldTypes = {
    text: 'text',
    number: 'number',
    troop: 'troop',
    faction: 'faction',
    item: 'item',
    doorKey: 'doorKey',
    boardAccess: 'boardAccess'
};

export default class PlayerField extends React.Component {

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

    onBoardSearch = (searchTerm) => {
        if (searchTerm && searchTerm !== '') {
            let filteredBoards = this.props.objectList.filter(board =>
                board.id.toString().includes(searchTerm) || board.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            this.setState({filteredBoards: filteredBoards});
        } else {
            this.setState({filteredBoards: null});
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
            case fieldTypes.boardAccess:
                inputField = (
                    <Select showSearch showArrow={false} filterOption={false} value={this.props.object[this.props.field].id.toString()}
                            onSelect={this.handleChange} onSearch={this.onBoardSearch} style={{width: '100%'}} notFoundContent="No Match">
                        {this.state.filteredBoards ? (
                            this.state.filteredBoards.map((board) => (
                                <Option value={board.id.toString()} key={board.id.toString()}>
                                    {board.id + ' - ' + board.name}
                                </Option>
                            ))
                        ) : (
                            <Option value={this.props.object[this.props.field].id.toString()}>
                                {this.props.object[this.props.field].id + ' - ' + this.props.object[this.props.field].name}
                            </Option>
                        )}
                    </Select>
                );
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