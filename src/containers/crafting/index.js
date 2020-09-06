import httpclient from "../../utils/httpclient";
import {
    deleteCraftingRecipe,
    receiveCraftingRecipes,
    receiveCraftingStation,
    receiveCraftingStationInstance,
    receiveCraftingStationInstances, receiveItems, receiveProfessions
} from "../../actions/crafting";
import {connect} from "react-redux";
import CraftingStationPage from "../../components/crafting";
import {receiveItemList} from "../../actions/player";

const mapStateToProps = state => ({
    craftingStation: state.craftingStation,
    craftingRecipes: state.craftingRecipes,
    craftingStationInstances: state.craftingStationInstances,
    items: state.items,
    professions: state.professions
});

const mapDispatchToProps = dispatch => ({
    fetchCraftingStation: id => {
        httpclient.fetch(`/api/craftingStations/${id}`)
            .then(resp => resp.json())
            .then(craftingStation => dispatch(receiveCraftingStation(craftingStation)));
    },

    updateCraftingStation: station => {
        httpclient.fetch('/api/craftingStations', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(station)
        }).then(resp => resp.json())
            .then(craftingStation => dispatch(receiveCraftingStation(craftingStation)))
            .then(() => alert('Station was successfully updated'));
    },

    fetchCraftingRecipes: stationId => {
        httpclient.fetch(`/api/craftingStations/${stationId}/recipes`)
            .then(resp => resp.json())
            .then(recipes => dispatch(receiveCraftingRecipes(recipes)));
    },

    updateCraftingRecipe: recipe => {
        httpclient.fetch(`/api/craftingStations/recipes/${recipe.id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(recipe)
        });
    },

    deleteCraftingRecipe: recipe => {
        return httpclient.fetch(`/api/craftingStations/recipes/${recipe.id}`, {
            method: 'DELETE'
        }).then(resp => {
            if (resp.code === 200) dispatch(deleteCraftingRecipe(recipe.id));
        });
    },

    createCraftingRecipe: (stationIndex, recipe) => {
        httpclient.fetch(`/api/craftingStations/${stationIndex}/recipes`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(recipe)
        }).then(() => {
            httpclient.fetch(`/api/craftingStations/${stationIndex}/recipes`)
                .then(resp => resp.json())
                .then(recipes => dispatch(receiveCraftingRecipes(recipes)));
        });
    },

    fetchCraftingStationInstances: stationId => {
        httpclient.fetch(`/api/craftingStations/${stationId}/instances`)
            .then(resp => resp.json())
            .then(instances => dispatch(receiveCraftingStationInstances(instances)));
    },

    createCraftingStationInstance: (index, name) => {
        httpclient.fetch(`/api/craftingStations/${index}/instances`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({name: name})
        }).then(resp => resp.json())
            .then(instance => dispatch(receiveCraftingStationInstance(instance)));
    },

    fetchItems: () => {
        httpclient.fetch('/api/item')
            .then(resp => resp.json())
            .then(items => dispatch(receiveItems(items)));
    },

    fetchProfessions: () => {
        httpclient.fetch('/api/profession')
            .then(resp => resp.json())
            .then(professions => dispatch(receiveProfessions(professions)));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(CraftingStationPage);