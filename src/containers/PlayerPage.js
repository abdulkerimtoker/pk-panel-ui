import {
    fetchFactionList, fetchItemList,
    fetchPlayer, fetchPlayerDoorKeys, fetchPlayerInventory,
    fetchTroopList, receiveDoorList, receiveFactionList, receiveItemList,
    receivePlayer, receivePlayerDoorKeys, receivePlayerInventory,
    receiveTroopList, setPlayer, updateInventorySlot, updateInventorySlotSuccess,
    updatePlayer,
    updatePlayerSuccess
} from "../actions/playerPage";
import {connect} from "react-redux";
import {PlayerPage} from "../components/PlayerPage";
import {message} from "antd";

const mapStateToProps = state => ({
    player: state.player,
    troopList: state.troopList,
    factionList: state.factionList,
    itemList: state.itemList,
    doorList: state.doorList,
    inventory: state.inventory,
    doorKeys: state.doorKeys
});

const mapDispatchToProps = dispatch => ({
    fetchPlayer: id => {
        dispatch(fetchPlayer(id));
        fetch('/api/player/' + id)
            .then(resp => resp.json())
            .then(player => dispatch(receivePlayer(player)));
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
            .then(updatedPlayer => updatePlayerSuccess(updatedPlayer));
    },

    updateInventorySlot: (inventoryId, inventorySlot) => {
        inventorySlot['inventory'] = {id: inventoryId};
        dispatch(updateInventorySlot(inventorySlot));
        fetch('/api/player/inventory/' + inventoryId + '/slot', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(inventorySlot)
        })
            .then(resp => {
                if (resp.status === 200) message.success('Slot successfully updated');
                else message.error('An error occured while trying to update the inventory slot');
            })
            .catch(() => message.error('An error occured while trying to update the inventory slot'));
    },

    setPlayer: player => {
        dispatch(setPlayer(player));
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
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PlayerPage);