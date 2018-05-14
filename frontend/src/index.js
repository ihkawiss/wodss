import React from 'react';
import {render} from 'react-dom'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker';
import thunk from 'redux-thunk';
import {applyMiddleware, compose, createStore} from 'redux';
import {Provider} from 'react-redux';
import allReducers from './reducers';
import {loadState, saveState} from './util/localState';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {appTheme, pages} from "./util/constants";
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Login from './components/login/Login';
import Registration from './components/registration/Registration'
import MatchList from './components/match-list/MatchList';
import PrivateRoute from './components/private-route/PrivateRoute';
import ResetPassword from "./components/reset-password/ResetPassword";
import Logout from "./components/logout/Logout";
import Activate from "./components/activate/Activate";
import "./Root.css";

const persistedState = loadState();

export const store = createStore(
    allReducers,
    persistedState,
    compose(
        applyMiddleware(thunk),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    )
);

store.subscribe(() => {
    saveState(store.getState());
});

render(
    <MuiThemeProvider muiTheme={getMuiTheme(appTheme)}>
        <Provider store={store}>
            <Router>
                <Switch>
                    <PrivateRoute exact path={pages.root} component={MatchList}/>
                    <Route path={pages.login} component={Login}/>
                    <Route path={pages.logout} component={Logout}/>
                    <Route path={pages.registration} component={Registration}/>
                    <Route path={pages.activate} component={Activate}/>
                    <Route path={pages.resetPassword} component={ResetPassword}/>

                    <PrivateRoute path={pages.matchList} component={MatchList}/>
                </Switch>
            </Router>
        </Provider>
    </MuiThemeProvider>
    ,
    document.getElementById('root')
);

registerServiceWorker();