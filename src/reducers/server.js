import {ServerActions} from "../actions/server";
import {act} from "react-dom/test-utils";

export const server = (state = null, action) => {
    switch (action.type) {
        case ServerActions.SUCCESS_RECEIVE_SERVER:
            return action.server;
    }
    return state;
};

export const serverList = (state = null, action) => {
    switch (action.type) {
        case ServerActions.SUCCESS_RECEIVE_SERVER_LIST:
            return action.serverList;
    }
    return state;
};

export const selectedServer = (state = null, action) => {
    switch (action.type) {
        case ServerActions.SUCCESS_SELECT_SERVER:
            return action.server;
    }
    return state;
};

export const authorities = (state = [], action) => {
    switch (action.type) {
        case ServerActions.SUCCESS_RECEIVE_AUTHORITIES:
            return action.authorities;
    }
    return state;
};

export const logFiles = (state = null, action) => {
    switch (action.type) {
        case ServerActions.SUCCESS_RECEIVE_LOG_FILES:
            return action.logFiles;
    }
    return state;
};

export const startupCommands = (state = null, action) => {
    switch (action.type) {
        case ServerActions.SUCCESS_RECEIVE_STARTUP_COMMANDS:
            return action.startupCommands;
        default:
            return state;
    }
};