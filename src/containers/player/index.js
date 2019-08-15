import {
    fetchBoardList,
    fetchDoorList,
    fetchFactionList,
    fetchItemList,
    fetchPlayer, fetchPlayerBoardAccesses,
    fetchPlayerDoorKeys,
    fetchPlayerInventory,
    fetchTroopList, receiveBoardList,
    receiveDoorList,
    receiveFactionList,
    receiveItemList,
    receivePlayer, receivePlayerBoardAccesses,
    receivePlayerDoorKeys,
    receivePlayerInventory,
    receiveTroopList, savePlayerBoardAccess, savePlayerBoardAccessSuccess,
    savePlayerDoorKey,
    savePlayerDoorKeySuccess,
    setPlayer,
    updateInventorySlot,
    updateInventorySlotSuccess,
    updatePlayer,
    updatePlayerSuccess
} from "../../actions/player";
import {connect} from "react-redux";
import {Index} from "../../components/player";
import {message} from "antd";

const mapStateToProps = state => ({
    player: state.player,
    troopList: state.troopList,
    factionList: state.factionList,
    itemList: state.itemList,
    doorList: state.doorList,
    inventory: state.inventory,
    doorKeys: state.doorKeys,
    boardList: state.boardList,
    boardAccesses: state.boardAccesses
});

const mapDispatchToProps = dispatch => ({
    fetchPlayer: id => {
        dispatch(fetchPlayer(id));
        fetch('/api/player/' + id)
            .then(resp => resp.json())
            .then(player => dispatch(receivePlayer(player)));
    },

    setPlayer: player => {
        dispatch(setPlayer(player));
    },

    updatePlayer: player => {
        dispatch(updatePlayer());
        fetch('/api/player', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(player)
        })
            .then(resp => {
                if (resp.status === 200) message.success('Changes were saved successfully');
                else if (resp.status === 409) message.error('A change was made while you were editing this player. Refresh.');
                else message.error('An error occured while trying to save the changes');
                return resp;
            })
            .then(resp => resp.json())
            .then(updatedPlayer => dispatch(updatePlayerSuccess(updatedPlayer)));
    },

    updateInventorySlot: (inventoryId, inventorySlot) => {
        inventorySlot['inventory'] = {id: inventoryId};
        dispatch(updateInventorySlot(inventorySlot));
        fetch('/api/player/inventory/slot', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(inventorySlot)
        })
            .then(resp => {
                if (resp.status === 200) message.success('Slot successfully updated');
                else message.error('An error occured while trying to update the inventory slot');
                return resp.json();
            })
            .then(inventorySlot => dispatch(updateInventorySlotSuccess(inventorySlot)))
            .catch(() => message.error('An error occured while trying to update the inventory slot'));
    },

    saveDoorKey: (playerId, doorKey) => {
        doorKey['player'] = {id: playerId};
        dispatch(savePlayerDoorKey(doorKey));
        fetch('/api/player/doorKey', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(doorKey)
        })
            .then(resp => {
                if (resp.status === 200) message.success('Door key successfully saved');
                else message.error('An error occured while trying to save the door key');
                return resp.json();
            })
            .then(doorKey => dispatch(savePlayerDoorKeySuccess(doorKey)))
            .catch(() => message.error('An error occured while trying to save the door key'));
    },

    saveBoardAccess: (playerId, boardAccess) => {
        boardAccess['player'] = {id: playerId};
        dispatch(savePlayerBoardAccess(boardAccess));
        fetch('/api/player/boardAccess', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(boardAccess)
        })
            .then(resp => {
                if (resp.status === 200) message.success('Board access successfully saved');
                else message.error('An error occured while trying to save the board access');
                return resp.json();
            })
            .then(boardAccess => dispatch(savePlayerBoardAccessSuccess(boardAccess)))
            .catch(() => message.error('An error occured while trying to save the board access'));
    },

    fetchTroopList: () => {
        dispatch(fetchTroopList());
        fetch('/api/troop')
            .then(resp => resp.json())
            .then(troopList => dispatch(receiveTroopList(troopList)));
    },

    fetchFactionList: () => {
        dispatch(fetchFactionList());
        fetch('/api/faction')
            .then(resp => resp.json())
            .then(factionList => dispatch(receiveFactionList(factionList)));
    },

    fetchItemList: () => {
        dispatch(fetchItemList());
        fetch('/api/item')
            .then(resp => resp.json())
            .then(itemList => dispatch(receiveItemList(itemList)));
    },

    fetchDoorList: () => {
        dispatch(fetchDoorList());
        fetch('/api/door')
            .then(resp => resp.json())
            .then(doorList => dispatch(receiveDoorList(doorList)));
    },

    fetchBoardList: () => {
        dispatch(fetchBoardList());
        fetch('/api/board')
            .then(resp => resp.json())
            .then(boardList => dispatch(receiveBoardList(boardList)));
    },

    fetchInventory: (id) => {
        dispatch(fetchPlayerInventory(id));
        fetch('/api/player/' + id + '/inventory')
            .then(resp => resp.json())
            .then(inventory => dispatch(receivePlayerInventory(inventory)));
    },

    fetchDoorKeys: (id) => {
        dispatch(fetchPlayerDoorKeys(id));
        fetch('/api/player/' + id + '/doorKeys')
            .then(resp => resp.json())
            .then(doorKeys => dispatch(receivePlayerDoorKeys(doorKeys)));
    },

    fetchBoardAccesses: (id) => {
        dispatch(fetchPlayerBoardAccesses(id));
        fetch('/api/player/' + id + '/boardAccesses')
            .then(resp => resp.json())
            .then(boardAccesses => dispatch(receivePlayerBoardAccesses(boardAccesses)));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Index);