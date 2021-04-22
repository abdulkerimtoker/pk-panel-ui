import * as React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {connect} from "react-redux";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import {useEffect} from "react";
import httpclient from "../../utils/httpclient";
import {receiveBoards} from "../../actions/board";

const styles = makeStyles(theme => ({
    row: {
        '&:hover': {
            cursor: 'pointer',
            background: '#AAA'
        }
    }
}));

const BoardList = props => {
    const { boards } = props;
    const classes = styles();

    useEffect(() => {
        props.fetchBoards();
    }, []);

    const goToBoard = boardId => window.open(`/board/${boardId}`, '_blank');

    return (
        <div>
            {boards &&
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {boards.sort((a, b) => a.index - b.index).map(board =>
                            <TableRow
                                key={board.index.toString()} className={classes.row}
                                onClick={goToBoard.bind(null, board.index)}
                            >
                                <TableCell>{board.index}</TableCell>
                                <TableCell>{board.name}</TableCell>
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
    boards: state.boards
});

const mapDispatchToProps = dispatch => ({
    fetchBoards: () => {
        httpclient.fetch(`/api/board`)
            .then(resp => resp.json())
            .then(boards => dispatch(receiveBoards(boards)));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(BoardList);