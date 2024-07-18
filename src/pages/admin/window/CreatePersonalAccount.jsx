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
} from "@mui/material";
import { CreatePersonalAcountPostAPI } from "../../../services/apiService";
import React, { useState, useEffect } from "react";

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
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [openFailureModal, setOpenFailureModal] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const allFieldsFilled = Object.values(formValues).every(val => val.toString().trim() !== "");
    setIsFormValid(allFieldsFilled);
  }, [formValues]);

  const calculateAge = (birthDate) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    return age;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "dateOfBirth") {
      const formattedDate = new Date(value).toISOString().split("T")[0];
      const calculatedAge = calculateAge(formattedDate);
      setFormValues((prev) => ({
        ...prev,
        [name]: formattedDate,
        age: calculatedAge.toString()
      }));
    } else {
      setFormValues((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validateForm = () => {
    const formErrors = {};
    if (!formValues.fullName.trim()) formErrors.fullName = "Full Name is required";
    if (!formValues.email.trim() || !/\S+@\S+\.\S+/.test(formValues.email)) {
      formErrors.email = "Valid Email is required";
    }
    if (!formValues.dateOfBirth) formErrors.dateOfBirth = "Date of Birth is required";
    if (!formValues.telephoneNumber.trim() || !/^\d{10}$/.test(formValues.telephoneNumber)) {
      formErrors.telephoneNumber = "Valid Phone Number is required";
    }
    if (!formValues.age || isNaN(formValues.age) || formValues.age <= 0) {
      formErrors.age = "Valid Age is required";
    }
    if (!formValues.emergencyContactName.trim()) {
      formErrors.emergencyContactName = "Emergency Contact Name is required";
    }
    if (!formValues.emergencyContactNumber.trim() || !/^\d{10}$/.test(formValues.emergencyContactNumber)) {
      formErrors.emergencyContactNumber = "Valid Emergency Contact Number is required";
    }
    if (!formValues.birthCertificateNumber.trim()) {
      formErrors.birthCertificateNumber = "Birth Certificate Number is required";
    }
    if (!formValues.nic.trim()) formErrors.nic = "National ID is required";
    if (!formValues.gender) formErrors.gender = "Gender is required";
    return formErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
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
                InputProps={{ readOnly: true }}
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
              <FormControl fullWidth sx={{ mt: 1 }}>
                <InputLabel id="gender-label">Gender</InputLabel>
                <Select
                  labelId="gender-label"
                  name="gender"
                  value={formValues.gender}
                  onChange={handleChange}
                  error={!!errors.gender}
                >
                  <MenuItem value="MALE">Male</MenuItem>
                  <MenuItem value="FEMALE">Female</MenuItem>
                  <MenuItem value="NON-BINARY">Non-binary</MenuItem>
                  <MenuItem value="PREFER_NOT_TO_SAY">Prefer not to say</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Button
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            type="submit"
            disabled={!isFormValid}
          >
            Create Account
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
}

export default PersonalFormComponent;