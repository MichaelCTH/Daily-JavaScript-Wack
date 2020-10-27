import React from 'react';
import { Layout } from 'antd';

const { Footer } = Layout;

export const SiteFooter = () => (
  <>
    <Footer
      style={{
        textAlign: 'center',
        position: 'fixed',
        bottom: 0,
        width: '100vw',
      }}
    >
      <div>
        Copyright @ Michael Chen
        <span role="img" aria-label="bear">
          🍺
        </span>
      </div>
    </Footer>
  </>
);
