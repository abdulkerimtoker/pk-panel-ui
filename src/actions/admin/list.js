export const AdminListActions = {
    RECEIVE_ADMIN_LIST: 'RESPONSE_RECEIVE_ADMIN_LIST',
    RECEIVE_INVITATION_CODE: 'RESPONSE_RECEIVE_INVITATION_CODE'
};

export const receiveAdminList = adminList => ({
    type: AdminListActions.RECEIVE_ADMIN_LIST,
    adminList: adminList
});

export const receiveInvitation = invitation => ({
    type: AdminListActions.RECEIVE_INVITATION_CODE,
    invitation: invitation
});