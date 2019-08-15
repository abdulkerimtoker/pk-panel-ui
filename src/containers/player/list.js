import {fetchPlayerList, updatePlayerList} from "../../actions/player/list";
import {connect} from "react-redux";
import PlayerList from "../../components/player/list";

const mapStateToProps = state => ({
    playerList: state.playerList,
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