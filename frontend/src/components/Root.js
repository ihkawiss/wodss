import React, {Component} from 'react';
import App from './app/App';
import Login from './login/Login';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {appTheme} from "../util/constants";
import {connect} from 'react-redux';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import "./Root.css";

class Root extends Component {

    render() {
        let authenticated = false;

        if (this.props.user && this.props.user.authenticationState.authenticated === true) {
            authenticated = true;
        }

        return (
            <MuiThemeProvider muiTheme={getMuiTheme(appTheme)}>
                <div>
                    {authenticated === true ? <App/> : <Login/>}
                </div>
            </MuiThemeProvider>
        );
    }
}

// subscribe user's authentication state
const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, {})(Root);