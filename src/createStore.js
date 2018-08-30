// Redux import
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { reducer as formReducer } from 'redux-form'

// Api import
import {
    reducer as beesReducer,
    middleware as beesMiddleware,
} from 'redux-bees';

// Reducers import
import auth from './reducers/auth'
import navbar from './reducers/navbar'
import alert from './reducers/alert'
import pagination from './reducers/alert'
import filters from './reducers/filters'

// Application reducer combination
const appReducer = combineReducers({
    bees: beesReducer,
    auth: auth,
    navbar: navbar,
    form: formReducer,
    alert: alert,
    pagination : pagination,
    filters: filters,
});

// The rootReducer allow the reset of the application state
const rootReducer = (state, action) => {
    if (action.type === 'UNSET_JWT_TOKEN') {
        Object.keys(state).forEach(key => {
            storage.removeItem(`persist:${key}`);
        });
        state = undefined;
    }
    return appReducer(state, action)
}

// The store persist after the refresh of the page
const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default function () {
    let store = createStore(
        persistedReducer,
        compose(
            applyMiddleware(beesMiddleware()),
            window.devToolsExtension ? window.devToolsExtension() : f => f
        )
    );
    let persistor = persistStore(store);
    return { store, persistor };
}
