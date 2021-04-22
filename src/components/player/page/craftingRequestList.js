import * as React from "react";
import {makeStyles} from "@material-ui/core/styles";
import httpclient from "../../../utils/httpclient";
import {receiveCraftingRequests} from "../../../actions/player";
import {connect} from "react-redux";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import {useEffect} from "react";

const styles = makeStyles(theme => ({

}));

const sortRequest = (a, b) => a.creationTime > b.creationTime;

const CraftingRequestList = props => {
    const { craftingRequests, playerId } = props;

    useEffect(() => {
        props.fetchCraftingRequests(playerId);
    }, [playerId]);

    return (
        <div>
            {craftingRequests &&
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Item</TableCell>
                                <TableCell>Time</TableCell>
                                <TableCell>Instance</TableCell>
                                <TableCell>State</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {craftingRequests.sort(sortRequest).map(craftingRequest =>
                                <TableRow key={craftingRequest.id.toString()}>
                                    <TableCell>{craftingRequest.id}</TableCell>
                                    <TableCell>{craftingRequest.craftingRecipe.item.name}</TableCell>
                                    <TableCell>{craftingRequest.creationTime}</TableCell>
                                    <TableCell>{craftingRequest.craftingStationInstance.name}</TableCell>
                                    <TableCell>{craftingRequest.isTaken ? 'Taken' : 'Being crafted'}</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            }
        </div>
    );
};

const mapStateToProps = state => ({
    craftingRequests: state.craftingRequests
});

const mapDispatchToProps = dispatch => ({
    fetchCraftingRequests: playerId => {
        httpclient.fetch(`/api/player/${playerId}/craftingRequests`)
            .then(resp => resp.json())
            .then(craftingRequests => dispatch(receiveCraftingRequests(craftingRequests)));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(CraftingRequestList);