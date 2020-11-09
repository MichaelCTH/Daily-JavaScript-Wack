import React, { useState } from 'react';
import { FileInfo } from '../utility/interface';

enum ViewMode {
  'list',
  'icon',
}

export const FileTable = ({ data }: { data: FileInfo[] }) => {
  const [viewMode, setViewMode] = useState(ViewMode.list);

  return (
    <div style={{ color: 'yellowgreen' }}>
      <div
        style={{ float: 'right', marginRight: '0.5rem', marginTop: '0.5rem' }}
      >
        <span style={{ margin: '1rem', cursor: 'pointer' }}>List</span>
        <span>|</span>
        <span style={{ margin: '1rem', cursor: 'pointer' }}>Icon</span>
      </div>
      <table />
      <p>{JSON.stringify(data)}</p>
    </div>
  );
};
