import React from 'react';
import httpclient from "../utils/httpclient";
import MainLayout from "../containers/layout";
import { store } from "../store";

class App extends React.Component {

    constructor(props) {
        super(props);

        if (window.location.pathname === '/processLogin') {
            httpclient.getJWT(window.location.search);
        }
        else if (!localStorage.getItem('JWT')) {
            httpclient.steamLogin();
        }

        this.props.fetchServerList();
    }

    render() {
        return <MainLayout />;
    }
}

export default App;
