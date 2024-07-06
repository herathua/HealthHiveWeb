import React, { useState, useEffect } from 'react';
import {
  Paper, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
  TextField, Container, IconButton, Snackbar, Alert, Grid, Select, MenuItem, InputAdornment,
  Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import PersonalFormComponent from '../window/CreatePersonalAccount';
import { deleteUserAccountByemail,FetchUserAPI, ViewUserPutAPI } from '../../../services/apiService';

const ViewUser = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editableFields, setEditableFields] = useState({});
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [CreateOpen, setCreateOpen] = useState(false);
  

  const handleClickOpen = () => {
    setCreateOpen(true);
  };

  const handleClickClose = () => {
    setCreateOpen(false);
  };
  useEffect(() => {
    FetchUserAPI()
      .then(response => {
        setUsers(response.data);
        //window.location.reload();
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
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
    setSelectedUser({ ...selectedUser, [event.target.name]: event.target.value });
  };

  const enableFieldEditing = (fieldName) => {
    setEditableFields({ ...editableFields, [fieldName]: true });
  };

  const handleUpdateUser = () => {
    ViewUserPutAPI(selectedUser.id, selectedUser)
      .then(response => {
        if (response.status === 200) {
          setSnackbarMessage('User updated successfully');
          setSnackbarSeverity('success');
          setSnackbarOpen(true);
          setUsers(users.map(user => user.id === selectedUser.id ? selectedUser : user));
          handleEditClose();
          //window.location.reload();
        }
      })
      .catch(error => {
        setSnackbarMessage('Error updating user');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      });
  };

  const handleDeleteUser = (email) => {
    deleteUserAccountByemail(email)
      .then(response => {
        if (response.status === 200) {
          setSnackbarMessage('User deleted successfully');
          setSnackbarSeverity('success');
          setSnackbarOpen(true);
          setUsers(users.filter(user => user.email !== email));
          //window.location.reload();
        }
      })
      .catch(error => {
        setSnackbarMessage('Error deleting user');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      });
  };

  const filteredUsers = users.filter(user =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container maxWidth="lg">
    <div style={{ display: 'flex', marginBottom: '16px' }}>
      <Grid container spacing={2} justifyContent="center" style={{ margin: '20px 0' }}>
        <Grid item xs={12} sm={6} style={{ marginBottom: '5%',  display: 'flex',}}>
          <TextField
            label="Search by Email"
            variant="outlined"
            fullWidth
            sx={{ marginRight: '10px' }}
            value={searchTerm}
            onChange={handleSearch}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setSearchTerm('')}>
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
          height: '56px', // Adjust this value if necessary to match the height of the TextField
        }}
      >
        <AddIcon />
      </Button>

      <Dialog open={CreateOpen} onClose={handleClickClose} fullWidth maxWidth="sm">
        <DialogTitle>
          <div className="text-center text-4xl">
            Create User Account
          </div>
        </DialogTitle>
        <DialogContent>
          <PersonalFormComponent/>
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
      <TableContainer component={Paper} style={{ width: '100%' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell> #</TableCell>
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
                  <Button variant="contained" color="primary" onClick={() => handleView(user)}>View</Button>
                  <Button variant="contained" color="secondary" style={{ marginLeft: '10px' }} onClick={() => handleEdit(user)}>Edit</Button>
                  <Button variant="contained" color="error" style={{ marginLeft: '10px' }} onClick={() => handleDeleteUser(user.email)}>Delete</Button>
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
      <TableContainer >
        <Table>
          <TableBody>
            <TableRow>
              <TableCell><strong>ID:</strong></TableCell>
              <TableCell>{selectedUser.id}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><strong>Full Name:</strong></TableCell>
              <TableCell>{selectedUser.fullName}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><strong>Email:</strong></TableCell>
              <TableCell>{selectedUser.email}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><strong>Telephone Number:</strong></TableCell>
              <TableCell>{selectedUser.telephoneNumber}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><strong>Gender:</strong></TableCell>
              <TableCell>{selectedUser.gender}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><strong>Age:</strong></TableCell>
              <TableCell>{selectedUser.age}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><strong>Date of Birth:</strong></TableCell>
              <TableCell>{selectedUser.dateOfBirth}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><strong>Birth Certificate Number:</strong></TableCell>
              <TableCell>{selectedUser.birthCertificateNumber}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><strong>NIC:</strong></TableCell>
              <TableCell>{selectedUser.nic}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><strong>Emergency Contact Name:</strong></TableCell>
              <TableCell>{selectedUser.emergencyContactName}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><strong>Emergency Contact Number:</strong></TableCell>
              <TableCell>{selectedUser.emergencyContactNumber}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    )}
  </DialogContent>
  <DialogActions>
    <Button onClick={handleClose} color="primary">Close</Button>
  </DialogActions>
</Dialog>


      {/* Edit Dialog */}
      <Dialog open={editOpen} onClose={handleEditClose}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          {selectedUser && (
            <form>
              <TextField
                label="Full Name"
                name="fullName"
                value={selectedUser.fullName}
                onChange={handleFieldChange}
                margin="dense"
                fullWidth
                disabled={!editableFields.fullName}
                InputProps={{
                  endAdornment: (
                    <IconButton edge="end" onClick={() => enableFieldEditing('fullName')}>
                      <EditIcon />
                    </IconButton>
                  ),
                }}
                inputProps={{
                  maxLength: 255,
                }}
              />
              <TextField
                label="Email"
                name="email"
                value={selectedUser.email}
                onChange={handleFieldChange}
                margin="dense"
                fullWidth
                disabled={!editableFields.email}
                InputProps={{
                  endAdornment: (
                    <IconButton edge="end" onClick={() => enableFieldEditing('email')}>
                      <EditIcon />
                    </IconButton>
                  ),
                }}
                inputProps={{
                  maxLength: 255,
                }}
              />
              <TextField
                label="Telephone Number"
                name="telephoneNumber"
                value={selectedUser.telephoneNumber}
                onChange={handleFieldChange}
                margin="dense"
                fullWidth
                disabled={!editableFields.telephoneNumber}
                InputProps={{
                  endAdornment: (
                    <IconButton edge="end" onClick={() => enableFieldEditing('telephoneNumber')}>
                      <EditIcon />
                    </IconButton>
                  ),
                }}
                inputProps={{
                  maxLength: 255,
                }}
              />
              <TextField
                label="Age"
                name="age"
                value={selectedUser.age}
                onChange={handleFieldChange}
                margin="dense"
                fullWidth
                disabled={!editableFields.age}
                InputProps={{
                  endAdornment: (
                    <IconButton edge="end" onClick={() => enableFieldEditing('age')}>
                      <EditIcon />
                    </IconButton>
                  ),
                }}
                inputProps={{
                  maxLength: 3,
                }}
              />
              <TextField
                label="Date of Birth"
                name="dateOfBirth"
                value={selectedUser.dateOfBirth}
                onChange={handleFieldChange}
                margin="dense"
                fullWidth
                disabled={!editableFields.dateOfBirth}
                InputProps={{
                  endAdornment: (
                    <IconButton edge="end" onClick={() => enableFieldEditing('dateOfBirth')}>
                      <EditIcon />
                    </IconButton>
                  ),
                }}
              />
              <TextField
                label="Birth Certificate Number"
                name="birthCertificateNumber"
                value={selectedUser.birthCertificateNumber}
                onChange={handleFieldChange}
                margin="dense"
                fullWidth
                disabled={!editableFields.birthCertificateNumber}
                InputProps={{
                  endAdornment: (
                    <IconButton edge="end" onClick={() => enableFieldEditing('birthCertificateNumber')}>
                      <EditIcon />
                    </IconButton>
                  ),
                }}
                inputProps={{
                  maxLength: 5,
                }}
              />
              <TextField
                label="NIC"
                name="nic"
                value={selectedUser.nic}
                onChange={handleFieldChange}
                margin="dense"
                fullWidth
                disabled={!editableFields.nic}
                InputProps={{
                  endAdornment: (
                    <IconButton edge="end" onClick={() => enableFieldEditing('nic')}>
                      <EditIcon />
                    </IconButton>
                  ),
                }}
                inputProps={{
                  maxLength: 12,
                }}
              />
              <TextField
                label="Emergency Contact Name"
                name="emergencyContactName"
                value={selectedUser.emergencyContactName}
                onChange={handleFieldChange}
                margin="dense"
                fullWidth
                disabled={!editableFields.emergencyContactName}
                InputProps={{
                  endAdornment: (
                    <IconButton edge="end" onClick={() => enableFieldEditing('emergencyContactName')}>
                      <EditIcon />
                    </IconButton>
                  ),
                }}
                inputProps={{
                  maxLength: 60,
                }}
              />
              <TextField
                label="Emergency Contact Number"
                name="emergencyContactNumber"
                value={selectedUser.emergencyContactNumber}
                onChange={handleFieldChange}
                margin="dense"
                fullWidth
                disabled={!editableFields.emergencyContactNumber}
                InputProps={{
                  endAdornment: (
                    <IconButton edge="end" onClick={() => enableFieldEditing('emergencyContactNumber')}>
                      <EditIcon />
                    </IconButton>
                  ),
                }}
                inputProps={{
                  maxLength: 10,
                }}
              />
              <Select
                label="Gender"
                name="gender"
                value={selectedUser.gender}
                onChange={handleFieldChange}
                margin="dense"
                fullWidth
                disabled={!editableFields.gender}
                inputProps={{
                  endAdornment: (
                    <IconButton edge="end" onClick={() => enableFieldEditing('gender')}>
                      <EditIcon />
                    </IconButton>
                  ),
                }}
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
            </form>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateUser} color="primary">Update User</Button>
          <Button onClick={handleEditClose} color="secondary">Cancel</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)}>
        <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ViewUser;
