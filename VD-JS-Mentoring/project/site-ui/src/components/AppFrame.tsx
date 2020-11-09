import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { MenuBar } from './MenuBar';
import { SiteFooter } from './Footer';
import { LoginForm } from './LoginForm';
import { SignupForm } from './SignupForm';
import { ClientPanel } from './ClientPanel';
import { PrivateRoute } from './PrivateRoute';
import { isAuth } from '../utility';

const FLEX_HEIGHT = [1.7, 17, 1];

export const AppFrame = () => {
  // TODO use redux to handle it globally
  const [logged, setLogged] = useState(false);
  const [logging, setLogging] = useState(true);

  useEffect(() => {
    isAuth()
      .then((rst) => {
        if (rst) setLogged(true);
        setTimeout(() => setLogging(false), 0);
      })
      .catch(() => {
        setLogging(false);
        setLogged(false);
      });
  }, []);

  return logging ? (
    <div>Loading</div>
  ) : (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: FLEX_HEIGHT[0] }}>
        <MenuBar logged={logged} setLogged={setLogged} />
      </div>
      <div style={{ flex: FLEX_HEIGHT[1], backgroundColor: 'black' }}>
        <Switch>
          <Route path="/login">
            <LoginForm setLogged={setLogged} />
          </Route>
          <Route path="/signup">
            <SignupForm setLogged={setLogged} />
          </Route>
          <Route path="/">
            <PrivateRoute logged={logged}>
              <ClientPanel />
            </PrivateRoute>
          </Route>
        </Switch>
      </div>
      <div style={{ flex: FLEX_HEIGHT[2] }}>
        <SiteFooter />
      </div>
    </div>
  );
};
