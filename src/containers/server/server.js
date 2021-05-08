import {connect} from "react-redux";
import ServerPage from "../../components/server/server";
import httpclient from "../../utils/httpclient";
import {receiveServer, receiveStartupCommands} from "../../actions/server";

const mapStateToProps = state => ({
    selectedServer: state.selectedServer,
    server: state.server,
    startupCommands: state.startupCommands
});

const mapDispatchToProps = dispatch => ({
    fetchServer: serverId => {
        httpclient.fetch(`/api/servers/${serverId}`)
            .then(resp => resp.json())
            .then(server => dispatch(receiveServer(server)));
    },

    fetchStartupCommands: () => {
        httpclient.fetch('/api/servers/startupCommands')
            .then(resp => resp.json())
            .then(startupCommands => dispatch(receiveStartupCommands(startupCommands)));
    },

    saveStartupCommand: startupCommand => {
        return httpclient.fetch('/api/servers/startupCommands', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(startupCommand)
        });
    },

    removeStartupCommand: command => {
        return httpclient.fetch(`/api/servers/startupCommands/${command}`, {
            method: 'DELETE'
        });
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ServerPage);