import React from "react";
import {Button, Checkbox, Col, Input, Row, Select} from "antd";

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

        let mainColSpan = this.props.extraFields ? 24 - this.props.extraFields.length * 3 : 24;
        if (this.props.title)
            mainColSpan -= 2;

        return (
            <Row style={{marginBottom: 10}}>
                {this.props.title ? (
                    <Col span={2}>
                        <label>{this.props.title}</label>
                    </Col>
                ) : null}
                <Col span={mainColSpan}>
                    {inputField}
                </Col>
                {this.props.extraFields ? this.props.extraFields.map(field => {
                    switch (field.type) {
                        case 'text':
                            return (
                                <Col span={3}>
                                    <InputField type="text" object={this.props.object} field={field.name}
                                                onChange={this.props.onChange} />
                                </Col>
                            );
                        case 'number':
                            return (
                                <Col span={3}>
                                    <InputField type="number" object={this.props.object} field={field.name}
                                                onChange={this.props.onChange} parser={parseInt} />
                                </Col>
                            );
                        case 'boolean':
                            return (
                                <Col span={3}>
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

    constructor(props) {
        super(props);
        this.state = {object: this.props.object};
    }

    handleChange = (event) => {
        let value = this.props.parser ? this.props.parser(event.target.value) : event.target.value;
        this.setState(state => ({
            object: Object.assign({}, state.object, {[this.props.field]: value})
        }));

        if (this.props.saveOnChange) {
            this.submitChanges();
        }
    };

    submitChanges = () => {
        if (this.state.object[this.props.field] !== this.props.object[this.props.field]) {
            let object = Object.assign({}, this.state.object);
            this.props.onChange(object);
        }
    };

    render() {
        if (this.props.saveOnChange) {
            return <Input type={this.props.type} value={this.state.object[this.props.field].toString()}
                          onChange={this.handleChange} />;
        } else {
            return <Input type={this.props.type} value={this.state.object[this.props.field].toString()}
                          onChange={this.handleChange}
                          onPressEnter={this.submitChanges} onBlur={this.submitChanges} />;
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
            <Checkbox checked={this.props.object[this.props.field]} style={{marginLeft: 10}}
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

export class PlayerAssignField extends React.Component {

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

    render() {
        let spanForSubFields = this.props.extraFields ? this.props.extraFields.length * 3 : 0;
        return (
            <Row style={{marginBottom: 10}}>
                <Col span={22 - spanForSubFields}>
                    <PlayerField type={this.props.type} object={this.state.object} field={this.props.field}
                                 title={this.props.title} onChange={this.onChange} objectList={this.props.objectList} />
                </Col>
                {this.props.extraFields ? this.props.extraFields.map(field => {
                    switch (field.type) {
                        case 'text':
                            return (
                                <Col span={3}>
                                    <InputField type="text" object={this.state.object} field={field.name}
                                                onChange={this.onChange} />
                                </Col>
                            );
                        case 'number':
                            return (
                                <Col span={3}>
                                    <InputField type="number" object={this.state.object} field={field.name}
                                                onChange={this.onChange} parser={parseInt} />
                                </Col>
                            );
                        case 'boolean':
                            return (
                                <Col span={3}>
                                    <CheckBoxField object={this.state.object} field={field.name}
                                                   onChange={this.onChange} label={field.label} />
                                </Col>
                            );
                        default:
                            return null;
                    }
                }) : null}
                <Col span={2}>
                    <Button onClick={() => this.props.onSave(this.state.object)}>Assign</Button>
                </Col>
            </Row>
        );
    }
}