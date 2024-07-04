import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table,Select, MenuItem,TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Button, Dialog, DialogActions, DialogContent, DialogTitle,
  TextField, Container, IconButton, Snackbar, Alert, Grid, InputAdornment
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import HealthForm1 from '../HealthForm';

const ViewDailyTips = () => {
  const [tips, setTips] = useState([]);
  const [selectedTip, setSelectedTip] = useState(null);
  const [editableFields, setEditableFields] = useState({});
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [createOpen, setCreateOpen] = useState(false);

  const handleClickOpen = () => {
    setCreateOpen(true);
  };

  const handleClickClose = () => {
    setCreateOpen(false);
  };

  useEffect(() => {
    axios.get('http://localhost:33000/api/dailyTips')
      .then(response => {
        setTips(response.data);
      })
      .catch(error => {
        console.error('Error fetching dailyTips:', error);
      });
  }, []);

  const handleView = (tip) => {
    setSelectedTip(tip);
    setOpen(true);
  };

  const handleEdit = (tip) => {
    setSelectedTip(tip);
    setEditableFields({});
    setEditOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedTip(null);
  };

  const handleEditClose = () => {
    setEditOpen(false);
    setSelectedTip(null);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFieldChange = (event) => {
    setSelectedTip({ ...selectedTip, [event.target.name]: event.target.value });
  };

  const enableFieldEditing = (fieldName) => {
    setEditableFields({ ...editableFields, [fieldName]: true });
  };

  const handleUpdateTip = () => {
    axios.put(`http://localhost:33000/api/dailyTips/${selectedTip.id}`, selectedTip)
      .then(response => {
        if (response.status === 200) {
          setSnackbarMessage('Tip updated successfully');
          setSnackbarSeverity('success');
          setSnackbarOpen(true);
          setTips(tips.map(tip => tip.id === selectedTip.id ? selectedTip : tip));
          handleEditClose();
          window.location.reload();
        }
      })
      .catch(error => {
        setSnackbarMessage('Error updating tip');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      });
  };

  const handleDeleteTip = (id) => {
    axios.delete(`http://localhost:33000/api/dailyTips/${id}`)
      .then(response => {
        if (response.status === 200) {
          setSnackbarMessage('Tip deleted successfully');
          setSnackbarSeverity('success');
          setSnackbarOpen(true);
          setTips(tips.filter(tip => tip.id !== id));
          window.location.reload();
        }
      })
      .catch(error => {
        setSnackbarMessage('Error deleting tip');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      });
  };

  const filteredTips = tips.filter(tip => {
    const tipName = tip.tipName ? tip.tipName.toLowerCase() : '';
    const email = tip.email ? tip.email.toLowerCase() : '';
    return tipName.includes(searchTerm.toLowerCase()) || email.includes(searchTerm.toLowerCase());
  });

  return (
    <Container maxWidth="lg">
      <div style={{ display: 'flex', marginBottom: '16px' }}>
        <Grid>
          <Grid item xs={12} sm={6} style={{ marginBottom: '5%', display: 'flex' }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleClickOpen}
              sx={{ height: '56px' }}
            >
              <p className="pr-5">Add daily tip</p>
              <AddIcon />
            </Button>

            <Dialog open={createOpen} onClose={handleClickClose} fullWidth maxWidth="sm">
              <DialogTitle>
                <div className="text-center text-4xl">
                Add daily tip
                </div>
              </DialogTitle>
              <DialogContent>
                <HealthForm1 />
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
              <TableCell>Type</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTips.map((tip, index) => (
              <TableRow key={tip.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{tip.id}</TableCell>

                <TableCell>{tip.type}</TableCell>
                <TableCell>{tip.date}</TableCell>
                <TableCell>
                  <Button variant="contained" color="primary" onClick={() => handleView(tip)}>View</Button>
                  <Button variant="contained" color="secondary" style={{ marginLeft: '10px' }} onClick={() => handleEdit(tip)}>Edit</Button>
                  <Button variant="contained" color="error" style={{ marginLeft: '10px' }} onClick={() => handleDeleteTip(tip.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* View Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Daily Tip Details</DialogTitle>
        <DialogContent>
          <TableContainer style={{ marginBottom: '20px' }}>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell><strong>ID:</strong></TableCell>
                  <TableCell>{selectedTip && selectedTip.id}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Tip :</strong></TableCell>
                  <TableCell>{selectedTip && selectedTip.tip}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell><strong>Type:</strong></TableCell>
                  <TableCell>{selectedTip && selectedTip.type}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Date:</strong></TableCell>
                  <TableCell>{selectedTip && selectedTip.date}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">Close</Button>
        </DialogActions>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={editOpen} onClose={handleEditClose}>
        <DialogTitle>Edit Tip</DialogTitle>
        <DialogContent>
          {selectedTip && (
            <form>
              <TextField
                label="Tip Registration ID"
                name="tip"
                value={selectedTip.tip}
                onChange={handleFieldChange}
                fullWidth
                margin="normal"
                disabled={!editableFields.tip}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => enableFieldEditing('tip')}>
                        <EditIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Select
                label="Type"
                name="type"
                value={selectedTip.type}
                onChange={handleFieldChange}
                fullWidth
                margin="normal"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => enableFieldEditing('type')}>
                        <EditIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              >
                <MenuItem value="Health News">Health News</MenuItem>
                <MenuItem value="Health Warnings">Health Warnings</MenuItem>
                <MenuItem value="Health Tips">Health Tips</MenuItem>
              </Select>
            </form>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose} color="primary">Cancel</Button>
          <Button onClick={handleUpdateTip} color="primary">Save</Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ViewDailyTips;
