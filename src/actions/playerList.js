export const PlayerListActions = {
    FETCH_PLAYER_LIST: 'REQUEST_PLAYER_LIST',
    UPDATE_PLAYER_LIST: 'RESPONSE_PLAYER_LIST'
};

export const fetchPlayerList = filterData => ({
    type: PlayerListActions.FETCH_PLAYER_LIST,
    filterData: filterData
});

export const updatePlayerList = playerList => ({
    type: PlayerListActions.UPDATE_PLAYER_LIST,
    playerList: playerList
});