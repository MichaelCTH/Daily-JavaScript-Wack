import React, { useEffect, useState } from 'react';

export const FileUpload = ({ getFiles }: { getFiles: any }) => {
  const dropRef = React.createRef() as React.RefObject<HTMLDivElement>;
  const [dragging, setDragging] = useState(false);

  const postFile = (files: any) => {
    const formData = new FormData();
    formData.append('files', files[0]);
    fetch('http://localhost:4000/file', {
      method: 'POST',
      body: formData,
      // TODO use interceptor to set it globally
      credentials: 'include',
      headers: {
        'Access-Control-Allow-Origin': 'http://localhost:3000',
        'Access-Control-Allow-Credentials': 'true',
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          getFiles();
        }
      })
      .catch(console.log);
  };

  const handleDrag = (e: any) => {
    // must have to avoid file open in a new window
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragIn = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setDragging(true);
    }
  };
  const handleDragOut = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
  };
  const handleDrop = (e: any) => {
    console.log('drop');
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      postFile(e.dataTransfer.files);
      e.dataTransfer.clearData();
    }
  };

  useEffect(() => {
    const div = dropRef.current;
    div?.addEventListener('dragover', handleDrag);
    div?.addEventListener('dragenter', handleDragIn);
    div?.addEventListener('dragleave', handleDragOut);
    div?.addEventListener('drop', handleDrop);

    return () => {
      div?.removeEventListener('dragover', handleDrag);
      div?.removeEventListener('dragenter', handleDragIn);
      div?.removeEventListener('dragleave', handleDragOut);
      div?.removeEventListener('drop', handleDrop);
    };
  });

  return (
    <div ref={dropRef} style={{ width: '100%', height: '100%' }}>
      {dragging && (
        <div
          style={{
            textAlign: 'center',
            color: 'grey',
            fontSize: 36,
          }}
        >
          <div>drop here :)</div>
        </div>
      )}
    </div>
  );
};
