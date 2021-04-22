import altAccounts from "../../components/player/page/altAccounts";

export const PlayerPageActions = {
    FETCH_PLAYER: 'REQUEST_FETCH_PLAYER',
    RECEIVE_PLAYER: 'RESPONSE_FETCH_PLAYER',
    FAIL_FETCH_PLAYER: 'FAIL_FETCH_PLAYER',

    UPDATE_PLAYER: 'REQUEST_UPDATE_PLAYER',
    UPDATE_PLAYER_SUCCESS: 'RESPONSE_PLAYER_UPDATED',
    FAIL_UPDATE_PLAYER: 'FAIL_UPDATE_PLAYER',

    UPDATE_INVENTORY_SLOT: 'REQUEST_UPDATE_INVENTORY_SLOT',
    UPDATE_INVENTORY_SLOT_SUCCESS: 'RESPONSE_UPDATE_INVENTORY_SLOT',
    FAIL_UPDATE_INVENTORY_SLOT: 'FAIL_UPDATE_INVENTORY_SLOT',

    SET_PLAYER: 'SET_PLAYER',

    FETCH_PLAYER_INVENTORY: 'REQUEST_PLAYER_INVENTORY',
    RECEIVE_PLAYER_INVENTORY: 'RESPONSE_PLAYER_INVENTORY',
    FAIL_FETCH_PLAYER_INVENTORY: 'FAIL_FETCH_PLAYER_INVENTORY',

    FETCH_PLAYER_DOOR_KEYS: 'REQUEST_PLAYER_DOOR_KEYS',
    RECEIVE_PLAYER_DOOR_KEYS: 'RESPONSE_PLAYER_DOOR_KEYS',
    FAIL_FETCH_PLAYER_DOOR_KEYS: 'FAIL_FETCH_PLAYER_DOOR_KEYS',

    FETCH_PLAYER_BOARD_ACCESSES: 'REQUEST_PLAYER_BOARD_ACCESSES',
    RECEIVE_PLAYER_BOARD_ACCESSES: 'RESPONSE_PLAYER_BOARD_ACCESSES',
    FAIL_FETCH_PLAYER_BOARD_ACCESSES: 'FAIL_FETCH_PLAYER_BOARD_ACCESSES',

    FETCH_PLAYER_PROFESSION_ASSIGNMENTS: 'REQUEST_PLAYER_PROFESSION_ASSIGNMENTS',
    RECEIVE_PLAYER_PROFESSION_ASSIGNMENTS: 'RESPONSE_PLAYER_PROFESSION_ASSIGNMENTS',
    FAIL_FETCH_PLAYER_PROFESSION_ASSIGNMENTS: 'FAIL_FETCH_PLAYER_PROFESSION_ASSIGNMENTS',

    SAVE_PLAYER_DOOR_KEY: 'REQUEST_SAVE_PLAYER_DOOR_KEY',
    SAVE_PLAYER_DOOR_KEY_SUCCESS: 'RESPONSE_SAVE_PLAYER_DOOR_KEY',
    FAIL_SAVE_PLAYER_DOOR_KEY: 'FAIL_SAVE_PLAYER_DOOR_KEY',
    SUCCESS_REVOKE_PLAYER_DOOR_KEY: 'SUCCESS_REVOKE_PLAYER_DOOR_KEY',

    SAVE_PLAYER_BOARD_ACCESS: 'REQUEST_SAVE_PLAYER_BOARD_ACCESS',
    SAVE_PLAYER_BOARD_ACCESS_SUCCESS: 'RESPONSE_SAVE_PLAYER_BOARD_ACCESS',
    FAIL_SAVE_PLAYER_BOARD_ACCESS: 'FAIL_SAVE_PLAYER_BOARD_ACCESS',

    SAVE_PLAYER_PROFESSION_ASSIGNMENT: 'REQUEST_PLAYER_PROFESSION_ASSIGNMENT',
    SAVE_PLAYER_PROFESSION_ASSIGNMENT_SUCCESS: 'RESPONSE_PLAYER_PROFESSION_ASSIGNMENT',
    FAIL_SAVE_PLAYER_PROFESSION_ASSIGNMENT: 'FAIL_SAVE_PLAYER_PROFESSION_ASSIGNMENT',
    SUCCESS_REVOKE_PLAYER_PROFESSION: 'SUCCESS_REVOKE_PLAYER_PROFESSION',

    FETCH_TROOP_LIST: 'REQUEST_TROOP_LIST',
    RECEIVE_TROOP_LIST: 'RESPONSE_TROOP_LIST',
    FAIL_FETCH_TROOP_LIST: 'FAIL_FETCH_TROOP_LIST',

    FETCH_FACTION_LIST: 'REQUEST_FACTION_LIST',
    RECEIVE_FACTION_LIST: 'RESPONSE_FACTION_LIST',
    FAIL_FETCH_FACTION_LIST: 'FAIL_FETCH_FACTION_LIST',

    FETCH_ITEM_LIST: 'REQUEST_ITEM_LIST',
    RECEIVE_ITEM_LIST: 'RESPONSE_ITEM_LIST',
    FAIL_FETCH_ITEM_LIST: 'FAIL_FETCH_ITEM_LIST',

    FETCH_DOOR_LIST: 'REQUEST_DOOR_LIST',
    RECEIVE_DOOR_LIST: 'RESPONSE_DOOR_LIST',
    FAIL_FETCH_DOOR_LIST: 'FAIL_FETCH_DOOR_LIST',

    FETCH_BOARD_LIST: 'REQUEST_BOARD_LIST',
    RECEIVE_BOARD_LIST: 'RESPONSE_BOARD_LIST',
    FAIL_FETCH_BOARD_LIST: 'FAIL_FETCH_BOARD_LIST',

    FETCH_PROFESSION_LIST: 'REQUEST_PROFESSION_LIST',
    RECEIVE_PROFESSION_LIST: 'RESPONSE_PROFESSION_LIST',
    FAIL_FETCH_PROFESSION_LIST: 'FAIL_FETCH_PROFESSION_LIST',

    FETCH_BANS: 'REQUEST_PLAYER_BANS',
    RECEIVE_BANS: 'RECEIVE_PLAYER_BANS',
    FAIL_FETCH_BANS: 'FAIL_FETCH_BANS',

    FETCH_CRAFTING_REQUESTS: 'REQUEST_PLAYER_CRAFTING_REQUESTS',
    RECEIVE_CRAFTING_REQUESTS: "RECEIVE_PLAYER_CRAFTING_REQUESTS",
    FAIL_FETCH_CRAFTING_REQUESTS: 'FAIL_FETCH_CRAFTING_REQUESTS',

    SUCCESS_BAN: 'RESPONSE_BAN',
    SUCCESS_UNDO_BAN: 'RESPONSE_UNDO_BAN',

    RECEIVE_LANGUAGES: 'REQUEST_LANGUAGES',
    RECEIVE_LANGUAGE_PROFICIENCIES: 'REQUEST_LANGUAGE_PROFICIENCIES',

    RECEIVE_ALT_ACCOUNTS: 'RECEIVE_ALT_ACCOUNTS'
};

export const fetchPlayer = id => ({
    type: PlayerPageActions.FETCH_PLAYER,
    id: id
});

export const receivePlayer = player => ({
    type: PlayerPageActions.RECEIVE_PLAYER,
    player: player
});

export const failFetchPlayer = id => ({
    type: PlayerPageActions.FAIL_FETCH_PLAYER,
    id: id
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

export const fetchPlayerDoorKeys = id => ({
    type: PlayerPageActions.FETCH_PLAYER_DOOR_KEYS,
    id: id
});

export const receivePlayerDoorKeys = doorKeys => ({
    type: PlayerPageActions.RECEIVE_PLAYER_DOOR_KEYS,
    doorKeys: doorKeys
});

export const fetchPlayerBoardAccesses = id => ({
    type: PlayerPageActions.FETCH_PLAYER_BOARD_ACCESSES,
    id: id
});

export const receivePlayerBoardAccesses = boardAccesses => ({
    type: PlayerPageActions.RECEIVE_PLAYER_BOARD_ACCESSES,
    boardAccesses: boardAccesses
});

export const fetchPlayerProfessionAssignments = id => ({
    type: PlayerPageActions.FETCH_PLAYER_PROFESSION_ASSIGNMENTS,
    id: id
});

export const receivePlayerProfessionAssignments = professionAssignments => ({
    type: PlayerPageActions.RECEIVE_PLAYER_PROFESSION_ASSIGNMENTS,
    professionAssignments: professionAssignments
});

export const fetchPlayerBans = uniqueId => ({
    type: PlayerPageActions.FETCH_BANS,
    uniqueId: uniqueId
});

export const receivePlayerBans = bans => ({
    type: PlayerPageActions.RECEIVE_BANS,
    bans: bans
});

export const fetchCraftingRequests = id => ({
    type: PlayerPageActions.FETCH_CRAFTING_REQUESTS,
    id: id
});

export const receiveCraftingRequests = craftingRequests => ({
    type: PlayerPageActions.RECEIVE_CRAFTING_REQUESTS,
    craftingRequests: craftingRequests
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

export const fetchDoorList = () => ({
    type: PlayerPageActions.FETCH_DOOR_LIST
});

export const fetchBoardList = () => ({
    type: PlayerPageActions.FETCH_BOARD_LIST
});

export const fetchProfessionList = () => ({
    type: PlayerPageActions.FETCH_PROFESSION_LIST
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

export const receiveDoorList = doorList => ({
    type: PlayerPageActions.RECEIVE_DOOR_LIST,
    doorList: doorList
});

export const receiveBoardList = boardList => ({
    type: PlayerPageActions.RECEIVE_BOARD_LIST,
    boardList: boardList
});

export const receiveProfessionList = professionList => ({
    type: PlayerPageActions.RECEIVE_PROFESSION_LIST,
    professionList: professionList
});

export const updateInventorySlot = inventorySlot => ({
    type: PlayerPageActions.UPDATE_INVENTORY_SLOT,
    inventorySlot: inventorySlot
});

export const updateInventorySlotSuccess = inventorySlot => ({
    type: PlayerPageActions.UPDATE_INVENTORY_SLOT_SUCCESS,
    inventorySlot: inventorySlot
});

export const savePlayerDoorKey = details => ({
    type: PlayerPageActions.SAVE_PLAYER_DOOR_KEY,
    details: details
});

export const savePlayerDoorKeySuccess = doorKey => ({
    type: PlayerPageActions.SAVE_PLAYER_DOOR_KEY_SUCCESS,
    doorKey: doorKey
});

export const savePlayerBoardAccess = boardAccess => ({
    type: PlayerPageActions.SAVE_PLAYER_BOARD_ACCESS,
    boardAccess: boardAccess
});

export const savePlayerBoardAccessSuccess = boardAccess => ({
    type: PlayerPageActions.SAVE_PLAYER_BOARD_ACCESS_SUCCESS,
    boardAccess: boardAccess
});

export const savePlayerProfessionAssignment = professionAssignment => ({
    type: PlayerPageActions.SAVE_PLAYER_PROFESSION_ASSIGNMENT,
    professionAssignment: professionAssignment
});

export const savePlayerProfessionAssignmentSuccess = professionAssignment => ({
    type: PlayerPageActions.SAVE_PLAYER_PROFESSION_ASSIGNMENT_SUCCESS,
    professionAssignment: professionAssignment
});

export const banPlayerSuccess = ban => ({
    type: PlayerPageActions.SUCCESS_BAN,
    ban: ban
});

export const undoBanSuccess = ban => ({
    type: PlayerPageActions.SUCCESS_UNDO_BAN,
    ban: ban
});

export const revokePlayerDoorKeySuccess = doorKeyId => ({
    type: PlayerPageActions.SUCCESS_REVOKE_PLAYER_DOOR_KEY,
    doorKeyId: doorKeyId
});

export const revokePlayerProfessionSuccess = (playerId, professionId) => ({
    type: PlayerPageActions.SUCCESS_REVOKE_PLAYER_PROFESSION,
    playerId: playerId,
    professionId: professionId
});

export const receiveLanguages = languages => ({
    type: PlayerPageActions.RECEIVE_LANGUAGES,
    languages: languages
});

export const receiveLanguageProficiencies = languageProficiencies => ({
    type: PlayerPageActions.RECEIVE_LANGUAGE_PROFICIENCIES,
    languageProficiencies: languageProficiencies
});

export const receiveAltAccounts = altAccounts => ({
    type: PlayerPageActions.RECEIVE_ALT_ACCOUNTS,
    altAccounts: altAccounts
});