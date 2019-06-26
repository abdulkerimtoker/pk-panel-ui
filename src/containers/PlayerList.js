import {fetchPlayerList, PlayerListActions, updatePlayerList} from "../actions/playerList";
import {connect} from "react-redux";
import PlayerList from "../components/PlayerList";

const mapStateToProps = state => ({
    playerList: state.playerList
});

const mapDispatchToProps = dispatch => ({
    fetchPlayerList: filterData => {
        dispatch(fetchPlayerList(filterData));
        fetch('/api/player')
            .then(resp => resp.json())
            .then(playerList => {
                dispatch(updatePlayerList(playerList));
                console.log(playerList[0].name);
            });
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PlayerList);