import * as React from "react";
import {
    Input,
    Paper,
    Table,
    TableBody,
    TableContainer,
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
            map: null
        };
    }

    componentDidMount() {
        this.props.fetchServer(this.props.selectedServer.id);

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

    handleStart() {
        this.stomp.send('/start');
    }

    handleShutdown() {
        this.stomp.send('/shutdown');
    }

    handleChangeCommandField(sc, field, isNumeric, event) {
        let value = isNumeric ?
            parseInt(event.target.value) : event.target.value;
        sc[field] = value;
    }

    handleChangeMap(event) {
        let map = event.target.files ? event.target.files[0] : null;
        this.setState({ map: map });
    }

    handleUploadMap() {
        if (this.state.map) {
            let form = new FormData();
            form.append('map', this.state.map, this.state.map.name);
            httpclient.fetch('/api/uploadMap', {
                method: 'POST',
                body: form
            })
                .then(() => alert('Map uploaded successfully'));
        }
    }

    render() {
        const { server } = this.props;
        const { serverStatus } = this.state;

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
                {false &&
                <TableContainer component={Paper}>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>Order</TableCell>
                                <TableCell>Command</TableCell>
                                <TableCell>Value</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {server.startupCommands.map(sc =>
                                <TableRow key={sc.command}>
                                    <TableCell align="left">
                                        <TextField value={sc.order} type="number" />
                                    </TableCell>
                                    <TableCell align="left">
                                        <TextField fullWidth value={sc.command} />
                                    </TableCell>
                                    <TableCell align="left">
                                        <TextField fullWidth value={sc.value}
                                            onChange={this.handleChangeCommandField.bind(this, sc, 'value', false)}/>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                }
            </div>
        );
    }
}

const ServerPage = withTheme(withStyles(styles)(_ServerPage));
export default ServerPage;