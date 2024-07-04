import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { Modal, Box, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Skeleton from '@mui/material/Skeleton';
import profilePicdimo from '../../assets/dimoprofile.svg';
import EditIcon from '@mui/icons-material/Edit';
import { PutLabdata, fetchLabInfo } from '../../services/apiService';
import Avatar from '@mui/material/Avatar';

const Userid = 2; // Make sure this is dynamic based on the logged-in user

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB5b79qQqo8iRGGbeOYrE2yIzmTEQARvwU",
  authDomain: "healthhivenew1.firebaseapp.com",
  projectId: "healthhivenew1",
  storageBucket: "healthhivenew1.appspot.com",
  messagingSenderId: "470574140483",
  appId: "1:470574140483:web:98c53ffa3a4fd70022d8f6",
  measurementId: "G-LDHHPPYXPX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const auth = getAuth(app);

const ProfilePictureUploader = () => {
  const [user, setUser] = useState(null);
  const [imageActionModalVisible, setImageActionModalVisible] = useState(false);
  const [hover, setHover] = useState(false);
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    // Fetch user details when the component mounts
    getUserDetails();
  }, []);

  const getUserDetails = async () => {
    try {
      const response = await fetchLabInfo();
      setUser(response);
      setAvatar(response.labProfilePictureUrl);
    } catch (error) {
      console.error('Error fetching user details:', error);
      alert('Error: Failed to fetch user details. Please try again.');
    }
  };

  const handleChoosePhoto = async (fromCamera) => {
    let file;
    try {
      if (fromCamera) {
        console.log('Camera functionality not implemented for web.');
      } else {
        getUserDetails();
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = async (event) => {
          file = event.target.files[0];
          if (file) {
            const storageRef = ref(storage, `labPics/${Userid}`);
            await uploadBytes(storageRef, file);
            const downloadURL = await getDownloadURL(storageRef);
            setAvatar(downloadURL);
            await PutLabdata({
              id: user.id,
              labRegID: user.labRegID,
              labName: user.labName,
              address: user.address,
              email: user.email,
              telephone: user.telephone,
              labProfilePictureUrl: downloadURL
            });
            setImageActionModalVisible(false);
          }
        };
        input.click();
      }
    } catch (error) {
      console.error('Error picking or uploading image:', error);
      alert('Error: Failed to pick or upload image. Please try again.');
    }
  };

  const handleDeletePhoto = async () => {
    try {
      const storageRef = ref(storage, `labPics/${Userid}`);
      await deleteObject(storageRef);
      await PutLabdata({
        id: user.id,
        labRegID: user.labRegID,
        labName: user.labName,
        address: user.address,
        email: user.email,
        telephone: user.telephone,
        labProfilePictureUrl: null
      });
      setAvatar(null);
    } catch (error) {
      console.error('Error deleting image:', error);
      alert('Error: Failed to delete image. Please try again.');
    }
  };

  return (
    <div>
      {user ? (
        <>
          <Box
            sx={{
              position: 'relative',
              width: '8rem',
              height: '8rem',
              borderRadius: '50%',
              overflow: 'hidden',
              boxShadow: 3,
              '&:hover .editIcon': {
                opacity: 1,
              },
            }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            <Avatar
              src={avatar}
              alt="Profile"
              className="w-32 h-32 object-cover"
              style={{
                width: '100%',
                height: '100%',
              }}
            />
            {hover && (
              <IconButton
                className="editIcon"
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  color: 'white',
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  opacity: 0,
                  transition: 'opacity 0.3s',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  },
                }}
                onClick={() => setImageActionModalVisible(true)}
              >
                <EditIcon />
              </IconButton>
            )}
          </Box>
          <Modal
            open={imageActionModalVisible}
            onClose={() => setImageActionModalVisible(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box
  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded shadow-lg"
  sx={{
    width: '100%',  // Ensures the box takes full width
    maxWidth: '500px',  // Limits the maximum width of the box
    padding: '24px',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative' // Ensure the close button is positioned relative to this box
  }}
>
  <IconButton
    className="absolute top-0 right-0 m-2"
    onClick={() => setImageActionModalVisible(false)}
    sx={{
      position: 'absolute',
      top: '8px',  // Adjust the top positioning as needed
      right: '8px'  // Adjust the right positioning as needed
    }}
  >
    <CloseIcon />
  </IconButton>
              {avatar ? (
                <>
                  <Avatar
                    src={avatar}
                    alt="Profile"
                    className="rounded-full border border-gray-100 object-cover shadow-md mx-auto"
                    sx={{
                      width: '150px',
                      height: '150px',
                      marginBottom: '16px',
                    }}
                  />
                  <Button variant="contained" color="secondary" onClick={handleDeletePhoto} className="mt-4">
                    Delete Photo
                  </Button>
                </>
              ) : (
                <Avatar
                  src={avatar}
                  alt="Profile"
                  className="rounded-full border border-gray-100 object-cover shadow-md mx-auto"
                  sx={{
                    width: '150px',
                    height: '150px',
                    marginBottom: '16px',
                  }}
                />
              )}
              <Button variant="contained" onClick={() => handleChoosePhoto(false)} className="mt-4">
                Add Image
              </Button>
            </Box>
          </Modal>
        </>
      ) : (
        <Skeleton variant="circular" width={129} height={129} />
      )}
    </div>
  );
};

export default ProfilePictureUploader;
