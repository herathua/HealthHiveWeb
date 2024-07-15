import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { 
  Box, 
  TextField, 
  Button, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Typography,
  Container,
  Grid
} from '@mui/material';
import { styled } from '@mui/material/styles';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { fetchReports } from '../../services/apiService';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  '&.MuiTableCell-head': {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  '&.MuiTableCell-body': {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const LabOldUploadsComponent = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [data, setData] = useState([]);

    const fetchData = async () => {
        try {
            const authToken = Cookies.get('authToken');
            if (!authToken) {
                throw new Error('No auth token available');
            }

            const headers = {
                'Authorization': 'Bearer ' + authToken
            };

            const formattedStartDate = startDate ? new Date(startDate).toISOString() : '';
            const formattedEndDate = endDate ? new Date(endDate).toISOString() : '';

            const response = await fetchReports(formattedStartDate, formattedEndDate, headers);
            //console.log('API response:', response);

            setData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleSearch = () => {
        fetchData();
    };

    const formatDate = (dateString) => {
        const options = {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
          timeZone: 'UTC'
        };
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-GB', options).format(date).replace(',', '');
      };
    const handleDownloadPDF = () => {
        const doc = new jsPDF();
        doc.text("Laboratory Reports", 14, 15);
        
        const tableColumn = ["Lab ID", "File Name", "CID of the file", "Lab Request ID", "Date Created"];
        const tableRows = data.map(item => [
            item.labid,
            item.description,
            item.fileName,
            item.labRequestId,
            formatDate(item.dateCreated),
        ]);

        doc.autoTable({
            head: [tableColumn],
            body: tableRows,
            startY: 20
        });

        doc.save("Laboratory Reports.pdf");
    };

    return (
        <Container maxWidth="lg">
            <Box sx={{ my: 4 }}>
                <Typography variant="h4" component="h1" fontWeight="bold" mb={4}>
                    Laboratory Reports
                </Typography>
                <Grid container spacing={2} mb={4}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Start Date"
                            type="datetime-local"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="End Date"
                            type="datetime-local"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                </Grid>
                <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
                    <Button variant="contained" onClick={handleSearch}>
                        Search
                    </Button>
                    <Button variant="outlined" onClick={handleDownloadPDF} disabled={data.length === 0}>
                        Download PDF
                    </Button>
                </Box>

                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Lab ID</StyledTableCell>
                                <StyledTableCell>File Name</StyledTableCell>
                                <StyledTableCell>CID of the file</StyledTableCell>
                                <StyledTableCell>Lab Request ID</StyledTableCell>
                                <StyledTableCell>Date Created</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Array.isArray(data) && data.length > 0 ? (
                                data.map((item) => (
                                    <StyledTableRow key={item.id}>
                                        <StyledTableCell>{item.labid}</StyledTableCell>
                                        <StyledTableCell>{item.description}</StyledTableCell>
                                        <StyledTableCell>{item.fileName}</StyledTableCell>
                                        <StyledTableCell>{item.labRequestId}</StyledTableCell>
                                        <StyledTableCell>{formatDate(item.dateCreated)}</StyledTableCell>
                                    </StyledTableRow>
                                ))
                            ) : (
                                <StyledTableRow>
                                    <StyledTableCell colSpan={5} align="center">No data found</StyledTableCell>
                                </StyledTableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Container>
    );
};

export default LabOldUploadsComponent;
