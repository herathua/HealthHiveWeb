import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
  const [CreateOpen, setCreateOpen] = useState(false);
  

  const handleClickOpen = () => {
    setCreateOpen(true);
  };

  const handleClickClose = () => {
    setCreateOpen(false);
  };

  useEffect(() => {
    axios.get('http://localhost:33000/api/labs')
      .then(response => {
        setLabs(response.data);
      })
      .catch(error => {
        console.error('Error fetching labs:', error);
      });
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
    axios.put(`http://localhost:33000/api/labs/${selectedLab.id}`, selectedLab)
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
  };

  const handleDeleteLab = (id) => {
    axios.delete(`http://localhost:33000/api/labs/${id}`)
      .then(response => {
        if (response.status === 200) {
          setSnackbarMessage('Lab deleted successfully');
          setSnackbarSeverity('success');
          setSnackbarOpen(true);
          setLabs(labs.filter(lab => lab.id !== id));
        }
      })
      .catch(error => {
        setSnackbarMessage('Error deleting lab');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      });
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

      <Dialog open={CreateOpen} onClose={handleClickClose} fullWidth maxWidth="sm">
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
                  <Button variant="contained" color="error" style={{ marginLeft: '10px' }} onClick={() => handleDeleteLab(lab.id)}>Delete</Button>
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
                onChange={handleFieldChange}
                margin="dense"
                fullWidth
                disabled={!editableFields.labRegID}
                InputProps={{
                  endAdornment: (
                    <IconButton edge="end" onClick={() => enableFieldEditing('labRegID')}>
                      <EditIcon />
                    </IconButton>
                  ),
                }}
              />
              <TextField
                label="Lab Name"
                name="labName"
                value={selectedLab.labName}
                onChange={handleFieldChange}
                margin="dense"
                fullWidth
                disabled={!editableFields.labName}
                InputProps={{
                  endAdornment: (
                    <IconButton edge="end" onClick={() => enableFieldEditing('labName')}>
                      <EditIcon />
                    </IconButton>
                  ),
                }}
                inputProps={{
                  maxLength: 255,
                }}
              />
              <TextField
                label="Address"
                name="address"
                value={selectedLab.address}
                onChange={handleFieldChange}
                margin="dense"
                fullWidth
                disabled={!editableFields.address}
                InputProps={{
                  endAdornment: (
                    <IconButton edge="end" onClick={() => enableFieldEditing('address')}>
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
                value={selectedLab.email}
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
                label="Telephone"
                name="telephone"
                value={selectedLab.telephone}
                onChange={handleFieldChange}
                margin="dense"
                fullWidth
                disabled={!editableFields.telephone}
                InputProps={{
                  endAdornment: (
                    <IconButton edge="end" onClick={() => enableFieldEditing('telephone')}>
                      <EditIcon />
                    </IconButton>
                  ),
                }}
                inputProps={{
                  maxLength: 10,
                }}
              />
            </form>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateLab} color="primary">Update Lab</Button>
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

export default ViewLabs;