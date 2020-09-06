import {connect} from "react-redux";
import LogsPage from "../../components/logs/logs";
import httpclient from "../../utils/httpclient";
import {receiveLogFiles} from "../../actions/server";

const mapStateToProps = state => ({
    logFiles: state.logFiles,
    authorities: state.authorities,
    selectedServer: state.selectedServer
});

const mapDispatchToProps = dispatch => ({
    fetchLogFiles: () => {
        httpclient.fetch('/api/log/list')
            .then(resp => resp.json())
            .then(files => dispatch(receiveLogFiles(files)));
    },

    fetchLogFileDownloadToken: logFile => {
        httpclient.fetch(`/api/log/get/${logFile}`)
            .then(resp => resp.json())
            .then(token => window.open(`/download/${token.token}`, '_blank'));
    },

    searchLogFile: (logFile, words) => {
        let queryParams = words.map(w => `words=${w}`).reduce((p, n) => `${p}&${n}`);
        return httpclient.fetch(`/api/log/search/${logFile}?${queryParams}`)
            .then(resp => resp.text());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(LogsPage);