import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import EditIcon from '@mui/icons-material/Edit';
import { styled } from '@mui/system';
import axios from 'axios';

const HoverAvatar = styled('div')(({ theme }) => ({
    position: 'relative',
    display: 'inline-block',
    '&:hover .edit-icon': {
        opacity: 1,
    },
}));

const EditIconOverlay = styled(EditIcon)(({ theme }) => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: 'white',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: '50%',
    padding: theme.spacing(0.5),
    opacity: 0,
    transition: 'opacity 0.3s ease-in-out',
}));

const AvatarWithEditIcon = () => {
    const [avatar, setAvatar] = useState("/static/images/avatar/2.jpg");

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatar(reader.result);
                // Create form data
                const formData = new FormData();
                formData.append('file', file);
                // Send a POST request
                axios.post('YOUR_ENDPOINT_URL', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                })
                .then(response => {
                    console.log('File uploaded successfully:', response.data);
                })
                .catch(error => {
                    console.error('Error uploading file:', error);
                });
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <HoverAvatar>
            <IconButton sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src={avatar} />
            </IconButton>
            <input
                accept="image/*"
                style={{ display: 'none' }}
                id="icon-button-file"
                type="file"
                onChange={handleFileChange}
            />
            <label htmlFor="icon-button-file">
                <Tooltip title="Edit">
                    <EditIconOverlay className="edit-icon" />
                </Tooltip>
            </label>
        </HoverAvatar>
    );
};

export default AvatarWithEditIcon;
