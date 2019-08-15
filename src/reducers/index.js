import {combineReducers} from "redux";
import { playerList } from "./player/list"
import {
    boardAccesses,
    boardList,
    doorKeys,
    doorList,
    factionList,
    inventory,
    itemList,
    player,
    troopList
} from "./player";

export default combineReducers({
    playerList,
    player,
    troopList,
    factionList,
    itemList,
    inventory,
    doorList,
    doorKeys,
    boardList,
    boardAccesses
});