import React from 'react';
import MainLayout from './components/layout'
import httpclient from "./utils/httpclient";

class App extends React.Component {

    constructor(props) {
        super(props);
        if (window.location.pathname === '/processLogin') {
            httpclient.getJWT(window.location.search);
        }
        else if (!localStorage.getItem('JWT')) {
            httpclient.steamLogin();
        }
    }

    render() {
        return (
            <MainLayout />
        );
    }
}

export default App;
