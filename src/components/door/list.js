import * as React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {connect} from "react-redux";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import {useEffect} from "react";
import {receiveDoors} from "../../actions/door";
import httpclient from "../../utils/httpclient";

const styles = makeStyles(theme => ({
    row: {
        '&:hover': {
            cursor: 'pointer',
            background: '#AAA'
        }
    }
}));

const DoorList = props => {
    const { doors } = props;
    const classes = styles();

    useEffect(() => {
        props.fetchDoors();
    }, []);

    const goToDoor = doorId => window.open(`/door/${doorId}`, '_blank');

    return (
        <div>
            {doors &&
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Locked</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {doors.sort((a, b) => a.index - b.index).map(door =>
                            <TableRow
                                key={door.index.toString()} className={classes.row}
                                onClick={goToDoor.bind(null, door.index)}
                            >
                                <TableCell>{door.index}</TableCell>
                                <TableCell>{door.name}</TableCell>
                                <TableCell>{door.locked}</TableCell>
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
    doors: state.doors
});

const mapDispatchToProps = dispatch => ({
    fetchDoors: () => {
        httpclient.fetch(`/api/door`)
            .then(resp => resp.json())
            .then(doors => dispatch(receiveDoors(doors)));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(DoorList);