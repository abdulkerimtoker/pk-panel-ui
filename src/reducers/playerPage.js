import {PlayerPageActions} from "../actions/playerPage";

export const player = (state = null, action) => {
    switch (action.type) {
        case PlayerPageActions.RECEIVE_PLAYER:
            return action.player;
        case PlayerPageActions.SET_PLAYER:
            return action.player;
        case PlayerPageActions.UPDATE_PLAYER_SUCCESS:
            return action.player;
    }
    return state;
};

export const inventory = (state = null, action) => {
    switch (action.type) {
        case PlayerPageActions.RECEIVE_PLAYER_INVENTORY:
            return action.inventory;
    }
    return state;
};

export const troopList = (state = null, action) => {
    switch (action.type) {
        case PlayerPageActions.RECEIVE_TROOP_LIST:
            return action.troopList;
    }
    return state;
};

export const factionList = (state = null, action) => {
    switch (action.type) {
        case PlayerPageActions.RECEIVE_FACTION_LIST:
            return action.factionList;
    }
    return state;
};

export const itemList = (state = null, action) => {
    switch (action.type) {
        case PlayerPageActions.RECEIVE_ITEM_LIST:
            return action.itemList;
    }
    return state;
};