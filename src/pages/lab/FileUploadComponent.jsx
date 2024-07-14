// FilePreview.js
import React from 'react';
import { Typography, Box } from '@mui/material';

const FilePreview = ({ selectedFile }) => {
  if (!selectedFile) {
    return null;
  }

  return (
    <div>
      <Typography variant="body1">File Name: {selectedFile.name}</Typography>
      <Typography variant="body1">File Size: {(selectedFile.size / 1024).toFixed(2)} KB</Typography>
      <Box sx={{ mt: 2, maxHeight: 400, overflow: 'auto' }}>
        {selectedFile.type === 'application/pdf' ? (
          <embed src={URL.createObjectURL(selectedFile)} type="application/pdf" width="100%" height="400px" />
        ) : selectedFile.type.startsWith('image/') ? (
          <img src={URL.createObjectURL(selectedFile)} alt={selectedFile.name} style={{ width: '100%' }} />
        ) : (
          <Typography variant="body1">Unsupported file type</Typography>
        )}
      </Box>
    </div>
  );
};

export default FilePreview;
