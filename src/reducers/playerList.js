import {PlayerListActions} from "../actions/playerList";

export const playerList = (state = [], action) => {
    switch (action.type) {
        case PlayerListActions.FETCH_PLAYER_LIST:
            return state;
        case PlayerListActions.UPDATE_PLAYER_LIST:
            return action.playerList;
    }
    return state;
};