import * as React from "react";

import { Redirect, Route, RouteProps } from "react-router-dom";

import { AppState } from "../../lib/store";

interface PrivateRouteProps extends RouteProps, AppState {
  component?: any;
  // isLogin: boolean;
}

const PrivateRoute = (props: PrivateRouteProps) => {
  const { component: Component, app, ...rest } = props;

  return (
    <Route
      {...rest}
      render={routeProps =>
        app.isLogin ? (
          <Component {...routeProps} {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: routeProps.location }
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
