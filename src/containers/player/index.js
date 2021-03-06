import {
    banPlayerSuccess,
    failFetchPlayer,
    fetchBoardList,
    fetchCraftingRequests,
    fetchDoorList,
    fetchFactionList,
    fetchItemList,
    fetchPlayer,
    fetchPlayerBoardAccesses,
    fetchPlayerDoorKeys,
    fetchPlayerInventory,
    fetchPlayerProfessionAssignments,
    fetchProfessionList,
    fetchTroopList,
    receiveBoardList,
    receiveCraftingRequests,
    receiveDoorList,
    receiveFactionList,
    receiveItemList,
    receiveLanguageProficiencies,
    receiveLanguages,
    receivePlayer,
    receivePlayerBans,
    receivePlayerBoardAccesses,
    receivePlayerDoorKeys,
    receivePlayerInventory,
    receivePlayerProfessionAssignments,
    receiveProfessionList,
    receiveTroopList,
    revokePlayerDoorKeySuccess,
    revokePlayerProfessionSuccess,
    savePlayerBoardAccess,
    savePlayerBoardAccessSuccess,
    savePlayerDoorKey,
    savePlayerDoorKeySuccess,
    savePlayerProfessionAssignment,
    savePlayerProfessionAssignmentSuccess,
    setPlayer,
    undoBanSuccess,
    updateInventorySlot,
    updateInventorySlotSuccess,
    updatePlayer,
    updatePlayerSuccess
} from "../../actions/player";
import {connect} from "react-redux";
import Player from "../../components/player/page/player";
import {craftingRequests, languageProficiencies, languages} from "../../reducers/player";
import httpclient from "../../utils/httpclient";

const mapStateToProps = state => ({
    player: state.player,
    troopList: state.troopList,
    factionList: state.factionList,
    itemList: state.itemList,
    doorList: state.doorList,
    inventory: state.inventory,
    doorKeys: state.playerDoorKeys,
    boardList: state.boardList,
    professionList: state.professionList,
    boardAccesses: state.boardAccesses,
    professionAssignments: state.professionAssignments,
    bans: state.bans,
    craftingRequests: state.craftingRequests,
    fetchPlayerState: state.fetchPlayerState,
    languages: state.languages,
    languageProficiencies: state.languageProficiencies
});

const mapDispatchToProps = dispatch => ({
    fetchPlayer: id => {
        dispatch(fetchPlayer(id));
        httpclient.fetch('/api/player/' + id)
            .then(resp => resp.json())
            .then(player => dispatch(receivePlayer(player)))
            .catch(reason => dispatch(failFetchPlayer(id)));
    },

    setPlayer: player => {
        dispatch(setPlayer(player));
    },

    updatePlayer: player => {
        dispatch(updatePlayer());
        httpclient.fetch('/api/player', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(player)
        }).then(resp => {
                if (resp.status === 200) alert('Changes were saved successfully');
                else if (resp.status === 409) alert('A change was made while you were editing this player. Refresh.');
                else alert('An error occured while trying to save the changes');
                return resp;
            })
            .then(resp => resp.json())
            .then(updatedPlayer => dispatch(updatePlayerSuccess(updatedPlayer)));
    },

    updateInventorySlot: (inventoryId, inventorySlot) => {
        dispatch(updateInventorySlot(inventorySlot));
        httpclient.fetch(`/api/inventory/${inventoryId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(inventorySlot)
        })
            .then(resp => {
                if (resp.status === 200) alert('Slot successfully updated');
                else alert('An error occured while trying to update the inventory slot');
                return resp.json();
            })
            .then(inventorySlot => dispatch(updateInventorySlotSuccess(inventorySlot)))
            .catch(() => alert('An error occured while trying to update the inventory slot'));
    },

    saveDoorKey: (doorKey) => {
        dispatch(savePlayerDoorKey(doorKey));
        httpclient.fetch('/api/player/doorKey', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(doorKey)
        })
            .then(resp => {
                if (resp.status === 200) {
                    alert('Door key successfully saved');
                    return resp.json();
                }
                throw 1;
            })
            .then(doorKey => dispatch(savePlayerDoorKeySuccess(doorKey)))
            .catch(() => alert('An error occured while trying to save the door key'));
    },

    revokeDoorKey: doorKeyId => {
        httpclient.fetch('/api/doorKey/' + doorKeyId, {
            method: 'DELETE'
        })
            .then(resp => {
                if (resp.status === 200) {
                    alert('Door key was successfully revoked');
                    dispatch(revokePlayerDoorKeySuccess(doorKeyId));
                }
                else {
                    alert('An error occured while trying to revoke the door key');
                }
            })
            .catch(() => alert('An error occured while trying to revoke the door key'));
    },

    saveBoardAccess: (boardAccess) => {
        dispatch(savePlayerBoardAccess(boardAccess));
        httpclient.fetch('/api/player/boardAccess', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(boardAccess)
        })
            .then(resp => {
                if (resp.status === 200) alert('Board access successfully saved');
                else alert('An error occured while trying to save the board access');
                return resp.json();
            })
            .then(boardAccess => dispatch(savePlayerBoardAccessSuccess(boardAccess)))
            .catch(() => alert('An error occured while trying to save the board access'));
    },

    saveProfessionAssignment: (professionAssignment) => {
        dispatch(savePlayerProfessionAssignment(professionAssignment));
        httpclient.fetch('/api/player/professionAssignment', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(professionAssignment)
        })
            .then(resp => {
                if (resp.status === 200) alert('Profession assignment successfully saved');
                else alert('An error occured while trying to save the profession assignment');
                return resp.json();
            })
            .then(professionAssignment => dispatch(savePlayerProfessionAssignmentSuccess(professionAssignment)))
            .catch(() => alert('An error occured while trying to save the profession assignment'));
    },

    revokeProfession: (playerId, professionId) => {
        httpclient.fetch(`/api/player/${playerId}/profession/${professionId}`, {
            method: 'DELETE'
        })
            .then(resp => {
                if (resp.status === 200) {
                    alert('Profession was successfully revoked');
                    dispatch(revokePlayerProfessionSuccess(playerId, professionId));
                }
                else {
                    alert('An error occured while trying to revoke profession');
                }
            })
            .catch(() => alert('An error occured while trying to revoke profession'));
    },

    ban: ban => {
        httpclient.fetch('/api/bans', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(ban)
        })
            .then(resp => resp.json())
            .then(ban => dispatch(banPlayerSuccess(ban)))
            .catch(() => alert('An error occured while trying to ban the player'));
    },

    undoBan: banId => {
        httpclient.fetch(`/api/bans/${banId}/undo`, {
            method: 'PUT'
        })
            .then(resp => resp.json())
            .then(ban => dispatch(undoBanSuccess(ban)));
    },

    fetchTroopList: () => {
        dispatch(fetchTroopList());
        httpclient.fetch('/api/troop')
            .then(resp => resp.json())
            .then(troopList => dispatch(receiveTroopList(troopList)));
    },

    fetchFactionList: () => {
        dispatch(fetchFactionList());
        httpclient.fetch('/api/faction')
            .then(resp => resp.json())
            .then(factionList => dispatch(receiveFactionList(factionList)));
    },

    fetchItemList: () => {
        dispatch(fetchItemList());
        httpclient.fetch('/api/item')
            .then(resp => resp.json())
            .then(itemList => dispatch(receiveItemList(itemList)));
    },

    fetchDoorList: () => {
        dispatch(fetchDoorList());
        httpclient.fetch('/api/door')
            .then(resp => resp.json())
            .then(doorList => dispatch(receiveDoorList(doorList)));
    },

    fetchBoardList: () => {
        dispatch(fetchBoardList());
        httpclient.fetch('/api/board')
            .then(resp => resp.json())
            .then(boardList => dispatch(receiveBoardList(boardList)));
    },

    fetchProfessionList: () => {
        dispatch(fetchProfessionList());
        httpclient.fetch('/api/profession')
            .then(resp => resp.json())
            .then(professionList => dispatch(receiveProfessionList(professionList)))
            .catch(ex => console.log(ex));
    },

    fetchInventory: (id) => {
        dispatch(fetchPlayerInventory(id));
        httpclient.fetch('/api/player/' + id + '/inventory')
            .then(resp => resp.json())
            .then(inventory => dispatch(receivePlayerInventory(inventory)))
            .catch(ex => console.log(ex));
    },

    fetchDoorKeys: (id) => {
        dispatch(fetchPlayerDoorKeys(id));
        httpclient.fetch('/api/player/' + id + '/doorKeys')
            .then(resp => resp.json())
            .then(doorKeys => dispatch(receivePlayerDoorKeys(doorKeys)));
    },

    fetchBoardAccesses: (id) => {
        dispatch(fetchPlayerBoardAccesses(id));
        httpclient.fetch('/api/player/' + id + '/boardAccesses')
            .then(resp => resp.json())
            .then(boardAccesses => dispatch(receivePlayerBoardAccesses(boardAccesses)));
    },

    fetchProfessionAssignments: (id) => {
        dispatch(fetchPlayerProfessionAssignments(id));
        httpclient.fetch('/api/player/' + id + '/professionAssignments')
            .then(resp => resp.json())
            .then(professionAssignments => {
                dispatch(receivePlayerProfessionAssignments(professionAssignments));
            });
    },

    fetchBans: (playerId) => {
        httpclient.fetch(`/api/players/${playerId}/bans`)
            .then(resp => resp.json())
            .then(bans => dispatch(receivePlayerBans(bans)));
    },

    fetchCraftingRequests: (id) => {
        dispatch(fetchCraftingRequests(id));
        httpclient.fetch('/api/player/' + id + '/craftingRequests')
            .then(resp => resp.json())
            .then(craftingRequests => dispatch(receiveCraftingRequests(craftingRequests)));
    },

    fetchLanguages: () => {
        httpclient.fetch('/api/languages')
            .then(resp => resp.json())
            .then(languages => dispatch(receiveLanguages(languages)));
        console.log('fetchlang');
    },

    fetchLanguageProficiencies: playerId => {
        httpclient.fetch(`/api/player/${playerId}/languageProficiencies`)
            .then(resp => resp.json())
            .then(languageProficiencies => dispatch(receiveLanguageProficiencies(languageProficiencies)));
        console.log('fetchlangppp');
    },

    assignLanguageProficiency: (playerId, languageId) => {
        httpclient.fetch(`/api/player/${playerId}/languageProficiencies/${languageId}`, {method: 'POST'})
            .then(resp => resp.json())
            .then(languageProficiencies => dispatch(receiveLanguageProficiencies(languageProficiencies)));
    },

    revokeLanguageProficiency: (playerId, languageId) => {
        httpclient.fetch(`/api/player/${playerId}/languageProficiencies/${languageId}`, {method: 'DELETE'})
            .then(resp => resp.json())
            .then(languageProficiencies => dispatch(receiveLanguageProficiencies(languageProficiencies)));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Player);
