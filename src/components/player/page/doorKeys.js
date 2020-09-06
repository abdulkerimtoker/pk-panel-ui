import * as React from "react";
import {Checkbox, LinearProgress, Paper, TableCell, TextField, withStyles, withTheme} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {ItemType} from "../../../constants";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";

const styles = theme => ({

});

export class _DoorKeysTab extends React.Component {

    constructor(props) {
        super(props);
        this.state = { isOwner: false };
    }

    componentDidMount() {
        this.props.fetchDoorList();
        this.props.fetchDoorKeys(this.props.player.id);
    }

    changeDoorValue(event, value) {
        this.setState({ selectedDoor: value });
    }

    handleIsOwnerChange() {
        this.setState({ isOwner: !this.state.isOwner });
    }

    handleAssign() {
        this.props.saveDoorKey({
            player: this.props.player,
            door: this.state.selectedDoor,
            isOwner: this.state.isOwner
        });
    }

    handleRevoke(doorKeyId) {
        this.props.revokeDoorKey(doorKeyId);
    }

    render() {
        const { doorKeys, doors } = this.props;
        const { selectedDoor, isOwner } = this.state;

        return (
            <div>
                <form>
                    <Grid container>
                        <Grid item xs={10}>
                            <FormControl fullWidth margin="dense">
                                <FormHelperText>New Door Key</FormHelperText>
                                <Autocomplete
                                    options={doors ? doors : []}
                                    value={selectedDoor}
                                    getOptionLabel={door => `${door.index} - ${door.name}`}
                                    onChange={this.changeDoorValue.bind(this)}
                                    renderInput={params => <TextField {...params} variant="standard" />}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={1}>
                            <FormControl>
                                <FormHelperText>Is Owner?</FormHelperText>
                                <Checkbox
                                    checked={isOwner}
                                    onChange={this.handleIsOwnerChange.bind(this)}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={1}>
                            <Button onClick={this.handleAssign.bind(this)}>Assign</Button>
                        </Grid>
                    </Grid>
                </form>
                {doorKeys ?
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{fontWeight: 'bolder'}}>Door</TableCell>
                                    <TableCell style={{fontWeight: 'bolder'}}>Is Owner</TableCell>
                                    <TableCell />
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {doorKeys.map(dk => (
                                    <TableRow key={dk.id.toString()}>
                                        <TableCell>{dk.door.index + ' - ' + dk.door.name}</TableCell>
                                        <TableCell>{dk.isOwner ? 'Yes' : 'No'}</TableCell>
                                        <TableCell>
                                            <Button onClick={this.handleRevoke.bind(this, dk.id)}>
                                                Revoke
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    :
                    <div>
                        <LinearProgress/>
                        <Typography>Loading player door keys data...</Typography>
                    </div>
                }
            </div>
        );
    }
}

const DoorKeysTab = withTheme(withStyles(styles)(_DoorKeysTab));

export default DoorKeysTab;