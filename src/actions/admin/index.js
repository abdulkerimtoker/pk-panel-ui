export const AdminPageActions = {
    RECEIVE_ADMIN: 'RESPONSE_RECEIVE_ADMIN',
    RECEIVE_RANKS: 'RESPONSE_RECEIVE_RANKS',
    RECEIVE_AUTHORITIES: 'RESPONSE_RECEIVE_AUTHORITIES',
    RECEIVE_ASSIGNED_AUTHORITIES: 'RESPONSE_RECEIVE_ASSIGNED_AUTHORITIES'
};

export const receiveAdmin = admin => ({
    type: AdminPageActions.RECEIVE_ADMIN,
    admin: admin
});

export const receiveRanks = ranks => ({
    type: AdminPageActions.RECEIVE_RANKS,
    ranks: ranks
});

export const receiveAuthorityList = authorityList => ({
    type: AdminPageActions.RECEIVE_AUTHORITIES,
    authorityList: authorityList
});

export const receiveAssignedAuthorities = authorities => ({
    type: AdminPageActions.RECEIVE_ASSIGNED_AUTHORITIES,
    authorities: authorities
});