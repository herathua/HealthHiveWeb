import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { Modal, Box, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

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
      console.log("bv")
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
        // Use a library like react-webcam or similar to capture image from the camera
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
            console.log(downloadURL);
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
          <div>
          </div>
          <Button variant="contained" onClick={() => handleChoosePhoto(false)} className="mt-4">
                Add Image
              </Button>
          {profilePicUri && (
            <>
              <img src={profilePicUri} alt="Profile" className="w-32 h-32 rounded-full border border-gray-100 object-cover shadow-md mx-auto" />
              <Button variant="contained" color="secondary" onClick={handleDeletePhoto} className="mt-4">
                    Delete Photo
                  </Button>
            </>
          )}
        </>
      ) : (
        <p>Loading user details...</p>
      )}
    </div>
  );
};

export default ProfilePictureUploader;
