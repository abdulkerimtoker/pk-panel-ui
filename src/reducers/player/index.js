import {PlayerPageActions} from "../../actions/player";

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
        case PlayerPageActions.UPDATE_INVENTORY_SLOT_SUCCESS:
            return Object.assign({}, state, {
                slots: state.slots.map(slot =>
                    slot.slot === action.inventorySlot.slot ? action.inventorySlot : slot
                )
            });
    }
    return state;
};

export const doorKeys = (state = null, action) => {
    switch (action.type) {
        case PlayerPageActions.RECEIVE_PLAYER_DOOR_KEYS:
            return action.doorKeys;
        case PlayerPageActions.SAVE_PLAYER_DOOR_KEY_SUCCESS:
            if (state.filter(doorKey => doorKey.id === action.doorKey.id).length <= 0) {
                return [...state, action.doorKey];
            } else {
                return state.map(doorKey =>
                    doorKey.id === action.doorKey.id ? action.doorKey : doorKey
                );
            }
    }
    return state;
};

export const boardAccesses = (state = null, action) => {
    switch (action.type) {
        case PlayerPageActions.RECEIVE_PLAYER_BOARD_ACCESSES:
            return action.boardAccesses;
        case PlayerPageActions.SAVE_PLAYER_BOARD_ACCESS_SUCCESS:
            if (state.filter(boardAccess => boardAccess.id === action.boardAccess.id).length <= 0) {
                return [...state, action.boardAccess];
            } else {
                return state.map(boardAccess =>
                    boardAccess.id === action.boardAccess.id ? action.boardAccess : boardAccess
                );
            }
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

export const doorList = (state = null, action) => {
    switch (action.type) {
        case PlayerPageActions.RECEIVE_DOOR_LIST:
            return action.doorList;
    }
    return state;
};

export const boardList = (state = null, action) => {
    switch (action.type) {
        case PlayerPageActions.RECEIVE_BOARD_LIST:
            return action.boardList;
    }
    return state;
};

export const professionList = (state = null, action) => {
    switch (action.type) {
        case PlayerPageActions.RECEIVE_PROFESSION_LIST:
            return action.professionList;
    }
    return state;
};