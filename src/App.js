import React from 'react';
import Login from './containers/Login.js';
import Forum from './containers/Forum.js';
import './App.css';
import './dist/css/bootstrap.min.css';
import { connect } from 'react-redux'
import Register from './containers/Register.js'
import { Route, Switch } from 'react-router-dom'

const mapStateToProps = (state) => ({
    auth: state.auth
})

const App = ({ dispatch, auth }) => {
    let Main = ({dispatch, auth}) => {
        // The forum is only accessible when a valid JWT token is in the store
        if (typeof (auth.token) !== 'undefined') {
            return <Forum />
        }
        return (
            <Switch>
                <Route exact path="/register" component={Register} />
                <Route path="/" component={Login} />
            </Switch>
        );
    }

    return (
        <div className="App">
            <Main auth={auth} dispatch={dispatch}></Main>
        </div>
    )
}

export default connect(mapStateToProps)(App)
