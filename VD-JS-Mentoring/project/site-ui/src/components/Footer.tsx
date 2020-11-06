import React from 'react';

export const SiteFooter = () => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      bottom: 0,
      backgroundColor: 'black',
      border: '0.1rem solid',
      borderColor: 'greenyellow',
      height: '100%',
      boxSizing: 'border-box',
    }}
  >
    <div style={{ color: 'greenyellow' }}>
      Copyright @ Michael Chen
      <span role="img" aria-label="bear">
        🍺
      </span>
    </div>
  </div>
);
