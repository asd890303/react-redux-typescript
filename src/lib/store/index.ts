import { applyMiddleware, combineReducers, createStore } from "redux";

import { appReducer } from '../reducers/appReducer';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    app: appReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export default function configureStore() {
    // const middlewares = [thunkMiddleware];
    // const middleWareEnhancer = applyMiddleware(...middlewares);

    const store = createStore(
        rootReducer,
        // composeWithDevTools(middleWareEnhancer),
        // applyMiddleware(logger),
        applyMiddleware(thunk)
    );

    return store;
}
