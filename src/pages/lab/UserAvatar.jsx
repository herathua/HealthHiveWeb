import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { Modal, Box, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import profilePicdimo from '../../assets/dimoprofile.svg';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';


const Userid = 1; // Make sure this is dynamic based on the logged-in user

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
  const [profilePicUri, setProfilePicUri] = useState(null);
  const [imageActionModalVisible, setImageActionModalVisible] = useState(false);

  useEffect(() => {
    // Fetch user details when the component mounts
    getUserDetails();
  }, []);

  const getUserDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:33000/api/labs/${Userid}`);
      setUser(response.data);
      setProfilePicUri(response.data.labProfilePictureUrl);
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
            setProfilePicUri(downloadURL);
            await axios.put(`http://localhost:33000/api/labs/${Userid}`, {
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
      await axios.put(`http://localhost:33000/api/labs/${Userid}`, {
        id: user.id,
        labRegID: user.labRegID,
        labName: user.labName,
        address: user.address,
        email: user.email,
        telephone: user.telephone,
        labProfilePictureUrl: null
      });
      setProfilePicUri(null);
    } catch (error) {
      console.error('Error deleting image:', error);
      alert('Error: Failed to delete image. Please try again.');
    }
  };

  return (
    <div>
      {user ? (
        <>
          <div className="relative w-32 h-32 mx-auto">
            <img
              src={profilePicUri}
              alt="Profile"
              className="w-32 h-32 rounded-full border border-gray-100 object-cover shadow-md"
            />
            <Fab
              size="small"
              color="secondary"
              aria-label="add"
              className="absolute bottom-14 right-0 transform translate-x-24 translate-y-1/2"
              onClick={() => setImageActionModalVisible(true)}
            >
              <AddIcon />
            </Fab>
          </div>
          <Modal
            open={imageActionModalVisible}
            onClose={() => setImageActionModalVisible(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded shadow-lg">
              <IconButton
                className="absolute top-2 right-2"
                onClick={() => setImageActionModalVisible(false)}
              >
                <CloseIcon />
              </IconButton>
              {profilePicUri ? (
                <>
                  <img src={profilePicUri} alt="Profile" className="w-32 h-32 rounded-full border border-gray-100 object-cover shadow-md mx-auto" />
                  <Button variant="contained" color="secondary" onClick={handleDeletePhoto} className="mt-4">
                    Delete Photo
                  </Button>
                </>
              ) : (
                <p><img src={profilePicdimo} alt="Profile" className="w-32 h-32 rounded-full border border-gray-100 object-cover shadow-md mx-auto" /></p>
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
