export const PermissionsActions = {
    RECEIVE_ALL_ADMIN_PERMISSIONS: 'RECEIVE_ALL_ADMIN_PERMISSIONS',
    RECEIVE_ADMIN_PERMISSIONS: 'RECEIVE_ADMIN_PERMISSIONS'
};

export const receiveAllAdminPermissions = permissionsList => ({
    type: PermissionsActions.RECEIVE_ALL_ADMIN_PERMISSIONS,
    permissionsList: permissionsList
});

export const receiveAdminPermissions = permissions => ({
    type: PermissionsActions.RECEIVE_ADMIN_PERMISSIONS,
    permissions: permissions
});