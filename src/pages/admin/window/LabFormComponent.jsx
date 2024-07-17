import {
  Box,
  Button,
  Container,
  Modal,
  TextField,
} from "@mui/material";
import axios from "axios";
import React, { useState, useEffect } from "react";
import AccountCreationSuccessful from '../../../components/AccountCreationSuccessful';
import AccountCreationTerminated from '../../../components/AccountCreationTerminated';

const LabFormComponent = () => {
  const [formValues, setFormValues] = useState({
    labName: "",
    labRegID: "",
    address: "",
    email: "",
    telephone: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [openFailureModal, setOpenFailureModal] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const allFieldsFilled = Object.values(formValues).every(val => val.trim() !== "");
    setIsFormValid(allFieldsFilled);
  }, [formValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formValues.labName.trim()) newErrors.labName = "Lab Name is required";
    if (!formValues.labRegID.trim()) newErrors.labRegID = "Lab Registration ID is required";
    if (!formValues.address.trim()) newErrors.address = "Address is required";
    if (!formValues.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formValues.telephone.trim()) {
      newErrors.telephone = "Telephone is required";
    } else if (!/^\d{10}$/.test(formValues.telephone)) {
      newErrors.telephone = "Telephone should be a 10-digit number";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await axios.post(
          "http://localhost:33000/api/labs",
          formValues,
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );
        console.log("Form Submitted", response.data);
        if (response.status === 201) {
          setSuccess(true);
          setOpenSuccessModal(true);
        } else {
          setFailure(true);
          setOpenFailureModal(true);
        }
      } catch (error) {
        setFailure(true);
        setOpenFailureModal(true);
        console.error("Error submitting form:", error);
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
            "& .MuiTextField-root": {
              m: 1,
              backgroundColor: "white",
              borderRadius: 1,
            },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          noValidate
          autoComplete="off"
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
          />
          <TextField
            label="Lab Registration ID"
            variant="outlined"
            fullWidth
            name="labRegID"
            value={formValues.labRegID}
            onChange={handleChange}
            error={!!errors.labRegID}
            helperText={errors.labRegID}
          />
          <TextField
            label="Address"
            variant="outlined"
            fullWidth
            name="address"
            value={formValues.address}
            onChange={handleChange}
            error={!!errors.address}
            helperText={errors.address}
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
            disabled={!isFormValid}
          >
            Create
          </Button>
        </Box>
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
