import { applyMiddleware, combineReducers, createStore } from "redux";

import { appReducer } from '../reducers/appReducer';
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";

const rootReducer = combineReducers({
    app: appReducer,
    // home:homeReducer,
    // message: messageReducer,
    // profile: profileReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export default function configureStore() {
    const middlewares = [thunkMiddleware];
    const middleWareEnhancer = applyMiddleware(...middlewares);

    const store = createStore(
        rootReducer,
        composeWithDevTools(middleWareEnhancer)
    );

    return store;
}
