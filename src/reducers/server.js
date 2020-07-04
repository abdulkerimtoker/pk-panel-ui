import {ServerActions} from "../actions/server";

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