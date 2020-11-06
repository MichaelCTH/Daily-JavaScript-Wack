import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { MenuBar } from './MenuBar';
import { SiteFooter } from './Footer';
import { LoginForm } from './LoginForm';
import { SignupForm } from './SignupForm';
import { ClientPanel } from './ClientPanel';
import { PrivateRoute } from './PrivateRoute';

const FLEX_HEIGHT = [1.7, 17, 1];

export const AppFrame = () => (
  <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
    <div style={{ flex: FLEX_HEIGHT[0] }}>
      <MenuBar />
    </div>
    <div style={{ flex: FLEX_HEIGHT[1], backgroundColor: 'black' }}>
      <Switch>
        <Route path="/login">
          <LoginForm />
        </Route>
        <Route path="/signup">
          <SignupForm />
        </Route>
        <Route path="/">
          <PrivateRoute>
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
