import React from 'react';
import { Layout } from 'antd';

export const AppFrame = () => (
  <Layout>
    <Layout.Header>header</Layout.Header>
    <Layout>
      <Layout.Content>main content</Layout.Content>
    </Layout>
    <Layout.Footer>footer</Layout.Footer>
  </Layout>
);
