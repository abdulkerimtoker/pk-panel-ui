import {AdminListActions} from "../../actions/admin/list";

export const adminList = (state = null, action) => {
    switch (action.type) {
        case AdminListActions.RECEIVE_ADMIN_LIST:
            return action.adminList;
    }
    return state;
};

export const invitation = (state = null, action) => {
    switch (action.type) {
        case AdminListActions.RECEIVE_INVITATION_CODE:
            return action.invitation;
    }
    return state;
};