import * as React from "react";
import {makeStyles} from "@material-ui/core/styles";
import httpclient from "../../../utils/httpclient";
import {receiveAltAccounts, receiveCraftingRequests} from "../../../actions/player";
import {connect} from "react-redux";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import {useEffect} from "react";

const styles = makeStyles(theme => ({
    row: {
        '&:hover': {
            cursor: 'pointer',
            background: '#AAA'
        }
    }
}));

const sortRequest = (a, b) => a.creationTime > b.creationTime;

const AltAccountsList = props => {
    const { altAccounts, guid } = props;
    const classes = styles();

    useEffect(() => {
        props.fetchAltAccounts(guid);
    }, [guid]);

    const goToCharacter = playerId => window.open(`/player/${playerId}`, '_blank');

    return (
        <div>
            {altAccounts &&
                <div>
                    <h3>Same GUID Characters</h3>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>GUID</TableCell>
                                    <TableCell>Name</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {altAccounts.filter(alt => alt.uniqueId === guid).map(alt =>
                                    <TableRow
                                        key={alt.id.toString()} className={classes.row}
                                        onClick={goToCharacter.bind(null, alt.id)}>
                                        <TableCell>{alt.uniqueId}</TableCell>
                                        <TableCell>{alt.name}</TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <h3>Alt Accounts</h3>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>GUID</TableCell>
                                    <TableCell>Name</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {altAccounts.filter(alt => alt.uniqueId !== guid).map(alt =>
                                    <TableRow
                                        key={alt.id.toString()} className={classes.row}
                                        onClick={goToCharacter.bind(null, alt.id)}>
                                        <TableCell>{alt.uniqueId}</TableCell>
                                        <TableCell>{alt.name}</TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            }
        </div>
    );
};

const mapStateToProps = state => ({
    altAccounts: state.altAccounts
});

const mapDispatchToProps = dispatch => ({
    fetchAltAccounts: guid => {
        httpclient.fetch(`/api/player/${guid}/altAccounts`)
            .then(resp => resp.json())
            .then(altAccounts => dispatch(receiveAltAccounts(altAccounts)));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(AltAccountsList);