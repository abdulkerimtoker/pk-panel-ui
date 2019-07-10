export const PlayerPageActions = {
    FETCH_PLAYER: 'REQUEST_PLAYER',
    RECEIVE_PLAYER: 'RESPONSE_PLAYER',
    UPDATE_PLAYER: 'REQUEST_UPDATE_PLAYER',
    UPDATE_PLAYER_SUCCESS: 'RESPONSE_PLAYER_UPDATED',
    UPDATE_INVENTORY_SLOT: 'REQUEST_UPDATE_INVENTORY_SLOT',
    UPDATE_INVENTORY_SLOT_SUCCESS: 'RESPONSE_UPDATE_INVENTORY_SLOT',

    SET_PLAYER: 'SET_PLAYER',

    FETCH_PLAYER_INVENTORY: 'REQUEST_PLAYER_INVENTORY',
    RECEIVE_PLAYER_INVENTORY: 'RESPONSE_PLAYER_INVENTORY',

    FETCH_TROOP_LIST: 'REQUEST_TROOP_LIST',
    RECEIVE_TROOP_LIST: 'RESPONSE_TROOP_LIST',

    FETCH_FACTION_LIST: 'REQUEST_FACTION_LIST',
    RECEIVE_FACTION_LIST: 'RESPONSE_FACTION_LIST',

    FETCH_ITEM_LIST: 'REQUEST_ITEM_LIST',
    RECEIVE_ITEM_LIST: 'RESPONSE_ITEM_LIST'
};

export const fetchPlayer = id => ({
    type: PlayerPageActions.FETCH_PLAYER,
    id: id
});

export const receivePlayer = player => ({
    type: PlayerPageActions.RECEIVE_PLAYER,
    player: player
});

export const updatePlayer = () => ({
    type: PlayerPageActions.UPDATE_PLAYER,
});

export const updatePlayerSuccess = player => ({
    type: PlayerPageActions.UPDATE_PLAYER_SUCCESS,
    player: player
});

export const setPlayer = player => ({
    type: PlayerPageActions.SET_PLAYER,
    player: player
});

export const fetchPlayerInventory = id => ({
    type: PlayerPageActions.FETCH_PLAYER_INVENTORY,
    id: id
});

export const receivePlayerInventory = inventory => ({
    type: PlayerPageActions.RECEIVE_PLAYER_INVENTORY,
    inventory: inventory
});

export const fetchTroopList = () => ({
    type: PlayerPageActions.FETCH_TROOP_LIST
});

export const fetchFactionList = () => ({
    type: PlayerPageActions.FETCH_FACTION_LIST
});

export const fetchItemList = () => ({
    type: PlayerPageActions.FETCH_ITEM_LIST
});

export const receiveTroopList = troopList => ({
    type: PlayerPageActions.RECEIVE_TROOP_LIST,
    troopList: troopList
});

export const receiveFactionList = factionList => ({
    type: PlayerPageActions.RECEIVE_FACTION_LIST,
    factionList: factionList
});

export const receiveItemList = itemList => ({
    type: PlayerPageActions.RECEIVE_ITEM_LIST,
    itemList: itemList
});

export const updateInventorySlot = inventorySlot => ({
    type: PlayerPageActions.UPDATE_INVENTORY_SLOT,
    inventorySlot: inventorySlot
});

export const updateInventorySlotSuccess = inventorySlot => ({
    type: PlayerPageActions.UPDATE_INVENTORY_SLOT_SUCCESS,
    inventorySlot: inventorySlot
});