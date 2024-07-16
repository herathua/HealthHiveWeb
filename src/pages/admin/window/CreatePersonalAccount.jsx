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
import { CreatePersonalAcountPostAPI } from "../../../services/apiService";
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

  const [formErrors, setFormErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [buttonEnabled, setButtonEnabled] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [openFailureModal, setOpenFailureModal] = useState(false);

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "dateOfBirth") {
      const formattedDate = new Date(value).toISOString().split("T")[0];
      const age = calculateAge(formattedDate);
      setFormValues((prev) => ({
        ...prev,
        [name]: formattedDate,
        age: age.toString(),
      }));
    } else {
      setFormValues((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formValues.fullName || !/^[a-zA-Z\s]+$/.test(formValues.fullName)) {
      errors.fullName = "Full Name is required and should contain only letters";
    }
    if (!formValues.email || !/\S+@\S+\.\S+/.test(formValues.email)) {
      errors.email = "Valid Email is required";
    }
    if (!formValues.dateOfBirth) {
      errors.dateOfBirth = "Date of Birth is required";
    }
    if (!formValues.telephoneNumber || !/^\d{10}$/.test(formValues.telephoneNumber)) {
      errors.telephoneNumber = "Valid Phone Number is required (10 digits)";
    }
    if (!formValues.age || isNaN(formValues.age) || formValues.age <= 0) {
      errors.age = "Valid Age is required";
    }
    if (!formValues.emergencyContactName || !/^[a-zA-Z\s]+$/.test(formValues.emergencyContactName)) {
      errors.emergencyContactName = "Emergency Contact Name is required and should contain only letters";
    }
    if (!formValues.emergencyContactNumber || !/^\d{10}$/.test(formValues.emergencyContactNumber)) {
      errors.emergencyContactNumber = "Valid Emergency Contact Number is required (10 digits)";
    }
    if (!formValues.birthCertificateNumber || !/^\d{4}$/.test(formValues.birthCertificateNumber)) {
      errors.birthCertificateNumber = "Valid Birth Certificate Number is required (4 digits)";
    }
    if (!formValues.nic || !/^\d{12}$/.test(formValues.nic)) {
      errors.nic = "Valid National ID is required (12 digits)";
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      setButtonEnabled(true);
      try {
        const response = await CreatePersonalAcountPostAPI(formValues);
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
                  error={!!formErrors.fullName}
                  helperText={formErrors.fullName}
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
                  error={!!formErrors.email}
                  helperText={formErrors.email}
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
                  error={!!formErrors.telephoneNumber}
                  helperText={formErrors.telephoneNumber}
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
                  error={!!formErrors.dateOfBirth}
                  helperText={formErrors.dateOfBirth}
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
                  error={!!formErrors.age}
                  helperText={formErrors.age}
                  InputProps={{ readOnly: true }}
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
                  error={!!formErrors.birthCertificateNumber}
                  helperText={formErrors.birthCertificateNumber}
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
                  error={!!formErrors.nic}
                  helperText={formErrors.nic}
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
                  error={!!formErrors.emergencyContactName}
                  helperText={formErrors.emergencyContactName}
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
                  error={!!formErrors.emergencyContactNumber}
                  helperText={formErrors.emergencyContactNumber}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth sx={{ mt: 1 }}>
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
                    <MenuItem value="PREFER_NOT_TO_SAY">Prefer not to say</MenuItem>
                  </Select>
                  {formErrors.gender && (
                    <Typography color="error">{formErrors.gender}</Typography>
                  )}
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
          <Button
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            type="submit"
            disabled={!buttonEnabled}
          >
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
