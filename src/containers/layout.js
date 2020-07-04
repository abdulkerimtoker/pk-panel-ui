import httpclient from "../utils/httpclient";
import {receiveServerList, selectServer} from "../actions/server";
import {connect} from "react-redux";
import MainLayout from "../components/layout";

const mapStateToProps = state => ({
    serverList: state.serverList,
    selectedServer: state.selectedServer
});

const mapDispatchToProps = dispatch => ({
    selectServer: server => {
        dispatch(selectServer(server));
        localStorage.setItem('Selected-Server-ID', server.id.toString());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(MainLayout);