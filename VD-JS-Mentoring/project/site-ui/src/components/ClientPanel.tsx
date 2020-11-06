import React from 'react';
import { FileTable } from './FileTable';
import { FileUpload } from './FileUpload';

export const ClientPanel = () => (
  <div
    style={{
      backgroundColor: 'black',
      display: 'flex',
      flexDirection: 'row',
      height: '100%',
      boxSizing: 'border-box',
    }}
  >
    <div
      style={{
        flex: '3',
        border: '0.1rem solid',
        borderColor: 'greenyellow',
        boxSizing: 'border-box',
      }}
    >
      <FileTable />
    </div>
    <div
      style={{
        flex: '1',
        border: '0.1rem solid',
        borderColor: 'greenyellow',
        boxSizing: 'border-box',
      }}
    >
      <FileUpload />
    </div>
  </div>
);
