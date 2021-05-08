import * as React from "react";
import {
    Input,
    Paper,
    Table,
    TableBody,
    TableContainer, TableFooter,
    TableHead,
    TableRow,
    withStyles,
    withTheme
} from "@material-ui/core";
import SockJS from 'sockjs-client';
import Stomp from 'stompjs-websocket';
import Button from "@material-ui/core/Button";
import TableCell from "@material-ui/core/TableCell";
import TextField from "@material-ui/core/TextField";
import httpclient from "../../utils/httpclient";

const styles = theme => ({

});

const ServerStatus = {
    ONLINE: 'Online',
    OFFLINE: 'Offline',
    UNKNOWN: 'in Unknown State',
    STARTING: 'Starting Up',
    SHUTTING_DOWN: 'Shutting Down'
};

export class _ServerPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            serverStatus: ServerStatus.UNKNOWN,
            map: null,
            moduleFile: null,
            startupCommands: null,
            commandToCreate: '',
            commandValueToCreate: ''
        };
    }

    componentDidMount() {
        this.props.fetchServer(this.props.selectedServer.id);
        this.props.fetchStartupCommands();

        let serverId = this.props.selectedServer.id;
        this.stomp = Stomp.over(() => SockJS('/ws'));
        this.headers = {
            Authorization: localStorage.getItem('JWT'),
            SelectedServerId: serverId
        };

        this.stomp.connect(this.headers, () => {
            this.stomp.subscribe(`/channel/${serverId}/state`, message => {
                switch (message.body) {
                    case 'online':
                        this.setState({serverStatus: ServerStatus.ONLINE});
                        break;
                    case 'offline':
                        this.setState({serverStatus: ServerStatus.OFFLINE});
                        break;
                    case 'starting_up':
                        this.setState({serverStatus: ServerStatus.STARTING});
                        break;
                    case 'shutting_down':
                        this.setState({serverStatus: ServerStatus.SHUTTING_DOWN});
                        break;
                }
            });
        });
    }

    componentWillUnmount() {
        this.stomp.disconnect(() => this.stomp.ws.close(), this.headers);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.startupCommands !== this.props.startupCommands) {
            this.setState({startupCommands: this.props.startupCommands});
        }
    }

    handleStart() {
        this.stomp.send('/start');
    }

    handleShutdown() {
        this.stomp.send('/shutdown');
    }

    handleChangeMap(event) {
        let map = event.target.files ? event.target.files[0] : null;
        this.setState({ map: map });
    }

    handleChangeModuleFile(event) {
        let file = event.target.files ? event.target.files[0] : null;
        this.setState({ moduleFile: file });
    }

    handleUploadMap() {
        if (this.state.map) {
            let form = new FormData();
            form.append('map', this.state.map, this.state.map.name);
            httpclient.fetch('/api/uploadMap', {
                method: 'POST',
                body: form
            }).then(() => alert('Map uploaded successfully'));
        }
    }

    handleUploadModuleFile() {
        if (this.state.moduleFile) {
            let form = new FormData();
            form.append('file', this.state.moduleFile, this.state.moduleFile.name);
            httpclient.fetch('/api/uploadModuleFile', {
                method: 'POST',
                body: form
            }).then(() => alert('Module file uploaded successfully'));
        }
    }

    handleChangeCommand(command, event) {
        this.setState({
            startupCommands: this.state.startupCommands.map(c =>
                c.command === command ? Object.assign({}, c, {command: event.target.value}) : c)
        });
    }

    handleChangeCommandValue(command, event) {
        this.setState({
            startupCommands: this.state.startupCommands.map(c =>
                c.command === command ? Object.assign({}, c, {value: event.target.value}) : c)
        });
    }

    handleChangeCommandOrder(command, event) {
        this.setState({
            startupCommands: this.state.startupCommands.map(c =>
                c.command === command ? Object.assign({}, c, {order: parseInt(event.target.value)}) : c)
        });
    }

    handleSaveStartupCommand(startupCommand) {
        this.props.saveStartupCommand(startupCommand).then(() => this.props.fetchStartupCommands());
    }

    handleRemoveStartupCommand(command) {
        this.props.removeStartupCommand(command).then(() => this.props.fetchStartupCommands());
    }

    handleChangeCommandToCreate(event) {
        this.setState({commandToCreate: event.target.value});
    }

    handleChangeCommandValueToCreate(event) {
        this.setState({commandValueToCreate: event.target.value});
    }

    handleCreateCommand() {
        this.props.saveStartupCommand({
            command: this.state.commandToCreate,
            value: this.state.commandValueToCreate,
            order: 1
        }).then(() => this.props.fetchStartupCommands());
    }

    render() {
        const { server } = this.props;
        const { serverStatus, startupCommands, commandToCreate, commandValueToCreate } = this.state;

        return (
            <div>
                <h2>Server is {serverStatus}</h2>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={this.handleStart.bind(this)}>Start</Button>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={this.handleShutdown.bind(this)}>Shutdown</Button>

                <h2>Upload Map</h2>
                <Input
                    type="file"
                    onChange={this.handleChangeMap.bind(this)} />
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={this.handleUploadMap.bind(this)}>Upload</Button>

                <h2>Upload Module File</h2>
                <Input
                    type="file"
                    onChange={this.handleChangeModuleFile.bind(this)} />
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={this.handleUploadModuleFile.bind(this)}>Upload</Button>

                {startupCommands &&
                <TableContainer component={Paper}>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>Order</TableCell>
                                <TableCell>Command</TableCell>
                                <TableCell>Value</TableCell>
                                <TableCell/>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {startupCommands.sort((a, b) => a.order - b.order).map(sc =>
                                <TableRow key={sc.command}>
                                    <TableCell align="left">
                                        <TextField
                                            value={sc.order} type="number"
                                            onChange={this.handleChangeCommandOrder.bind(this, sc.command)}
                                            onBlur={this.handleSaveStartupCommand.bind(this, sc)}
                                        />
                                    </TableCell>
                                    <TableCell align="left">
                                        <TextField fullWidth value={sc.command} disabled />
                                    </TableCell>
                                    <TableCell align="left">
                                        <TextField
                                            fullWidth value={sc.value}
                                            onChange={this.handleChangeCommandValue.bind(this, sc.command)}
                                            onBlur={this.handleSaveStartupCommand.bind(this, sc)}
                                        />
                                    </TableCell>
                                    <TableCell align="left">
                                        <Button
                                            variant="contained" color="primary"
                                            onClick={this.handleRemoveStartupCommand.bind(this, sc.command)}
                                        >
                                            Remove
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TableCell align="left">
                                    <TextField
                                        fullWidth value={commandToCreate}
                                        onChange={this.handleChangeCommandToCreate.bind(this)}
                                    />
                                </TableCell>
                                <TableCell align="left">
                                    <TextField
                                        fullWidth value={commandValueToCreate}
                                        onChange={this.handleChangeCommandValueToCreate.bind(this)}
                                    />
                                </TableCell>
                                <TableCell align="left">
                                    <Button
                                        variant="contained" color="primary"
                                        onClick={this.handleCreateCommand.bind(this)}
                                    >
                                        Insert
                                    </Button>
                                </TableCell>
                            </TableRow>
                        </TableFooter>
                    </Table>
                </TableContainer>
                }
            </div>
        );
    }
}

const ServerPage = withTheme(withStyles(styles)(_ServerPage));
export default ServerPage;