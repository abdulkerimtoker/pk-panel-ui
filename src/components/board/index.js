import FormControl from "@material-ui/core/FormControl";
import {Container, InputLabel} from "@material-ui/core";
import Input from "@material-ui/core/Input";
import FormHelperText from "@material-ui/core/FormHelperText";
import Button from "@material-ui/core/Button";
import React, {useEffect, useState} from "react";
import httpclient from "../../utils/httpclient";
import {connect} from "react-redux";
import {useParams} from "react-router-dom";
import {receiveBoard} from "../../actions/board"

const styles = themes => ({

});

const BoardPage = props => {
    let { fetchedBoard } = props;
    let [board, setBoard] = useState(null);
    let { boardId } = useParams();

    useEffect(() => {
        props.fetchBoard(boardId);
    }, [boardId]);

    useEffect(() => {
        setBoard(fetchedBoard);
    }, [fetchedBoard]);

    const changeName = event => setBoard(
        Object.assign({}, board, {name: event.target.value})
    );

    const save = () => props.saveBoard(board).then(() => props.fetchBoard(boardId));

    return (
        board &&
        <Container>
            <h2>{board.name}</h2>
            <FormControl fullWidth margin="dense">
                <InputLabel htmlFor="board-name">Name</InputLabel>
                <Input
                    id="board-name"
                    type="text"
                    name="name"
                    value={board.name}
                    onChange={changeName}
                />
                <FormHelperText>We'll never share your email.</FormHelperText>
            </FormControl>
            <FormControl margin="dense">
                <Button
                    onClick={save}
                    color="primary" variant="contained">Save</Button>
            </FormControl>
        </Container>
    );
};

const mapStateToProps = state => ({
    fetchedBoard: state.board
});

const mapDispatchToProps = dispatch => ({
    fetchBoard: boardId => {
        httpclient.fetch(`/api/board/${boardId}`)
            .then(resp => resp.json())
            .then(door => dispatch(receiveBoard(door)));
    },

    saveBoard: board => {
        return httpclient.fetch(`/api/board/${board.index}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(board)
        });
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(BoardPage);
