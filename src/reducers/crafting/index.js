import {CraftingActions} from "../../actions/crafting";

export const craftingStations = (state = null, action) => {
    switch (action.type) {
        case CraftingActions.SUCCESS_RECEIVE_CRAFTING_STATIONS:
            return action.craftingStations;
    }
    return state;
};

export const craftingStation = (state = null, action) => {
    switch (action.type) {
        case CraftingActions.SUCCESS_RECEIVE_CRAFTING_STATION:
            return action.craftingStation;
    }
    return state;
};

export const craftingRecipes = (state = null, action) => {
    switch (action.type) {
        case CraftingActions.SUCCESS_RECEIVE_CRAFTING_RECIPES:
            return action.craftingRecipes;
        case CraftingActions.SUCCESS_DELETE_CRAFTING_RECIPE:
            return state.filter(recipe => recipe.id !== action.id);
    }
    return state;
};

export const craftingStationInstances = (state = null, action) => {
    switch (action.type) {
        case CraftingActions.SUCCESS_RECEIVE_CRAFTING_STATION_INSTANCES:
            return action.craftingStationInstances;
        case CraftingActions.SUCCESS_RECEIVE_CRAFTING_STATION_INSTANCE:
            return [...state, action.craftingStationInstance];
    }
    return state;
};

export const items = (state = null, action) => {
    switch (action.type) {
        case CraftingActions.SUCCESS_RECEIVE_ITEM_LIST:
            return action.items;
    }
    return state;
}

export const professions = (state = null, action) => {
    switch (action.type) {
        case CraftingActions.SUCCESS_RECEIVE_PROFESSION_LIST:
            return action.professions;
    }
    return state;
}