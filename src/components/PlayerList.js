import React from "react";
import {Button, Table} from "antd";
import Column from "antd/es/table/Column";

export default class PlayerList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div>
                    <Button onClick={this.props.fetchPlayerList}>Fetch</Button>
                </div>
                <Table dataSource={this.props.playerList} rowKey="id">
                    <Column title="ID" dataIndex="id" key="id"/>
                    <Column title="Name" dataIndex="name" key="name"/>
                    <Column title="GUID" dataIndex="uniqueId" key="uniqueId"/>
                    <Column title="Faction" dataIndex="faction.name" key="faction.name"/>
                    <Column title="Troop" dataIndex="troop.name" key="troop.name"/>
                    <Column title="Gold" dataIndex="gold" key="gold"/>
                    <Column render={() => <Button>Manage</Button>} />
                </Table>
            </div>
        );
    }
}