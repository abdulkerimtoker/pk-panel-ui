import {BoardActions} from "../actions/board";

export const boards = (state = null, action) => {
    switch (action.type) {
        case BoardActions.RECEIVE_BOARDS:
            return action.boards;
        default:
            return state;
    }
};

export const board = (state = null, action) => {
    switch (action.type) {
        case BoardActions.RECEIVE_BOARD:
            return action.board;
        default:
            return state;
    }
};

export const boardAccessList = (state = null, action) => {
    switch (action.type) {
        case BoardActions.RECEIVE_BOARD_ACCESS_LIST:
            return action.accessList;
        default:
            return state;
    }
};