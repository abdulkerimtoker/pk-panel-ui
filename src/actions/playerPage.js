export const PlayerPageActions = {
    FETCH_PLAYER: 'REQUEST_PLAYER',
    RECEIVE_PLAYER: 'RESPONSE_PLAYER',
    FETCH_TROOP_LIST: 'REQUEST_TROOP_LIST',
    RECEIVE_TROOP_LIST: 'RESPONSE_TROOP_LIST'
};

export const fetchPlayer = id => ({
    type: PlayerPageActions.FETCH_PLAYER,
    id: id
});

export const receivePlayer = player => ({
    type: PlayerPageActions.RECEIVE_PLAYER,
    player: player
});

export const fetchTroopList = () => ({
    type: PlayerPageActions.FETCH_TROOP_LIST
});

export const receiveTroopList = troopList => ({
    type: PlayerPageActions.RECEIVE_TROOP_LIST,
    troopList: troopList
});