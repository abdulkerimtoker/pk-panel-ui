import httpclient from "../utils/httpclient";
import {authorities, serverList} from "../reducers/server";
import {receiveAuthorities, receiveServerList, selectServer} from "../actions/server";
import {connect} from "react-redux";
import App from "../components/app";

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
    fetchServerList: () => {
        httpclient.fetch('/api/servers')
            .then(resp => resp.json())
            .then(serverList => {
                dispatch(receiveServerList(serverList))
                let selectedServer = localStorage.getItem('Selected-Server-ID');
                if (selectedServer) {
                    serverList.forEach(server => {
                        if (server.id === parseInt(selectedServer)) {
                            dispatch(selectServer(server));
                        }
                    });
                }
            });
    },

    fetchAuthorities: () => {
        httpclient.fetch('/api/user/authorities')
            .then(resp => resp.json())
            .then(authorities => dispatch(receiveAuthorities(authorities)));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);