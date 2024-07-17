import {
  Box,
  Button,
  Container,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { LabFormPostAPI } from './../../../services/apiService';
import React, { useState, useEffect } from "react";
import AccountCreationSuccessful from '../../../components/AccountCreationSuccessful';
import AccountCreationTerminated from '../../../components/AccountCreationTerminated';

const LabFormComponent = () => {
  const [formValues, setFormValues] = useState({
    labName: "",
    email: "",
    telephone: ""
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false); // state to track form validity
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [openFailureModal, setOpenFailureModal] = useState(false);

  useEffect(() => {
    setIsFormValid(Object.values(formValues).every(val => val !== "") && Object.keys(errors).length === 0); // check if all values are filled and no errors
  }, [formValues, errors]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formValues.labName) newErrors.labName = "Lab Name is required";
    if (!formValues.email || !/\S+@\S+\.\S+/.test(formValues.email)) {
      newErrors.email = "Valid Email is required";
    }
    if (!formValues.telephone || !/^\d{10}$/.test(formValues.telephone)) {
      newErrors.telephone = "Valid Phone Number is required (10 digits)";
    }
    // Add validation for other fields if necessary
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await LabFormPostAPI(formValues);
        if (response.status === 201) {
          setSuccess(true);
          setOpenSuccessModal(true);
        } else {
          setFailure(true);
          setOpenFailureModal(true);
        }
      } catch (error) {
        console.error("Error creating lab:", error);
        setFailure(true);
        setOpenFailureModal(true);
      }
    }
  };

  const handleCloseSuccessModal = () => {
    setOpenSuccessModal(false);
  };

  const handleCloseFailureModal = () => {
    setOpenFailureModal(false);
  };

  return (
    <Box>
      <Container
        maxWidth="sm"
        sx={{ padding: 3, borderRadius: 2, backgroundColor: "white" }}
      >
        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          onSubmit={handleSubmit}
        >
          <TextField
            label="Lab Name"
            variant="outlined"
            fullWidth
            name="labName"
            value={formValues.labName}
            onChange={handleChange}
            error={!!errors.labName}
            helperText={errors.labName}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            name="email"
            type="email"
            value={formValues.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Telephone"
            variant="outlined"
            fullWidth
            name="telephone"
            value={formValues.telephone}
            onChange={handleChange}
            error={!!errors.telephone}
            helperText={errors.telephone}
            sx={{ marginBottom: 2 }}
          />
          <Button
            variant="contained"
            sx={{
              maxWidth: "150px",
              alignSelf: "center",
              backgroundColor: "#757AEF",
              color: "white",
              mt: 3,
            }}
            type="submit"
            disabled={!isFormValid} // disable button if form is not valid
          >
            Create
          </Button>
        </Box>

        {/* Success Modal */}
        <Modal
          open={openSuccessModal}
          onClose={handleCloseSuccessModal}
          aria-labelledby="success-modal-title"
          aria-describedby="success-modal-description"
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              height: "100%",
            }}
          >
            <Box sx={{ width: "40%" }}>
              <AccountCreationSuccessful onClose={handleCloseSuccessModal} />
            </Box>
          </Box>
        </Modal>

        {/* Failure Modal */}
        <Modal
          open={openFailureModal}
          onClose={handleCloseFailureModal}
          aria-labelledby="failure-modal-title"
          aria-describedby="failure-modal-description"
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              height: "100%",
            }}
          >
            <Box sx={{ width: "40%" }}>
              <AccountCreationTerminated onClose={handleCloseFailureModal} />
            </Box>
          </Box>
        </Modal>
      </Container>
    </Box>
  );
};

export default LabFormComponent;
