export const ServerActions = {
    SUCCESS_RECEIVE_SERVER_LIST: 'SUCCESS_RECEIVE_SERVER_LIST',
    SUCCESS_SELECT_SERVER: 'SUCCESS_SELECT_SERVER'
};

export const receiveServerList = serverList => ({
    type: ServerActions.SUCCESS_RECEIVE_SERVER_LIST,
    serverList: serverList
});

export const selectServer = server => ({
    type: ServerActions.SUCCESS_SELECT_SERVER,
    server: server
});