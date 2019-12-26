import * as React from "react";
import * as serviceWorker from "./serviceWorker";

import App from "./containers/App";
import { Provider } from "react-redux";
import configureStore from "./store";
import { render } from "react-dom";

const store = configureStore();

// Init Provider store
const Root = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

render(<Root />, document.getElementById("root"));

// ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
