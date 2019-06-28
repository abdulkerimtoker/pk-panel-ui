import React from "react";
import {Button, Input, Table} from "antd";
import Column from "antd/es/table/Column";
import Search from "antd/es/input/Search";

export default class PlayerList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div>
                    <Search onChange={() => alert('sea')} />
                </div>
                <Table dataSource={this.props.playerList} rowKey="id">
                    <Column title="ID" dataIndex="id" key="id"/>
                    <Column title="Name" dataIndex="name" key="name"/>
                    <Column title="GUID" dataIndex="uniqueId" key="uniqueId"/>
                    <Column title="Faction" dataIndex="faction.name" key="faction.name"/>
                    <Column title="Troop" dataIndex="troop.name" key="troop.name"/>
                    <Column title="Gold" dataIndex="gold" key="gold"/>
                    <Column dataIndex="id" key="id" render={(id) => <Button>Manage</Button>} />
                </Table>
            </div>
        );
    }
}