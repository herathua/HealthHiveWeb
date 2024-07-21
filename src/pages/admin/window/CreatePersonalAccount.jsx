import AccountCreationSuccessful from '../../../components/AccountCreationSuccessful';
import AccountCreationTerminated from '../../../components/AccountCreationTerminated';
import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
function PersonalFormComponent() {
  const [formValues, setFormValues] = useState({
    fullName: "",
    email: "",
    telephoneNumber: "",
    gender: "MALE",
    age: "",
    dateOfBirth: "",
    birthCertificateNumber: "",
    nic: "",
    emergencyContactName: "",
    emergencyContactNumber: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [buttonEnabled, setButtonEnabled] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [openFailureModal, setOpenFailureModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "dateOfBirth") {
      // Format date to yyyy-mm-dd
      const formattedDate = new Date(value).toISOString().split("T")[0];
      setFormValues((prev) => ({ ...prev, [name]: formattedDate }));
    } else {
      setFormValues((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validateForm = () => {
    const formErrors = {};
    if (!formValues.fullName) formErrors.fullName = "Full Name is required";
    if (!formValues.email || !/\S+@\S+\.\S+/.test(formValues.email)) {
      formErrors.email = "Valid Email is required";
    }
    if (!formValues.dateOfBirth)
      formErrors.dateOfBirth = "Date of Birth is required";
    if (
      !formValues.telephoneNumber ||
      !/^\d{10}$/.test(formValues.telephoneNumber)
    ) {
      formErrors.telephoneNumber = "Valid Phone Number is required";
    }
    if (!formValues.age || isNaN(formValues.age) || formValues.age <= 0) {
      formErrors.age = "Valid Age is required";
    }
    if (!formValues.emergencyContactName) {
      formErrors.emergencyContactName = "Emergency Contact Name is required";
    }
    if (
      !formValues.emergencyContactNumber ||
      !/^\d{10}$/.test(formValues.emergencyContactNumber)
    ) {
      formErrors.emergencyContactNumber =
        "Valid Emergency Contact Number is required";
    }
    if (!formValues.birthCertificateNumber) {
      formErrors.birthCertificateNumber =
        "Birth Certificate Number is required";
    }
    if (!formValues.nic) formErrors.nic = "National ID is required";
    return formErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      setButtonEnabled(true);
      try {
        const response = await axios.post(
          "http://localhost:33000/api/users",
          formValues
        );

        if (response.status === 201) {
          setSuccess(true);
          setOpenSuccessModal(true);
        } else {
          setFailure(true);
          setOpenFailureModal(true);
        }
      } catch (error) {
        console.error("Error creating account:", error);
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
  <Container maxWidth="md" sx={{ paddingTop: 4 }}>
  
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1 },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 2,
          borderRadius: 2,
          backgroundColor: "white",
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >


    <br/>
        <Grid container spacing={2}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Full Name"
                variant="outlined"
                fullWidth
                name="fullName"
                value={formValues.fullName}
                onChange={handleChange}
                error={!!errors.fullName}
                helperText={errors.fullName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Email Address"
                variant="outlined"
                fullWidth
                name="email"
                type="email"
                value={formValues.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Telephone Number"
                variant="outlined"
                fullWidth
                name="telephoneNumber"
                type="tel"
                value={formValues.telephoneNumber}
                onChange={handleChange}
                error={!!errors.telephoneNumber}
                helperText={errors.telephoneNumber}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Date of Birth"
                variant="outlined"
                fullWidth
                name="dateOfBirth"
                type="date"
                value={formValues.dateOfBirth}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                error={!!errors.dateOfBirth}
                helperText={errors.dateOfBirth}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Age"
                variant="outlined"
                fullWidth
                name="age"
                type="number"
                value={formValues.age}
                onChange={handleChange}
                error={!!errors.age}
                helperText={errors.age}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Birth Certificate Number"
                variant="outlined"
                fullWidth
                name="birthCertificateNumber"
                value={formValues.birthCertificateNumber}
                onChange={handleChange}
                error={!!errors.birthCertificateNumber}
                helperText={errors.birthCertificateNumber}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="National ID"
                variant="outlined"
                fullWidth
                name="nic"
                value={formValues.nic}
                onChange={handleChange}
                error={!!errors.nic}
                helperText={errors.nic}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Emergency Contact Name"
                variant="outlined"
                fullWidth
                name="emergencyContactName"
                value={formValues.emergencyContactName}
                onChange={handleChange}
                error={!!errors.emergencyContactName}
                helperText={errors.emergencyContactName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Emergency Contact Number"
                variant="outlined"
                fullWidth
                name="emergencyContactNumber"
                type="tel"
                value={formValues.emergencyContactNumber}
                onChange={handleChange}
                error={!!errors.emergencyContactNumber}
                helperText={errors.emergencyContactNumber}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl
                fullWidth
                sx={{ mt: 1 }} // Add margin-top to align with other fields
              >
                <InputLabel id="gender-label">Gender</InputLabel>
                <Select
                  labelId="gender-label"
                  name="gender"
                  value={formValues.gender}
                  onChange={handleChange}
                >
                  <MenuItem value="MALE">Male</MenuItem>
                  <MenuItem value="FEMALE">Female</MenuItem>
                  <MenuItem value="NON-BINARY">Non-binary</MenuItem>
                  <MenuItem value="PREFER_NOT_TO_SAY">
                    Prefer not to say
                  </MenuItem>
                </Select>
                {errors.gender && (
                  <Typography color="error">{errors.gender}</Typography>
                )}
              </FormControl>
            </Grid>
          </Grid>
        </Grid>

        <Button variant="contained" sx={{ mt: 3, mb: 2 }} type="submit"  >
          Create Account
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
}

export default PersonalFormComponent;
