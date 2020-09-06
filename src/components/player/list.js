import React from "react";
import PlayerPage from '../../containers/player'
import {Link} from "react-router-dom";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import {Input, Paper, TableCell, TextField, withStyles, withTheme} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TablePaginationActions from "@material-ui/core/TablePagination/TablePaginationActions";
import { withRouter } from "react-router-dom";

const styles = theme => ({
    row: {
        '&:hover': {
            cursor: 'pointer',
            background: '#AAA'
        }
    },
    searchBox: {
        marginBottom: '10px',
        padding: '20px'
    },
    searchField: {
        width: '100%'
    }
});

class _PlayerList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {search: '', page: 0, rowsPerPage: 10};
    }

    managePlayer = player => {
        this.props.history.push('/player/' + player['id']);
    };

    handleSearchEnter = event => {
        let search = this.state.search;

        if (event.key === 'Enter') {
            this.props.fetchPlayerList(search);
        }
    };

    handleSearchTextChange = event => this.setState({search: event.target.value});

    handlePageChange = (event, page) => this.setState({page: page});

    handleRowsPerPageChange = event => this.setState({rowsPerPage: +event.target.value, page: 0});

    render() {
        const { players, classes } = this.props;
        const { page, rowsPerPage } = this.state;
        return (
            <Container>
                <Container component={Paper} className={classes.searchBox}>
                    <TextField
                        placeholder="Start typing then press Enter"
                        className={classes.searchField}
                        value={this.state.search}
                        onChange={this.handleSearchTextChange}
                        onKeyPress={this.handleSearchEnter}/>
                </Container>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell style={{fontWeight: 'bolder'}}>ID</TableCell>
                                <TableCell style={{fontWeight: 'bolder'}}>GUID</TableCell>
                                <TableCell style={{fontWeight: 'bolder'}}>Name</TableCell>
                                <TableCell style={{fontWeight: 'bolder'}}>Faction</TableCell>
                                <TableCell style={{fontWeight: 'bolder'}}>Troop</TableCell>
                                <TableCell style={{fontWeight: 'bolder'}}>Gold</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {players ? (rowsPerPage > 0 ? players.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : players)
                                .map(player => (
                                    <TableRow
                                        key={player.id.toString()}
                                        className={classes.row}
                                        onClick={this.managePlayer.bind(this, player)}
                                    >
                                        <TableCell>{player.id}</TableCell>
                                        <TableCell>{player.uniqueId}</TableCell>
                                        <TableCell>{player.name}</TableCell>
                                        <TableCell>{player.faction.name}</TableCell>
                                        <TableCell>{player.troop.name}</TableCell>
                                        <TableCell>{player.gold}</TableCell>
                                    </TableRow>
                            )) : null}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                    colSpan={4}
                                    count={players.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    SelectProps={{
                                        inputProps: { 'aria-label': 'rows per page' },
                                        native: true,
                                    }}
                                    onChangePage={this.handlePageChange}
                                    onChangeRowsPerPage={this.handleRowsPerPageChange}
                                    ActionsComponent={TablePaginationActions}
                                />
                            </TableRow>
                        </TableFooter>
                    </Table>
                </TableContainer>
            </Container>
        );
    }
}

const PlayerList = withRouter(withTheme(withStyles(styles)(_PlayerList)));

export default PlayerList