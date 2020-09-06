import httpclient from "../../utils/httpclient";
import {receiveCraftingStations} from "../../actions/crafting";
import {connect} from "react-redux";
import CraftingStationList from "../../components/crafting/list";

const mapStateToProps = state => ({
    craftingStations: state.craftingStations
});

const mapDispatchToProps = dispatch => ({
    fetchCraftingStations: () => {
        httpclient.fetch('/api/craftingStations')
            .then(resp => resp.json())
            .then(craftingStations => dispatch(receiveCraftingStations(craftingStations)));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(CraftingStationList);