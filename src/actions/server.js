export const ServerActions = {
    SUCCESS_RECEIVE_SERVER: 'SUCCESS_RECEIVE_SERVER',
    SUCCESS_RECEIVE_SERVER_LIST: 'SUCCESS_RECEIVE_SERVER_LIST',
    SUCCESS_SELECT_SERVER: 'SUCCESS_SELECT_SERVER',
    SUCCESS_RECEIVE_AUTHORITIES: 'SUCCESS_RECEIVE_AUTHORITIES',

    SUCCESS_RECEIVE_LOG_FILES: 'SUCCESS_RECEIVE_LOG_FILES'
};

export const receiveServer = server => ({
    type: ServerActions.SUCCESS_RECEIVE_SERVER,
    server: server
});

export const receiveServerList = serverList => ({
    type: ServerActions.SUCCESS_RECEIVE_SERVER_LIST,
    serverList: serverList
});

export const selectServer = server => ({
    type: ServerActions.SUCCESS_SELECT_SERVER,
    server: server
});

export const receiveAuthorities = authorities => ({
    type: ServerActions.SUCCESS_RECEIVE_AUTHORITIES,
    authorities: authorities
});

export const receiveLogFiles = logFiles => ({
    type: ServerActions.SUCCESS_RECEIVE_LOG_FILES,
    logFiles: logFiles
});