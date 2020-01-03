import * as React from "react";
import * as serviceWorker from "./serviceWorker";

import { Route, BrowserRouter as Router } from "react-router-dom";

import App from "./containers/App";
import { Provider } from "react-redux";
import configureStore from "./lib/store";
import { render } from "react-dom";

const store = configureStore();

// Init Provider store
const Root = () => (
  <Provider store={store}>
    <Router>
      {/* <Route path="/" component={App}>
        <Route path="/video/:vid" component={App} />
      </Route> */}
      <Route exact path="/" component={App} />
      <Route exact path="/video/:vid" component={App} />
      <Route exact path="/login" component={App} />
      <Route exact path="/register" component={App} />
      <Route exact path="/msg/fans" component={App} />
      <Route exact path="/msg/like" component={App} />
      <Route exact path="/msg/mine" component={App} />
      <Route exact path="/msg/comment" component={App} />
      <Route exact path="/msg/comment/list" component={App} />
      <Route exact path="/msg/:name" component={App} />
      <Route exact path="/msg/:name/:mid" component={App} />
    </Router>
  </Provider>
);

render(<Root />, document.getElementById("root"));

// ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
