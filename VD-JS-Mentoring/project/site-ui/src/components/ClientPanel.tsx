import React, { useEffect, useState } from 'react';
import { FileTable } from './FileTable';
import { FileUpload } from './FileUpload';
import { FileInfo } from '../utility/interface';

export const ClientPanel = () => {
  const [data, setData] = useState([] as FileInfo[]);

  const getFiles = () => {
    fetch('http://localhost:4000/file', {
      credentials: 'include',
      headers: {
        'Access-Control-Allow-Origin': 'http://localhost:3000',
        'Access-Control-Allow-Credentials': 'true',
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setData(res.data);
      })
      .catch(console.log);
  };

  useEffect(() => {
    getFiles();
  }, []);

  return (
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
        <FileTable data={data} />
      </div>
      <div
        style={{
          flex: '1',
          border: '0.1rem solid',
          borderColor: 'greenyellow',
          boxSizing: 'border-box',
        }}
      >
        <FileUpload getFiles={getFiles} />
      </div>
    </div>
  );
};
