import {combineReducers} from "redux";
import { playerList } from "./playerList"
import {factionList, inventory, itemList, player, troopList} from "./playerPage";

export default combineReducers({
    playerList,
    player,
    troopList,
    factionList,
    itemList,
    inventory
});