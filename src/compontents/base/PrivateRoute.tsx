import * as React from "react";

import { Redirect, Route, RouteProps } from "react-router-dom";

interface PrivateRouteProps extends RouteProps {
  component: any;
  isLogin: Boolean;
}

const PrivateRoute = (props: PrivateRouteProps) => {
  const { component: Component, isLogin, ...rest } = props;
  return (
    <Route
      {...rest}
      render={routeProps =>
        isLogin ? (
          <Component {...routeProps} />
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
