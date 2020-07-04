import Store from '../reducers/index'
import {store} from "../store";

class HttpClient {

    fetch(requestInfo, requestInit = null) {
        if (!requestInit) {
            requestInit = {};
        }
        if (!requestInit['headers']) {
            requestInit['headers'] = {}
        }
        requestInit['headers']['Authorization'] = localStorage.getItem('JWT');
        requestInit['headers']['Selected-Server-ID'] = localStorage.getItem('Selected-Server-ID')
        
        return fetch(requestInfo, requestInit)
            .then(resp => {
                if (resp.status === 403) {
                    this.steamLogin();
                }
                return resp;
            });
    }

    steamLogin() {
        fetch('/api/login')
            .then(resp => {
                if (resp.status === 200) {
                    window.location.assign(resp.headers.get('Location'));
                }
            });
    }

    getJWT(search) {
        fetch('/api/processLogin' + search)
            .then(resp => {
                if (resp.status === 202) {
                    localStorage.setItem('JWT', resp.headers.get('Authorization'))
                }
            });
    }
}

export default new HttpClient();