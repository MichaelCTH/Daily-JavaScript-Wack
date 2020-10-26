import React from 'react';
import { Layout } from 'antd';
import { MenuBar } from './MenuBar';
import { SiteFooter } from './Footer';
import { LoginForm } from './LoginForm';

const { Content } = Layout;

export const AppFrame = () => (
  <Layout>
    <MenuBar />
    <Layout style={{ backgroundColor: 'white' }}>
      <LoginForm />
    </Layout>
    <SiteFooter />
  </Layout>
);
