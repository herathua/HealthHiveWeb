import React, { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import axios from "axios";
import {
  Paper,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Container,
  IconButton,
  Snackbar,
  Alert,
  Grid,
  Select,
  MenuItem,
  InputAdornment,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import PersonalFormComponent from "../window/CreatePersonalAccount";

const ViewUser = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editableFields, setEditableFields] = useState({});
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [createOpen, setCreateOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const handleClickOpen = () => {
    setCreateOpen(true);
  };

  const handleClickClose = () => {
    setCreateOpen(false);
  };
  useEffect(() => {
    const fetchUsers = async () => {
      const authToken = Cookies.get('authToken');
      try {
        if (!authToken) {
          throw new Error('No auth token available');
        }
        const headers = {
          'Authorization': 'Bearer ' + authToken // Set the token in headers
        };
        const response = await axios.get("http://13.202.67.81:10000/usermgtapi/api/users", { headers });
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleView = (user) => {
    setSelectedUser(user);
    setOpen(true);
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setEditableFields({});
    setEditOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedUser(null);
  };

  const handleEditClose = () => {
    setEditOpen(false);
    setSelectedUser(null);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFieldChange = (event) => {
    setSelectedUser({
      ...selectedUser,
      [event.target.name]: event.target.value,
    });
  };

  const enableFieldEditing = (fieldName) => {
    setEditableFields({ ...editableFields, [fieldName]: true });
  };

  const handleUpdateUser = () => {
    const authToken=Cookies.get('authToken');
 
      if (!authToken) {
        throw new Error('No auth token available');
      }
      const headers = {
        'Authorization': 'Bearer ' + authToken // Set the token in headers
      };
    axios
      .put(
        `http://13.202.67.81:10000/usermgtapi/api/users/${selectedUser.id}`,
        selectedUser,{ headers }
      )
      .then((response) => {
        if (response.status === 200) {
          setSnackbarMessage("User updated successfully");
          setSnackbarSeverity("success");
          setSnackbarOpen(true);
          setUsers(
            users.map((user) =>
              user.id === selectedUser.id ? selectedUser : user
            )
          );
          handleEditClose();
        }
      })
      .catch((error) => {
        setSnackbarMessage("Error updating user");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      });
  };

  const confirmDeleteUser = (user) => {
    setUserToDelete(user);
    setDeleteConfirmOpen(true);
  };

  const handleDeleteUser = () => {
    const authToken=Cookies.get('authToken');

    if (!authToken) {
      throw new Error('No auth token available');
    }
    const headers = {
      'Authorization': 'Bearer ' + authToken // Set the token in headers
    };
    axios
      .delete(`http://13.202.67.81:10000/usermgtapi/api/users/${userToDelete.email}`, { headers })
      .then((response) => {
        if (response.status === 200) {
          setSnackbarMessage("User deleted successfully");
          setSnackbarSeverity("success");
          setSnackbarOpen(true);
          setUsers(users.filter((user) => user.email !== userToDelete.email));
          setDeleteConfirmOpen(false);
        }
      })
      .catch((error) => {
        setSnackbarMessage("Error deleting user");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      });
  };

  const filteredUsers = users.filter((user) =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container maxWidth="lg">
      <div style={{ display: "flex", marginBottom: "16px" }}>
        <Grid
          container
          spacing={2}
          justifyContent="center"
          style={{ margin: "20px 0" }}
        >
          <Grid
            item
            xs={12}
            sm={6}
            style={{ marginBottom: "5%", display: "flex" }}
          >
            <TextField
              label="Search by Email"
              variant="outlined"
              fullWidth
              sx={{ marginRight: "10px" }}
              value={searchTerm}
              onChange={handleSearch}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setSearchTerm("")}>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleClickOpen}
              sx={{
                height: "56px", // Adjust this value if necessary to match the height of the TextField
              }}
            >
              <AddIcon />
            </Button>

            <Dialog
              open={createOpen}
              onClose={handleClickClose}
              fullWidth
              maxWidth="sm"
            >
              <DialogTitle>
                <div className="text-center text-4xl">Create User Account</div>
              </DialogTitle>
              <DialogContent>
                <PersonalFormComponent />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClickClose} color="primary">
                  Close
                </Button>
              </DialogActions>
            </Dialog>
          </Grid>
        </Grid>
      </div>
      <TableContainer component={Paper} style={{ width: "100%" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>ID</TableCell>
              <TableCell>Full Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((user, index) => (
              <TableRow key={user.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.fullName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleView(user)}
                  >
                    View
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    style={{ marginLeft: "10px" }}
                    onClick={() => handleEdit(user)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    style={{ marginLeft: "10px" }}
                    onClick={() => confirmDeleteUser(user)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* View Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>User Details</DialogTitle>
        <DialogContent>
          {selectedUser && (
            <TableContainer>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <strong>ID:</strong>
                    </TableCell>
                    <TableCell>{selectedUser.id}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Full Name:</strong>
                    </TableCell>
                    <TableCell>{selectedUser.fullName}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Email:</strong>
                    </TableCell>
                    <TableCell>{selectedUser.email}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Telephone Number:</strong>
                    </TableCell>
                    <TableCell>{selectedUser.telephoneNumber}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Gender:</strong>
                    </TableCell>
                    <TableCell>{selectedUser.gender}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Age:</strong>
                    </TableCell>
                    <TableCell>{selectedUser.age}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Date of Birth:</strong>
                    </TableCell>
                    <TableCell>{selectedUser.dateOfBirth}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Birth Certificate Number:</strong>
                    </TableCell>
                    <TableCell>{selectedUser.birthCertificateNumber}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>NIC:</strong>
                    </TableCell>
                    <TableCell>{selectedUser.nic}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Emergency Contact Name:</strong>
                    </TableCell>
                    <TableCell>{selectedUser.emergencyContactName}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Emergency Contact Number:</strong>
                    </TableCell>
                    <TableCell>{selectedUser.emergencyContactNumber}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={editOpen} onClose={handleEditClose} maxWidth="sm" fullWidth>
        <DialogTitle>Edit User Details</DialogTitle>
        <DialogContent>
          {selectedUser && (
            <TableContainer>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <strong>ID:</strong>
                    </TableCell>
                    <TableCell>{selectedUser.id}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Full Name:</strong>
                    </TableCell>
                    <TableCell>
                      {editableFields.fullName ? (
                        <TextField
                          name="fullName"
                          value={selectedUser.fullName}
                          onChange={handleFieldChange}
                          fullWidth
                        />
                      ) : (
                        <Box display="flex" alignItems="center">
                          {selectedUser.fullName}
                          <IconButton
                            onClick={() => enableFieldEditing("fullName")}
                          >
                            <EditIcon />
                          </IconButton>
                        </Box>
                      )}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Email:</strong>
                    </TableCell>
                    <TableCell>
                      {editableFields.email ? (
                        <TextField
                          name="email"
                          value={selectedUser.email}
                          onChange={handleFieldChange}
                          fullWidth
                        />
                      ) : (
                        <Box display="flex" alignItems="center">
                          {selectedUser.email}
                          <IconButton
                            onClick={() => enableFieldEditing("email")}
                          >
                            <EditIcon />
                          </IconButton>
                        </Box>
                      )}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Telephone Number:</strong>
                    </TableCell>
                    <TableCell>
                      {editableFields.telephoneNumber ? (
                        <TextField
                          name="telephoneNumber"
                          value={selectedUser.telephoneNumber}
                          onChange={handleFieldChange}
                          fullWidth
                        />
                      ) : (
                        <Box display="flex" alignItems="center">
                          {selectedUser.telephoneNumber}
                          <IconButton
                            onClick={() =>
                              enableFieldEditing("telephoneNumber")
                            }
                          >
                            <EditIcon />
                          </IconButton>
                        </Box>
                      )}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Gender:</strong>
                    </TableCell>
                    <TableCell>
                      {editableFields.gender ? (
                        <Select
                          name="gender"
                          value={selectedUser.gender}
                          onChange={handleFieldChange}
                          fullWidth
                        >
                          <MenuItem value="Male">Male</MenuItem>
                          <MenuItem value="Female">Female</MenuItem>
                          <MenuItem value="Other">Other</MenuItem>
                        </Select>
                      ) : (
                        <Box display="flex" alignItems="center">
                          {selectedUser.gender}
                          <IconButton
                            onClick={() => enableFieldEditing("gender")}
                          >
                            <EditIcon />
                          </IconButton>
                        </Box>
                      )}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Age:</strong>
                    </TableCell>
                    <TableCell>
                      {editableFields.age ? (
                        <TextField
                          name="age"
                          value={selectedUser.age}
                          onChange={handleFieldChange}
                          fullWidth
                        />
                      ) : (
                        <Box display="flex" alignItems="center">
                          {selectedUser.age}
                          <IconButton onClick={() => enableFieldEditing("age")}>
                            <EditIcon />
                          </IconButton>
                        </Box>
                      )}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Date of Birth:</strong>
                    </TableCell>
                    <TableCell>
                      {editableFields.dateOfBirth ? (
                        <TextField
                          name="dateOfBirth"
                          value={selectedUser.dateOfBirth}
                          onChange={handleFieldChange}
                          fullWidth
                        />
                      ) : (
                        <Box display="flex" alignItems="center">
                          {selectedUser.dateOfBirth}
                          <IconButton
                            onClick={() => enableFieldEditing("dateOfBirth")}
                          >
                            <EditIcon />
                          </IconButton>
                        </Box>
                      )}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Birth Certificate Number:</strong>
                    </TableCell>
                    <TableCell>
                      {editableFields.birthCertificateNumber ? (
                        <TextField
                          name="birthCertificateNumber"
                          value={selectedUser.birthCertificateNumber}
                          onChange={handleFieldChange}
                          fullWidth
                        />
                      ) : (
                        <Box display="flex" alignItems="center">
                          {selectedUser.birthCertificateNumber}
                          <IconButton
                            onClick={() =>
                              enableFieldEditing("birthCertificateNumber")
                            }
                          >
                            <EditIcon />
                          </IconButton>
                        </Box>
                      )}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>NIC:</strong>
                    </TableCell>
                    <TableCell>
                      {editableFields.nic ? (
                        <TextField
                          name="nic"
                          value={selectedUser.nic}
                          onChange={handleFieldChange}
                          fullWidth
                        />
                      ) : (
                        <Box display="flex" alignItems="center">
                          {selectedUser.nic}
                          <IconButton onClick={() => enableFieldEditing("nic")}>
                            <EditIcon />
                          </IconButton>
                        </Box>
                      )}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Emergency Contact Name:</strong>
                    </TableCell>
                    <TableCell>
                      {editableFields.emergencyContactName ? (
                        <TextField
                          name="emergencyContactName"
                          value={selectedUser.emergencyContactName}
                          onChange={handleFieldChange}
                          fullWidth
                        />
                      ) : (
                        <Box display="flex" alignItems="center">
                          {selectedUser.emergencyContactName}
                          <IconButton
                            onClick={() =>
                              enableFieldEditing("emergencyContactName")
                            }
                          >
                            <EditIcon />
                          </IconButton>
                        </Box>
                      )}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Emergency Contact Number:</strong>
                    </TableCell>
                    <TableCell>
                      {editableFields.emergencyContactNumber ? (
                        <TextField
                          name="emergencyContactNumber"
                          value={selectedUser.emergencyContactNumber}
                          onChange={handleFieldChange}
                          fullWidth
                        />
                      ) : (
                        <Box display="flex" alignItems="center">
                          {selectedUser.emergencyContactNumber}
                          <IconButton
                            onClick={() =>
                              enableFieldEditing("emergencyContactNumber")
                            }
                          >
                            <EditIcon />
                          </IconButton>
                        </Box>
                      )}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdateUser} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the user with email{" "}
            {userToDelete?.email}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirmOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteUser} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ViewUser;
