import React from "react";
import {Button, Input, Table} from "antd";
import {Link} from "react-router-dom";

const { Column } = Table;

export default class PlayerList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div>
                    <Input onPressEnter={(event) => this.props.fetchPlayerList(event.target.value)}
                        placeholder="Enter name, id or guid of the player and press enter"/>
                </div>
                <Table dataSource={this.props.playerList} rowKey="id">
                    <Column title="ID" dataIndex="id" key="id" />
                    <Column title="Name" dataIndex="name" key="name" />
                    <Column title="GUID" dataIndex="uniqueId" key="guid" render={() => <label>Hidden for demo</label>} />
                    <Column title="Faction" dataIndex="faction.name" key="faction" />
                    <Column title="Troop" dataIndex="troop.name" key="troop" />
                    <Column title="Gold" dataIndex="gold" key="gold" render={() => <label>Hidden for demo</label>} />
                    <Column dataIndex="id" render={(id) => <Link to={'/player/' + id}>Manage</Link>} key="manage" />
                </Table>
            </div>
        );
    }
}