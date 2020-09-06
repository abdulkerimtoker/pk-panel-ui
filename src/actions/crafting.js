export const CraftingActions = {
    SUCCESS_RECEIVE_CRAFTING_STATIONS: 'SUCCESS_RECEIVE_CRAFTING_STATIONS',
    SUCCESS_RECEIVE_CRAFTING_STATION: 'SUCCESS_RECEIVE_CRAFTING_STATION',
    SUCCESS_RECEIVE_CRAFTING_RECIPES: 'SUCCESS_RECEIVE_CRAFTING_RECIPES',
    SUCCESS_RECEIVE_CRAFTING_STATION_INSTANCES: 'SUCCESS_RECEIVE_CRAFTING_STATION_INSTANCES',
    SUCCESS_RECEIVE_CRAFTING_STATION_INSTANCE: 'SUCCESS_RECEIVE_CRAFTING_STATION_INSTANCE',
    SUCCESS_RECEIVE_ITEM_LIST: 'SUCCESS_RECEIVE_ITEM_LIST',
    SUCCESS_RECEIVE_PROFESSION_LIST: 'SUCCESS_RECEIVE_PROFESSION_LIST',
    SUCCESS_DELETE_CRAFTING_RECIPE: 'SUCCESS_DELETE_CRAFTING_RECIPE'
};

export const receiveCraftingStations = craftingStations => ({
    type: CraftingActions.SUCCESS_RECEIVE_CRAFTING_STATIONS,
    craftingStations: craftingStations
});

export const receiveCraftingStation = craftingStation => ({
    type: CraftingActions.SUCCESS_RECEIVE_CRAFTING_STATION,
    craftingStation: craftingStation
});

export const receiveCraftingRecipes = craftingRecipes => ({
    type: CraftingActions.SUCCESS_RECEIVE_CRAFTING_RECIPES,
    craftingRecipes: craftingRecipes
});

export const receiveCraftingStationInstances = craftingStationInstances => ({
    type: CraftingActions.SUCCESS_RECEIVE_CRAFTING_STATION_INSTANCES,
    craftingStationInstances: craftingStationInstances
});

export const receiveCraftingStationInstance = craftingStationInstance => ({
    type: CraftingActions.SUCCESS_RECEIVE_CRAFTING_STATION_INSTANCE,
    craftingStationInstance: craftingStationInstance
});

export const receiveItems = items => ({
    type: CraftingActions.SUCCESS_RECEIVE_ITEM_LIST,
    items: items
});

export const receiveProfessions = professions => ({
    type: CraftingActions.SUCCESS_RECEIVE_PROFESSION_LIST,
    professions: professions
});

export const deleteCraftingRecipe = id => ({
    type: CraftingActions.SUCCESS_DELETE_CRAFTING_RECIPE,
    id: id
});