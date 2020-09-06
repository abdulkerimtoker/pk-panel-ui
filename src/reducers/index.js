import {combineReducers} from "redux";
import { playerList } from "./player/list"
import {
    bans,
    boardAccesses,
    boardList, craftingRequests,
    doorKeys,
    doorList,
    factionList, fetchPlayerState,
    inventory,
    itemList,
    player, professionAssignments, professionList,
    troopList
} from "./player";
import {authorities, logFiles, selectedServer, server, serverList} from "./server";
import {
    craftingRecipes,
    craftingStation,
    craftingStationInstances,
    craftingStations,
    items,
    professions
} from "./crafting";

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
    professionList,
    boardAccesses,
    bans,
    craftingRequests,
    professionAssignments,
    fetchPlayerState,
    serverList,
    selectedServer,
    server,
    authorities,
    logFiles,
    craftingStations,
    craftingStation,
    craftingRecipes,
    craftingStationInstances,
    items,
    professions
});