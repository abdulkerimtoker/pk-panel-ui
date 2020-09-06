import {selectServer} from "../actions/server";
import {connect} from "react-redux";
import MainLayout from "../components/layout";

const mapStateToProps = state => ({
    serverList: state.serverList,
    selectedServer: state.selectedServer,
    authorities: state.authorities
});

const mapDispatchToProps = dispatch => ({
    selectServer: server => {
        dispatch(selectServer(server));
        localStorage.setItem('Selected-Server-ID', server ? server.id.toString() : null);
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(MainLayout);