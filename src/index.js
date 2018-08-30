import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { PersistGate } from 'redux-persist/integration/react'
import store from './store.js';
import { BrowserRouter as Router, Route } from 'react-router-dom'

document.title = process.env.REACT_APP_SITENAME

ReactDOM.render(
    <Provider store={store.store}>
        <PersistGate loading={null} persistor={store.persistor}>
            <Router>
                <Route path="/" component={App} />
            </Router>
            </PersistGate>
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
