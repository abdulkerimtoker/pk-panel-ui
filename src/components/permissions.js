import httpclient from "../utils/httpclient";
import {receiveAdminPermissions, receiveAllAdminPermissions} from "../actions/permissions";
import {useEffect, useState} from "react";
import {connect} from "react-redux";
import {
    Button,
    Checkbox, Container,
    FormControlLabel,
    FormGroup, Input, Paper, TextField
} from "@material-ui/core";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Accordion from "@material-ui/core/Accordion";
import * as React from "react";


const PermissionsList = props => {
    let { permissionsList } = props;
    let [guid, setGuid] = useState('');

    useEffect(() => {
        props.fetchPermissionsList();
    }, []);

    let handleTogglePermission = (uniqueId, key) => {
        let found = permissionsList.find(p => p.uniqueId === uniqueId);
        if (found) {
            found[key] = !found[key];
            props.setPermissions(found);
        }
    };

    let handleChangeGuid = event => setGuid(event.target.value);

    let handleInsert = () =>
        props.setPermissions({uniqueId: guid})
        .then(() => props.fetchPermissionsList());

    let handleRevokePermission = uniqueId => props.revokePermissions(uniqueId).then(() => props.fetchPermissionsList());

    return (
        <div>
            {permissionsList && permissionsList.sort((a, b) => a.uniqueId - b.uniqueId).map(perms =>
                <Accordion key={perms.uniqueId.toString()}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>{perms.uniqueId}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <FormGroup row>
                            {Object.keys(perms).filter(k => !['serverId', 'uniqueId'].includes(k)).map(permsKey =>
                                <FormControlLabel key={permsKey}
                                    control={
                                        <Checkbox
                                            checked={perms[permsKey]}
                                            onChange={handleTogglePermission.bind(null, perms.uniqueId, permsKey)}
                                            name={permsKey}
                                            color="primary"
                                        />
                                    }
                                    label={permsKey}
                                />
                            )}
                            <Button variant="contained" color="primary" onClick={handleRevokePermission.bind(null, perms.uniqueId)}>
                                Revoke
                            </Button>
                        </FormGroup>
                    </AccordionDetails>
                </Accordion>
            )}

            <Container component={Paper}>
                <Input type="number" placeholder="GUID" value={guid} onChange={handleChangeGuid} />
                <Button variant="contained" color="primary" onClick={handleInsert}>
                    Insert
                </Button>
            </Container>
        </div>
    );
};

const mapStateToProps = state => ({
    permissionsList: state.permissionsList
});

const mapDispatchToProps = dispatch => ({
    fetchPermissionsList: () => {
        httpclient.fetch('/api/admin/ig-permissions')
            .then(resp => resp.json())
            .then(permissionsList => dispatch(receiveAllAdminPermissions(permissionsList)));
    },

    setPermissions: permissions => {
        return httpclient.fetch(`/api/admin/ig-permissions/${permissions.uniqueId}`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(permissions)
        }).then(resp => resp.json())
            .then(permissions => dispatch(receiveAdminPermissions(permissions)));
    },

    revokePermissions: uniqueId => {
        return httpclient.fetch(`/api/admin/ig-permissions/${uniqueId}`, {method: 'DELETE'});
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(PermissionsList);