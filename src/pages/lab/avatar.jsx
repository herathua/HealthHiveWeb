// AvatarWithPhotoOnly.js
import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/system';
import { fetchLabInfo } from '../../services/apiService';

const HoverAvatar = styled('div')(({ theme }) => ({
    position: 'relative',
    display: 'inline-block',
}));

const AvatarWithPhotoOnly = () => {
    const [avatar, setAvatar] = useState("");

    useEffect(() => {
        const fetchProfilePicture = async () => {
            try {
                const data = await fetchLabInfo();
                const { labProfilePictureUrl } = data;
                setAvatar(labProfilePictureUrl);
                //console.log(data);
            } catch (error) {
                console.error('Error fetching profile picture:', error);
            }
        };

        fetchProfilePicture();
    }, []);

    return (
        <HoverAvatar>
            <IconButton sx={{ p: 0 }}>
                <Avatar alt="Lab Profile Picture" src={avatar} />
            </IconButton>
        </HoverAvatar>
    );
};

export default AvatarWithPhotoOnly;
