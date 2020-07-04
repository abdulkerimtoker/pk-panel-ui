import * as React from "react";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {
    Checkbox,
    Input,
    InputLabel,
    LinearProgress,
    Paper,
    TableCell,
    TextField,
    withStyles,
    withTheme
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import {_DoorKeysTab} from "./doorKeys";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";

const styles = theme => ({

});

export class _ProfessionsTab extends React.Component {

    constructor(props) {
        super(props);
        this.state = { tier: 1 };
    }

    componentDidMount() {
        this.props.fetchProfessionsList();
        this.props.fetchProfessionAssignments(this.props.player.id);
    }

    changeProfessionValue(event, value) {
        this.setState({ selectedProfession: value });
    }

    changeTierValue(event) {
        this.setState({ tier: event.target.value });
    }

    handleAssign() {
        this.props.saveProfessionAssignment({
            player: this.props.player,
            profession: this.state.selectedProfession,
            tier: this.state.tier
        });
    }

    handleRevoke(professionId) {
        this.props.revokeProfession(this.props.player.id, professionId);
    }

    render() {
        const { professions, professionAssignments } = this.props;
        const { selectedProfession, tier } = this.state;

        return (
            <div>
                <form>
                    <Grid container>
                        <Grid item xs={10}>
                            <FormControl fullWidth margin="dense">
                                <FormHelperText>Assign Profession</FormHelperText>
                                <Autocomplete
                                    options={professions ? professions : []}
                                    value={selectedProfession}
                                    getOptionLabel={profession => `${profession.id} - ${profession.name}`}
                                    onChange={this.changeProfessionValue.bind(this)}
                                    renderInput={params => <TextField {...params} variant="standard" />}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={1}>
                            <FormControl>
                                <InputLabel htmlFor="profession-tier">Tier</InputLabel>
                                <Input
                                    id="profession-tier"
                                    type="number"
                                    value={tier}
                                    onChange={this.changeTierValue.bind(this)}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={1}>
                            <Button onClick={this.handleAssign.bind(this)}>Assign</Button>
                        </Grid>
                    </Grid>
                </form>
                { professionAssignments ?
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{fontWeight: 'bolder'}}>Profession</TableCell>
                                    <TableCell style={{fontWeight: 'bolder'}}>Tier</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                { professionAssignments.map(pa => (
                                    <TableRow key={pa.profession.id.toString()}>
                                        <TableCell>{pa.profession.name}</TableCell>
                                        <TableCell>{pa.tier}</TableCell>
                                        <TableCell>
                                            <Button onClick={this.handleRevoke.bind(this, pa.profession.id)}>
                                                Revoke
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                )) }
                            </TableBody>
                        </Table>
                    </TableContainer>
                    :
                    <div>
                        <LinearProgress/>
                        <Typography>Loading player profession assignment data...</Typography>
                    </div>
                }
            </div>
        );
    }
}

const ProfessionsTab = withTheme(withStyles(styles)(_ProfessionsTab));

export default ProfessionsTab;