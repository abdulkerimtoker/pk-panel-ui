import {
    Button,
    Container, FormControl,
    Grid, Input, InputLabel, Paper,
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TableRow, TextField,
    withStyles,
    withTheme
} from "@material-ui/core";
import TableCell from "@material-ui/core/TableCell";
import React from 'react';

const styles = theme => ({
    row: {
        '&:hover': {
            cursor: 'pointer',
            background: '#AAA'
        }
    }
});

export class _AdminList extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchAdminList();
    }

    handleManageAdmin(id) {
        this.props.history.push(`/admin/${id}`);
    }

    handleInvite() {
        this.props.createAdminInvitation();
    }

    render() {
        const { classes, adminList, invitation } = this.props;

        return (
            <Container component={Paper}>
                <h3>Invite</h3>
                <form>
                    <Grid container>
                        <Grid item xs={8}>
                            <FormControl fullWidth margin="dense">
                                <InputLabel htmlFor="invitation-code">Code</InputLabel>
                                <Input
                                    id="invitation-code"
                                    type="text"
                                    value={invitation ? invitation.code : ''}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={4}>
                            <Button
                                variant="contained" color="primary"
                                onClick={this.handleInvite.bind(this)}>
                                Generate Invitation Code
                            </Button>
                        </Grid>
                    </Grid>
                </form>

                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Rank</TableCell>
                        </TableHead>
                        <TableBody>
                            {adminList && adminList.map(admin =>
                                <TableRow
                                    key={admin.id.toString()}
                                    className={classes.row}
                                    onClick={this.handleManageAdmin.bind(this, admin.id)}
                                >
                                    <TableCell>{admin.id}</TableCell>
                                    <TableCell>{admin.username}</TableCell>
                                    <TableCell>{admin.rank.name}</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        );
    }
}

const AdminList = withTheme(withStyles(styles)(_AdminList));
export default AdminList;