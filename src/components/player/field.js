import React from "react";
import {Checkbox, Col, Input, Row, Select} from "antd";

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

    render() {
        let inputField;

        switch (this.props.type) {
            case fieldTypes.text:
                inputField = <InputField type="text" object={this.props.object} field={this.props.field}
                                         onChange={this.props.onChange} saveOnChange={true} />;
                break;
            case fieldTypes.number:
                inputField = <InputField type="number" object={this.props.object} field={this.props.field}
                                         onChange={this.props.onChange} saveOnChange={true} parser={parseInt} />;
                break;
            case fieldTypes.troop:
            case fieldTypes.faction:
            case fieldTypes.doorKey:
            case fieldTypes.boardAccess:
            case fieldTypes.item:
                inputField = <SearchSelectField object={this.props.object} field={this.props.field}
                                                objectList={this.props.objectList} onChange={this.props.onChange} />;
                break;
        }

        return (
            <Row style={{marginBottom: 10}}>
                {this.props.title ? (
                    <Col span={2}>
                        <label>{this.props.title}</label>
                    </Col>
                ) : null}
                <Col span={this.props.title ? 16 : 18}>
                    {inputField}
                </Col>
                {this.props.extraFields ? this.props.extraFields.map(field => {
                    switch (field.type) {
                        case 'text':
                            return (
                                <Col span={2}>
                                    <InputField type="text" object={this.props.object} field={field.name}
                                                onChange={this.props.onChange} />
                                </Col>
                            );
                        case 'number':
                            return (
                                <Col span={2}>
                                    <InputField type="number" object={this.props.object} field={field.name}
                                                onChange={this.props.onChange} parser={parseInt} />
                                </Col>
                            );
                        case 'boolean':
                            return (
                                <Col span={2}>
                                    <CheckBoxField object={this.props.object} field={field.name}
                                                   onChange={this.props.onChange} label={field.label} />
                                </Col>
                            );
                        default:
                            return null;
                    }
                }) : null}
            </Row>
        );
    }
}

class InputField extends React.Component {

    handleChange = (event) => {
        let object = Object.assign({}, this.props.object);
        object[this.props.field] = this.props.parser ? this.props.parser(event.target.value) : event.target.value;
        this.props.onChange(object);
    };

    render() {
        if (this.props.saveOnChange) {
            return <Input type={this.props.type} value={this.props.object[this.props.field].toString()}
                          onChange={this.handleChange} />;
        } else {
            return <Input type={this.props.type} value={this.props.object[this.props.field].toString()}
                          onPressEnter={this.handleChange} onBlur={this.handleChange} />;
        }
    }
}

class CheckBoxField extends React.Component {

    handleChange = (event) => {
        let object = Object.assign({}, this.props.object);
        object[this.props.field] = event.target.checked;
        this.props.onChange(object);
    };

    render() {
        return (
            <Checkbox value={this.props.object[this.props.field]} style={{marginLeft: 10}}
                      onChange={this.handleChange}>
                {this.props.label}
            </Checkbox>
        );
    }
}

class SearchSelectField extends React.Component {

    constructor(props) {
        super(props);
        this.state = {filteredObjects: null};
    }

    handleChange = (event) => {
        let object = Object.assign({}, this.props.object);
        let selectedObject = this.props.objectList.filter((obj) => obj.id.toString() === event.toString())[0];
        object[this.props.field] = selectedObject;
        this.props.onChange(object);
    };

    onSearch = (searchTerm) => {
        if (this.props.objectList && searchTerm && searchTerm !== '') {
            let filteredObjects = this.props.objectList.filter(item =>
                item.id.toString().includes(searchTerm) || item.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            this.setState({filteredObjects: filteredObjects});
        } else {
            this.setState({filteredObjects: null});
        }
    };

    render() {
        return (
            <Select showSearch showArrow={false} filterOption={false} value={this.props.object[this.props.field].id.toString()}
                    onSelect={this.handleChange} onSearch={this.onSearch} style={{width: '100%'}} notFoundContent="No Match">
                {this.state.filteredObjects ? (
                    this.state.filteredObjects.map((object) => (
                        <Option value={object.id.toString()} key={object.id.toString()}>
                            {object.id + ' - ' + object.name}
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
}