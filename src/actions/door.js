export const DoorActions = {
    RECEIVE_DOORS: 'RECEIVE_DOORS',
    RECEIVE_DOOR: 'RECEIVE_DOOR',
    RECEIVE_DOOR_KEYS: 'RECEIVE_DOOR_KEYS'
};

export const receiveDoors = doors => ({
    type: DoorActions.RECEIVE_DOORS,
    doors: doors
});

export const receiveDoor = door => ({
    type: DoorActions.RECEIVE_DOOR,
    door: door
});

export const receiveDoorKeys = doorKeys => ({
    type: DoorActions.RECEIVE_DOOR_KEYS,
    doorKeys: doorKeys
});