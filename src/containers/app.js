import httpclient from "../utils/httpclient";
import {serverList} from "../reducers/server";
import {receiveServerList} from "../actions/server";
import {connect} from "react-redux";
import App from "../components/app";

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
    fetchServerList: () => {
        httpclient.fetch('/api/servers')
            .then(resp => resp.json())
            .then(serverList => dispatch(receiveServerList(serverList)));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);