import React from 'react';
import { FileTable } from './FileTable';
import { FileUpload } from './FileUpload';

export const ClientPanel = () => (
  <>
    <FileUpload />
    <FileTable />
  </>
);
