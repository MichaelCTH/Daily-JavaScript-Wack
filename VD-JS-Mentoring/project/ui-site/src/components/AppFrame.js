import React from 'react';
import { Layout } from 'antd';
import { MenuBar } from './MenuBar';
import { SiteFooter } from './Footer';
import { LoginForm } from './LoginForm';
import { SingupForm } from './SignupForm';
import { ClientPanel } from './ClientPanel';
import { Switch, Route } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';

export const AppFrame = () => (
  <Layout>
    <MenuBar />
    <Layout style={{ backgroundColor: 'white' }}>
      <Switch>
        <Route path="/login">
          <LoginForm />
        </Route>
        <Route path="/signup">
          <SingupForm />
        </Route>
        <Route>
          <PrivateRoute>
            <ClientPanel path="/" />
          </PrivateRoute>
        </Route>
      </Switch>
    </Layout>
    <SiteFooter />
  </Layout>
);
