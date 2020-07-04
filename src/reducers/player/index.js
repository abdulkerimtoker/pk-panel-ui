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
            let inventory = action.inventory;
            inventory.slots = inventory.slots.sort((a, b) => {
                if (a.slot > b.slot)
                    return 1;
                else if (a.slot < b.slot)
                    return -1;
                return 0;
            });
            return inventory;
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
            return [...state, action.doorKey];
        case PlayerPageActions.SUCCESS_REVOKE_PLAYER_DOOR_KEY:
            return state.filter(doorKey => doorKey.id !== action.doorKeyId);
    }
    return state;
};

export const boardAccesses = (state = null, action) => {
    switch (action.type) {
        case PlayerPageActions.RECEIVE_PLAYER_BOARD_ACCESSES:
            return action.boardAccesses;
        case PlayerPageActions.SAVE_PLAYER_BOARD_ACCESS_SUCCESS:
            return [...state, action.boardAccess];
    }
    return state;
};

export const professionAssignments = (state = null, action) => {
    switch (action.type) {
        case PlayerPageActions.RECEIVE_PLAYER_PROFESSION_ASSIGNMENTS:
            return action.professionAssignments;
        case PlayerPageActions.SAVE_PLAYER_PROFESSION_ASSIGNMENT_SUCCESS:
            return [...state, action.professionAssignment];
        case PlayerPageActions.SUCCESS_REVOKE_PLAYER_PROFESSION:
            return state.filter(pa => pa.profession.id !== action.professionId);
    }
    return state;
};

export const bans = (state = null, action) => {
    switch (action.type) {
        case PlayerPageActions.RECEIVE_BANS:
            return action.bans;
    }
    return state;
};

export const craftingRequests = (state = null, action) => {
    switch (action.type) {
        case PlayerPageActions.RECEIVE_CRAFTING_REQUESTS:
            return action.craftingRequests;
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

export const FetchPlayerStates = {
    NOT_FETCHED: 1,
    FETCHING: 2,
    FETCHED: 3,
    FAILED: 4
};

export const fetchPlayerState = (state = FetchPlayerStates.NOT_FETCHED, action) => {
    switch (action.type) {
        case PlayerPageActions.FETCH_PLAYER:
            return FetchPlayerStates.FETCHING;
        case PlayerPageActions.RECEIVE_PLAYER:
            return FetchPlayerStates.FETCHED;
        case PlayerPageActions.FAIL_FETCH_PLAYER:
            return FetchPlayerStates.FAILED;
    }
    return state;
};