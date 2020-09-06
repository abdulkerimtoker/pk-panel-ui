import {connect} from "react-redux";
import ServerPage from "../../components/server/server";
import httpclient from "../../utils/httpclient";
import {receiveServer} from "../../actions/server";

const mapStateToProps = state => ({
    selectedServer: state.selectedServer,
    server: state.server
});

const mapDispatchToProps = dispatch => ({
    fetchServer: serverId => {
        httpclient.fetch(`/api/servers/${serverId}`)
            .then(resp => resp.json())
            .then(server => dispatch(receiveServer(server)));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ServerPage);