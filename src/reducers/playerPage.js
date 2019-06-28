import {PlayerPageActions} from "../actions/playerPage";

export const player = (state = null, action) => {
    switch (action.type) {
        case PlayerPageActions.FETCH_PLAYER:
            return state;
        case PlayerPageActions.RECEIVE_PLAYER:
            return action.player;
    }
    return state;
};

export const troopList = (state = [], action) => {
    switch (action.type) {
        case PlayerPageActions.FETCH_TROOP_LIST:
            return state;
        case PlayerPageActions.RECEIVE_TROOP_LIST:
            return action.troopList;
    }
    return state;
};