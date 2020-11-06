import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({ children, ...rest }: any) => (
  <Route
    {...rest}
    render={({ location }) =>
      false ? (
        children
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: location },
          }}
        />
      )
    }
  />
);
