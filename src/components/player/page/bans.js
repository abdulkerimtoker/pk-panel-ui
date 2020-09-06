import * as React from "react";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {Checkbox, Input, Paper, TableCell, TextField, withStyles, withTheme} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {_DoorKeysTab} from "./doorKeys";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import SockJS from 'sockjs-client';
import Stomp from 'stompjs-websocket';

const styles = theme => ({

});

export class _BansTab extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            reason: '', isPermanent: false,
            minutes: 0, hours: 0, days: 0
        };
    }

    componentDidMount() {
        this.props.fetchBans(this.props.player.id);
    }

    handleFieldChange(field, event) {
        this.setState({[field]: event.target.value});
    }

    handleIntFieldChange(field, event) {
        let value = Math.max(event.target.value === '' ? 0 : parseInt(event.target.value), 0);
        this.setState({[field]: value});
    }

    handleIsPermanentChange() {
        this.setState({isPermanent: !this.setState.isPermanent});
    }

    handleBan() {
        this.props.ban({
            playerUniqueId: this.props.player.uniqueId,
            reason: this.state.reason,
            permanent: this.state.isPermanent,
            minutes: this.state.days * 1440
                + this.state.hours * 60
                + this.state.minutes
        });
    }

    handleUndoBan(banId) {
        this.props.undoBan(banId);
    }

    getBanDurationText(ban) {
        if (ban.permanent)
            return 'Permanent';
        if (ban.minutes === 0)
            return 'None';

        let minutes = ban.minutes;
        let days = (minutes - minutes % 1440) / 1440;
        minutes -= days * 1440;
        let hours = (minutes - minutes % 60) / 60;
        minutes -= hours * 60;

        let text = '';
        if (days) text += `${days} Day${days > 1 ? 's' : ''}`;
        if (hours) text += ` ${hours} Hour${hours > 1 ? 's' : ''}`;
        if (minutes) text += ` ${minutes} Minute${minutes > 1 ? 's' : ''}`;

        return text.trim();
    }

    banSorter(a, b) {
        if (a.time > b.time)
            return 1;
        if (a.time < b.time)
            return -1;
        return 0;
    }

    render() {
        const { bans } = this.props;
        const { reason, isPermanent, minutes, hours, days } = this.state;

        return (
            <div>
                <form>
                    <Grid container>
                        <Grid item xs={12}>
                            <FormControl fullWidth margin="dense">
                                <FormHelperText>Reason</FormHelperText>
                                <TextareaAutosize
                                    rowsMin={3}
                                    value={reason}
                                    onChange={this.handleFieldChange.bind(this, 'reason')}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={1}>
                            <FormControl fullWidth margin="dense">
                                <FormHelperText>Days</FormHelperText>
                                <Input
                                    type="number"
                                    min="0"
                                    value={days}
                                    onChange={this.handleIntFieldChange.bind(this, 'days')}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={1}>
                            <FormControl fullWidth margin="dense">
                                <FormHelperText>Hours</FormHelperText>
                                <Input
                                    type="number"
                                    min="0"
                                    value={hours}
                                    onChange={this.handleIntFieldChange.bind(this, 'hours')}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={1}>
                            <FormControl fullWidth margin="dense">
                                <FormHelperText>Minutes</FormHelperText>
                                <Input
                                    type="number"
                                    min="0"
                                    value={minutes}
                                    onChange={this.handleIntFieldChange.bind(this, 'minutes')}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={2}>
                            <FormControl fullWidth margin="dense">
                                <FormHelperText>Is Permanent</FormHelperText>
                                <Checkbox
                                    value={isPermanent}
                                    onChange={this.handleIsPermanentChange.bind(this)}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={2}>
                            <FormControl fullWidth margin="dense">
                                <Button
                                    variant="contained" color="primary"
                                    onClick={this.handleBan.bind(this)}
                                >
                                    Ban
                                </Button>
                            </FormControl>
                        </Grid>
                    </Grid>

                    {bans &&
                    <div>
                        <h2>Active Bans</h2>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={{fontWeight: 'bolder'}}>ID</TableCell>
                                        <TableCell style={{fontWeight: 'bolder'}}>Admin</TableCell>
                                        <TableCell style={{fontWeight: 'bolder'}}>Reason</TableCell>
                                        <TableCell style={{fontWeight: 'bolder'}}>Time</TableCell>
                                        <TableCell style={{fontWeight: 'bolder'}}>Duration</TableCell>
                                        <TableCell/>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {bans.filter(ban => !ban.expired && !ban.undone)
                                        .sort(this.banSorter).map(ban => (
                                        <TableRow key={ban.id.toString()}>
                                            <TableCell>{ban.id.toString()}</TableCell>
                                            <TableCell>{ban.panelUser.username}</TableCell>
                                            <TableCell>{ban.reason}</TableCell>
                                            <TableCell>{ban.time}</TableCell>
                                            <TableCell>{this.getBanDurationText(ban)}</TableCell>
                                            <TableCell>
                                                <Button
                                                    color="primary" variant="contained"
                                                    onClick={this.handleUndoBan.bind(this, ban.id)}
                                                >
                                                    Undo
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>

                        <h2>Past Bans</h2>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={{fontWeight: 'bolder'}}>ID</TableCell>
                                        <TableCell style={{fontWeight: 'bolder'}}>Admin</TableCell>
                                        <TableCell style={{fontWeight: 'bolder'}}>Reason</TableCell>
                                        <TableCell style={{fontWeight: 'bolder'}}>Time</TableCell>
                                        <TableCell style={{fontWeight: 'bolder'}}>Duration</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {bans.filter(ban => ban.expired || ban.undone)
                                        .sort(this.banSorter).map(ban => (
                                        <TableRow key={ban.id.toString()}>
                                            <TableCell>{ban.id.toString()}</TableCell>
                                            <TableCell>{ban.panelUser.username}</TableCell>
                                            <TableCell>{ban.reason}</TableCell>
                                            <TableCell>{ban.time}</TableCell>
                                            <TableCell>{this.getBanDurationText(ban)}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                    }
                </form>
            </div>
        );
    }
}

const BansTab = withTheme(withStyles(styles)(_BansTab));

export default BansTab;