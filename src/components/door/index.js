import FormControl from "@material-ui/core/FormControl";
import {
    Checkbox,
    Container, FormControlLabel,
    InputLabel,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@material-ui/core";
import Input from "@material-ui/core/Input";
import FormHelperText from "@material-ui/core/FormHelperText";
import Button from "@material-ui/core/Button";
import React, {useEffect, useState} from "react";
import httpclient from "../../utils/httpclient";
import {receiveDoor, receiveDoorKeys} from "../../actions/door";
import {connect} from "react-redux";
import {useParams} from "react-router-dom";

const styles = themes => ({

});

const DoorPage = props => {
    let { fetchedDoor, doorKeys } = props;
    let [door, setDoor] = useState(null);
    let { doorId } = useParams();

    useEffect(() => {
        props.fetchDoor(doorId);
        props.fetchDoorKeys(doorId);
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

    const revokeDoorKey = keyId => props.revokeDoorKey(keyId).then(() => props.fetchDoorKeys(doorId));

    const save = () => props.saveDoor(door).then(() => props.fetchDoor(doorId));

    return (
        door &&
        <div>
            <Container component={Paper}>
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
                <FormControlLabel control={
                                      <Checkbox
                                          checked={door.locked}
                                          onChange={changeLocked}
                                          name="door-locked"
                                          color="primary"
                                      />
                                  }
                                  label="Locked"
                />
                <FormControl margin="dense">
                    <Button onClick={save} color="primary" variant="contained">Save</Button>
                </FormControl>
                <h3>Users of {door.name}</h3>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Key ID</TableCell>
                                <TableCell>User</TableCell>
                                <TableCell>Is Owner</TableCell>
                                <TableCell />
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {doorKeys && doorKeys.map(doorKey =>
                                <TableRow>
                                    <TableCell>{doorKey.id.toString()}</TableCell>
                                    <TableCell>{doorKey.player.name}</TableCell>
                                    <TableCell>{doorKey.isOwner ? 'Owner' : 'User'}</TableCell>
                                    <TableCell>
                                        <Button variant="contained" color="primary"
                                                onClick={revokeDoorKey.bind(null, doorKey.id)}
                                        >
                                            Revoke
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </div>
    );
};

const mapStateToProps = state => ({
    fetchedDoor: state.door,
    doorKeys: state.doorKeys
});

const mapDispatchToProps = dispatch => ({
    fetchDoor: index => {
        httpclient.fetch(`/api/door/${index}`)
            .then(resp => resp.json())
            .then(door => dispatch(receiveDoor(door)));
    },

    fetchDoorKeys: index => {
        httpclient.fetch(`/api/door/${index}/keys`)
            .then(resp => resp.json())
            .then(keys => dispatch(receiveDoorKeys(keys)));
    },

    revokeDoorKey: doorKeyId => {
        return httpclient.fetch(`/api/doorKey/${doorKeyId}`, {method: 'DELETE'});
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
