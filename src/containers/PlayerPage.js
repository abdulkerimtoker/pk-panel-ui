import {fetchPlayer, fetchTroopList, receivePlayer, receiveTroopList} from "../actions/playerPage";
import {connect} from "react-redux";
import {PlayerPage} from "../components/PlayerPage";

const mapStateToProps = state => ({
    player: state.player,
    troopList: state.troopList
});

const mapDispatchToProps = dispatch => ({
    fetchPlayer: id => {
        dispatch(fetchPlayer(id));
        fetch('/api/player/' + id)
            .then(resp => resp.json())
            .then(player => dispatch(receivePlayer(player)));
    },
    fetchTroopList: () => {
        dispatch(fetchTroopList());
        fetch('/api/troop')
            .then(resp => resp.json())
            .then(troopList => dispatch(receiveTroopList(troopList)));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PlayerPage);