import React from 'react';
import httpclient from "../utils/httpclient";
import MainLayout from "../containers/layout";

class App extends React.Component {

    constructor(props) {
        super(props);

        if (window.location.pathname === '/processLogin') {
            httpclient.getJWT(window.location.search);
        }
        else if (!localStorage.getItem('JWT')) {
            httpclient.steamLogin();
        }
        else {
            this.props.fetchServerList();
            this.props.fetchAuthorities();
        }
    }

    render() {
        return <MainLayout />;
    }
}

export default App;
