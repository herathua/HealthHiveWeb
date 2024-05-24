import React, { useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import FileOpenIcon from '@mui/icons-material/FileOpen';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
function DataJN() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [open, setOpen] = useState(false);
    const [uploading, setUploading] = useState(false);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleFileUpload = () => {
        const formData = new FormData();
        formData.append('file', selectedFile);
        setUploading(true);

        axios.post('/upload-endpoint', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(response => {
            console.log('File uploaded successfully', response.data);
            // Handle response data as needed
        })
        .catch(error => {
            console.error('Error uploading the file!', error);
        })
        .finally(() => {
            setUploading(false);
            handleClose(); // Close the dialog after upload
        });
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button variant="contained" onClick={handleClickOpen}>
           < FileOpenIcon/>
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>
                    Select a file
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <input type="file" onChange={handleFileChange} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleFileUpload} color="primary" disabled={!selectedFile || uploading}>
                        Upload
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default DataJN;

export function DataJNt({ uploading }) {
    return (
        <div>
            {uploading ? (
                <PendingActionsIcon color="primary" />
            ) : (
                <CloudUploadIcon color="primary" />
            )}
        </div>
    );
}
