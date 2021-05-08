import {PermissionsActions} from "../actions/permissions";

export const permissionsList = (state = null, action) => {
    switch (action.type) {
        case PermissionsActions.RECEIVE_ALL_ADMIN_PERMISSIONS:
            return action.permissionsList;
        case PermissionsActions.RECEIVE_ADMIN_PERMISSIONS:
            return state.map(p => p.uniqueId === action.permissions.uniqueId ? action.permissions : p);
        default:
            return state;
    }
};