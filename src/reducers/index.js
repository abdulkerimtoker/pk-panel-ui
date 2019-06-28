import {combineReducers} from "redux";
import { playerList } from "./playerList"
import {player} from "./playerPage";

export default combineReducers({
    playerList,
    player
});