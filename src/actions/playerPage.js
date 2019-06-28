export const PlayerActions = {
    FETCH_PLAYER: 'REQUEST_PLAYER',
    RECEIVE_PLAYER: 'RESPONSE_PLAYER'
};

export const fetchPlayer = id => ({
    type: PlayerActions.FETCH_PLAYER,
    id: id
});

export const receivePlayer = player => ({
    type: PlayerActions.RECEIVE_PLAYER,
    player: player
});