import {combineReducers} from "redux";
import { playerList } from "./playerList"
import {player, troopList} from "./playerPage";

export default combineReducers({
    playerList,
    player,
    troopList
});