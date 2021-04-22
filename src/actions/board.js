export const BoardActions = {
    RECEIVE_BOARDS: 'RECEIVE_BOARDS',
    RECEIVE_BOARD: 'RECEIVE_BOARD',
    RECEIVE_BOARD_ACCESS_LIST: 'RECEIVE_BOARD_ACCESS_LIST'
};

export const receiveBoards = boards => ({
    type: BoardActions.RECEIVE_BOARDS,
    boards: boards
});

export const receiveBoard = board => ({
    type: BoardActions.RECEIVE_BOARD,
    board: board
});

export const receiveBoardAccessList = accessList => ({
    type: BoardActions.RECEIVE_BOARD_ACCESS_LIST,
    accessList: accessList
});