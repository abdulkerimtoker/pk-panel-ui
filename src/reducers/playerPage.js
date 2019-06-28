import {PlayerActions} from "../actions/playerPage";

export const player = (state = null, action) => {
    switch (action.type) {
        case PlayerActions.FETCH_PLAYER:
            return state;
        case PlayerActions.RECEIVE_PLAYER:
            return action.player;
    }
    return state;
};