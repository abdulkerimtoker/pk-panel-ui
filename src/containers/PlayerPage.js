import {fetchPlayer, receivePlayer} from "../actions/playerPage";
import {connect} from "react-redux";
import {PlayerPage} from "../components/PlayerPage";

const mapStateToProps = state => ({
    player: state.player
});

const mapDispatchToProps = dispatch => ({
    fetchPlayer: id => {
        dispatch(fetchPlayer(id));
        fetch('/api/player/' + id)
            .then(resp => resp.json())
            .then(player => dispatch(receivePlayer(player)));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PlayerPage);