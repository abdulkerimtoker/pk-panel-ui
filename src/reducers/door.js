import {DoorActions} from "../actions/door";

export const doors = (state = null, action) => {
    switch (action.type) {
        case DoorActions.RECEIVE_DOORS:
            return action.doors;
        default:
            return state;
    }
};

export const door = (state = null, action) => {
    switch (action.type) {
        case DoorActions.RECEIVE_DOOR:
            return action.door;
        default:
            return state;
    }
};

export const doorKeys = (state = null, action) => {
    switch (action.type) {
        case DoorActions.RECEIVE_DOOR_KEYS:
            return action.doorKeys;
        default:
            return state;
    }
};