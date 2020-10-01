import React from 'react';
import {
    Button,
    Container,
    InputLabel,
    Paper,
    Table, TableBody,
    TableContainer,
    TableHead, TableRow,
    TextField,
    withStyles,
    withTheme
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import FormHelperText from "@material-ui/core/FormHelperText";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TableCell from "@material-ui/core/TableCell";

const styles = theme => ({

});

export class _AdminPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {admin: null, selectedAuthority: null};
    }

    componentDidMount() {
        let adminId = this.props.match ? this.props.match.params.id : this.props.adminId;
        this.props.fetchAdmin(adminId);
        this.props.fetchAssignedAuthorities(adminId);
        this.props.fetchRanks();
        this.props.fetchAuthorityList();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        let propsToUpdate = ['admin'];
        propsToUpdate.forEach(prop => {
            if (this.props[prop] !== prevProps[prop])
                this.setState({[prop]: this.props[prop]});
        });
    }

    handleChangeRank(event, value) {
        this.setState({admin: Object.assign({}, this.state.admin, {rank: value})});
    }

    handleChangeSelectedAuthority(event, value) {
        this.setState({selectedAuthority: value});
    }

    handleAssignAuthority() {
        if (this.state.selectedAuthority) {
            this.props.assignAuthority(this.props.admin.id, this.state.selectedAuthority.id)
                .then(() => this.props.fetchAssignedAuthorities(this.props.admin.id));
        }
    }

    handleRevokeAuthority(assignmentId) {
        this.props.revokeAuthority(assignmentId).then(() => this.props.fetchAssignedAuthorities(this.props.admin.id));
    }

    render() {
        const { ranks, authorityList, assignedAuthorities } = this.props;
        const { admin, selectedAuthority } = this.state;

        return (admin &&
            <Container component={Paper}>
                <Grid container>
                    <Grid item xs={12}>
                        <FormControl fullWidth margin="dense">
                            <InputLabel htmlFor="admin-name">Name</InputLabel>
                            <Input
                                id="admin-name"
                                type="text"
                                value={admin.username}
                                disabled
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth margin="dense">
                            <Autocomplete
                                id="admin-rank"
                                options={ranks ? ranks : [admin.rank]}
                                value={admin.rank}
                                getOptionLabel={rank => rank.rankName}
                                getOptionSelected={(option, value) => option.id === value.id}
                                onChange={this.handleChangeRank.bind(this)}
                                renderInput={params => <TextField {...params} />}
                            />
                        </FormControl>
                    </Grid>
                </Grid>

                <h3>Authorities</h3>
                <Grid container>
                    <Grid item xs={8}>
                        <Autocomplete
                            options={authorityList ? authorityList : []}
                            value={selectedAuthority}
                            getOptionLabel={authority => authority.authorityName}
                            getOptionSelected={(option, value) => option.id === value.id}
                            onChange={this.handleChangeSelectedAuthority.bind(this)}
                            renderInput={params => <TextField {...params} />}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <Button
                            variant="contained" color="primary"
                            onClick={this.handleAssignAuthority.bind(this)}>
                            Assign
                        </Button>
                    </Grid>
                </Grid>
                {assignedAuthorities &&
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableCell>Authority</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell />
                            </TableHead>
                            <TableBody>
                                {assignedAuthorities.map(assignment =>
                                    <TableRow>
                                        <TableCell>{assignment.authority.authorityName}</TableCell>
                                        <TableCell>{assignment.authority.authorityDescription}</TableCell>
                                        <TableCell>
                                            <Button
                                                variant="contained" color="secondary"
                                                onClick={this.handleRevokeAuthority.bind(this, assignment.id)}>
                                                Revoke
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                }
            </Container>
        );
    }
}

const AdminPage = withTheme(withStyles(styles)(_AdminPage));
export default AdminPage;