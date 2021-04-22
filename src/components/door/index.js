import FormControl from "@material-ui/core/FormControl";
import {Container, InputLabel} from "@material-ui/core";
import Input from "@material-ui/core/Input";
import FormHelperText from "@material-ui/core/FormHelperText";
import Button from "@material-ui/core/Button";
import React, {useEffect, useState} from "react";
import httpclient from "../../utils/httpclient";
import {receiveDoor} from "../../actions/door";
import {connect} from "react-redux";
import {useParams} from "react-router-dom";

const styles = themes => ({

});

const DoorPage = props => {
    let { fetchedDoor } = props;
    let [door, setDoor] = useState(null);
    let { doorId } = useParams();

    useEffect(() => {
        props.fetchDoor(doorId);
    }, [doorId]);

    useEffect(() => {
        setDoor(fetchedDoor);
    }, [fetchedDoor]);

    const changeName = event => setDoor(
        Object.assign({}, door, {name: event.target.value})
    );

    const changeLocked = () => setDoor(
        Object.assign({}, door, {locked: !door.locked})
    );

    const save = () => props.saveDoor(door).then(() => props.fetchDoor(doorId));

    return (
        door &&
        <Container>
            <h2>{door.name}</h2>
            <FormControl fullWidth margin="dense">
                <InputLabel htmlFor="door-name">Name</InputLabel>
                <Input
                    id="door-name"
                    type="text"
                    name="name"
                    value={door.name}
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
    fetchedDoor: state.door
});

const mapDispatchToProps = dispatch => ({
    fetchDoor: doorId => {
        httpclient.fetch(`/api/door/${doorId}`)
            .then(resp => resp.json())
            .then(door => dispatch(receiveDoor(door)));
    },

    saveDoor: door => {
        return httpclient.fetch(`/api/door/${door.index}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(door)
        });
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(DoorPage);
