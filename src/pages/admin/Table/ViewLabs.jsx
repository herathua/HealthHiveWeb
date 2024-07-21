import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
  TextField, Container, IconButton, Snackbar, Alert, Grid, InputAdornment
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import LabFormComponent from '../window/LabFormComponent';

const ViewLabs = () => {
  const [labs, setLabs] = useState([]);
  const [selectedLab, setSelectedLab] = useState(null);
  const [editableFields, setEditableFields] = useState({});
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [createOpen, setCreateOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [labToDelete, setLabToDelete] = useState(null);

  const handleClickOpen = () => {
    setCreateOpen(true);
  };

  const handleClickClose = () => {
    setCreateOpen(false);
  };

  useEffect(() => {
    const authToken = Cookies.get('authToken');
    try {
      if (!authToken) {
        throw new Error('No auth token available');
      }
      const headers = {
        'Authorization': 'Bearer ' + authToken // Set the token in headers
      };
      axios.get('http://13.202.67.81:10000/usermgtapi/api/labs', { headers })
        .then(response => {
          setLabs(response.data);
        })
        .catch(error => {
          console.error('Error fetching labs:', error);
        });
    } catch (error) {
      console.error('Authentication error:', error);
    }
  }, []);

  const handleView = (lab) => {
    setSelectedLab(lab);
    setOpen(true);
  };

  const handleEdit = (lab) => {
    setSelectedLab(lab);
    setEditableFields({});
    setEditOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedLab(null);
  };

  const handleEditClose = () => {
    setEditOpen(false);
    setSelectedLab(null);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFieldChange = (event) => {
    setSelectedLab({ ...selectedLab, [event.target.name]: event.target.value });
  };

  const enableFieldEditing = (fieldName) => {
    setEditableFields({ ...editableFields, [fieldName]: true });
  };

  const handleUpdateLab = () => {
    const authToken = Cookies.get('authToken');
    try {
      if (!authToken) {
        throw new Error('No auth token available');
      }
      const headers = {
        'Authorization': 'Bearer ' + authToken // Set the token in headers
      };
      axios.put(`http://13.202.67.81:10000/usermgtapi/api/labs/${selectedLab.id}`, selectedLab, { headers })
        .then(response => {
          if (response.status === 200) {
            setSnackbarMessage('Lab updated successfully');
            setSnackbarSeverity('success');
            setSnackbarOpen(true);
            setLabs(labs.map(lab => lab.id === selectedLab.id ? selectedLab : lab));
            handleEditClose();
          }
        })
        .catch(error => {
          setSnackbarMessage('Error updating lab');
          setSnackbarSeverity('error');
          setSnackbarOpen(true);
        });
    } catch (error) {
      console.error('Error handling auth token:', error);
      setSnackbarMessage('Error handling authentication');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleDeleteLab = () => {
    const authToken = Cookies.get('authToken');
    try {
      if (!authToken) {
        throw new Error('No auth token available');
      }
      const headers = {
        'Authorization': 'Bearer ' + authToken // Set the token in headers
      };
      axios.delete(`http://13.202.67.81:10000/usermgtapi/api/labs/${labToDelete}`, { headers })
        .then(response => {
          if (response.status === 200) {
            setSnackbarMessage('Lab deleted successfully');
            setSnackbarSeverity('success');
            setSnackbarOpen(true);
            setLabs(labs.filter(lab => lab.id !== labToDelete));
            setConfirmOpen(false);
          }
        })
        .catch(error => {
          setSnackbarMessage('Error deleting lab');
          setSnackbarSeverity('error');
          setSnackbarOpen(true);
        });
    } catch (error) {
      setSnackbarMessage(error.message);
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
};


  const handleDeleteConfirm = (id) => {
    setLabToDelete(id);
    setConfirmOpen(true);
  };

  const filteredLabs = labs.filter(lab =>
    lab.labName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lab.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container maxWidth="lg">
    <div style={{ display: 'flex', marginBottom: '16px' }}>
      <Grid container spacing={2} justifyContent="center" style={{ margin: '20px 0' }}>
        <Grid item xs={12} sm={6} style={{ marginBottom: '5%',  display: 'flex',}}>
          <TextField
            label="Search by Lab Name or Email"
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

      <Dialog open={createOpen} onClose={handleClickClose} fullWidth maxWidth="sm">
        <DialogTitle>
          <div className="text-center text-4xl">
            Create Lab Account
          </div>
        </DialogTitle>
        <DialogContent>
          <LabFormComponent/>
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
              <TableCell>#</TableCell>
              <TableCell>ID</TableCell>
              <TableCell>Lab Registration ID</TableCell>
              <TableCell>Lab Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Telephone</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredLabs.map((lab, index) => (
              <TableRow key={lab.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{lab.id}</TableCell>
                <TableCell>{lab.labRegID}</TableCell>
                <TableCell>{lab.labName}</TableCell>
                <TableCell>{lab.email}</TableCell>
                <TableCell>{lab.telephone}</TableCell>
                <TableCell>
                  <Button variant="contained" color="primary" onClick={() => handleView(lab)}>View</Button>
                  <Button variant="contained" color="secondary" style={{ marginLeft: '10px' }} onClick={() => handleEdit(lab)}>Edit</Button>
                  <Button variant="contained" color="error" style={{ marginLeft: '10px' }} onClick={() => handleDeleteConfirm(lab.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* View Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Lab Details</DialogTitle>
        <DialogContent>
          <TableContainer style={{ marginBottom: '20px' }}>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell><strong>ID:</strong></TableCell>
                  <TableCell>{selectedLab && selectedLab.id}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Lab Registration ID:</strong></TableCell>
                  <TableCell>{selectedLab && selectedLab.labRegID}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Lab Name:</strong></TableCell>
                  <TableCell>{selectedLab && selectedLab.labName}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Address:</strong></TableCell>
                  <TableCell>{selectedLab && selectedLab.address}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Email:</strong></TableCell>
                  <TableCell>{selectedLab && selectedLab.email}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Telephone:</strong></TableCell>
                  <TableCell>{selectedLab && selectedLab.telephone}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">Close</Button>
        </DialogActions>
      </Dialog>



      <Dialog open={editOpen} onClose={handleEditClose}>
        <DialogTitle>Edit Lab</DialogTitle>
        <DialogContent>
          {selectedLab && (
            <form>
              <TextField
                label="Lab Registration ID"
                name="labRegID"
                value={selectedLab.labRegID}
                fullWidth
                margin="normal"
                disabled={!editableFields.labRegID}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => enableFieldEditing('labRegID')}>
                        <EditIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                onChange={handleFieldChange}
              />
              <TextField
                label="Lab Name"
                name="labName"
                value={selectedLab.labName}
                fullWidth
                margin="normal"
                disabled={!editableFields.labName}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => enableFieldEditing('labName')}>
                        <EditIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                onChange={handleFieldChange}
              />
              <TextField
                label="Address"
                name="address"
                value={selectedLab.address}
                fullWidth
                margin="normal"
                disabled={!editableFields.address}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => enableFieldEditing('address')}>
                        <EditIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                onChange={handleFieldChange}
              />
              <TextField
                label="Email"
                name="email"
                value={selectedLab.email}
                fullWidth
                margin="normal"
                disabled={!editableFields.email}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => enableFieldEditing('email')}>
                        <EditIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                onChange={handleFieldChange}
              />
              <TextField
                label="Telephone"
                name="telephone"
                value={selectedLab.telephone}
                fullWidth
                margin="normal"
                disabled={!editableFields.telephone}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => enableFieldEditing('telephone')}>
                        <EditIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                onChange={handleFieldChange}
              />
            </form>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose} color="primary">Cancel</Button>
          <Button onClick={handleUpdateLab} color="primary">Save</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this lab? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteLab} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)}>
        <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ViewLabs;
