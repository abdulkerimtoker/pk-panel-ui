import {fetchPlayerList, PlayerListActions, updatePlayerList} from "../actions/playerList";
import {connect} from "react-redux";
import PlayerList from "../components/PlayerList";

const mapStateToProps = state => ({
    playerList: state.playerList
});

const mapDispatchToProps = dispatch => ({
    fetchPlayerList: search => {
        dispatch(fetchPlayerList(search));
        fetch('/api/player/search?search=' + search)
            .then(resp => resp.json())
            .then(playerList => dispatch(updatePlayerList(playerList)));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PlayerList);