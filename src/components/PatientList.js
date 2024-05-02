import React, { useState, useEffect, useRef } from 'react';
import { Button, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, withStyles,
  makeStyles,
  Select,
  MenuItem,
  Snackbar,
  Box,
} from '@material-ui/core';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#808080',
    color: theme.palette.common.white,
    textAlign: 'center', // Centered text
  },
  body: {
    fontSize: 14,
    textAlign: 'center', // Centered text
    padding: 0, // No padding
  },
}))(TableCell);

const useStyles = makeStyles({
  root: {
    padding: '20px',
  },
  actionButtons: {
    '& > *': {
      margin: '5px',
    },
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '20px',
  },
  pageButton: {
    minWidth: 'unset',
    padding: '6px',
  },
  tableContainer: {
    margin: 'auto',
    width: '80%', // Adjusted width to fit the table
    padding: '20px',
  },
});

const PatientList = ({ patients, onEdit, onDelete, currentPage, itemsPerPage }) => {
  const [editedPatient, setEditedPatient] = useState(null);
  const [saveSuccess, setSaveSuccess] = useState(false); // State for Save Successful message
  const [deleteSuccess, setDeleteSuccess] = useState(false); // State for Delete Successful message
  const classes = useStyles();
  const snackbarRef = useRef(null); // Ref for Snackbar

  const calculateSerialNumber = (index) => {
    return (currentPage - 1) * itemsPerPage + index + 1;
  };

  const handleEdit = (patient) => {
    console.log('Editing patient:', patient);
    setEditedPatient({ ...patient });
  };

  const handleSave = () => {
    if (editedPatient) {
      onEdit(editedPatient);
      console.log('Saving patient:', editedPatient);
      setEditedPatient(null);
      setSaveSuccess(true); // Show Save Successful message
    }
  };

  const handleDelete = (patient) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this patient?');
    if (isConfirmed) {
      onDelete(patient);
      console.log('Deleting patient:', patient);
      setDeleteSuccess(true); // Show Delete Successful message
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedPatient((prev) => ({ ...prev, [name]: value }));
  };

  const handleCloseSnackbar = () => {
    setSaveSuccess(false);
    setDeleteSuccess(false);
  };

  return (
    <div className={classes.root}>
      <Typography variant="h4" align="center" gutterBottom>
        View patients
      </Typography>
      <Box className={classes.tableContainer}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell>SI No.</StyledTableCell>
                <StyledTableCell>Full Name</StyledTableCell>
                <StyledTableCell>Age</StyledTableCell>
                <StyledTableCell>Gender</StyledTableCell>
                <StyledTableCell>Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {patients.map((patient, index) => (
                <TableRow key={patient.id}>
                  <StyledTableCell>{calculateSerialNumber(index)}</StyledTableCell> {/* Serial Number */}
                  <StyledTableCell>
                    {editedPatient && editedPatient.id === patient.id ? (
                      <TextField
                        name="name"
                        value={editedPatient.name}
                        variant="outlined"
                        size="small"
                        fullWidth // Adjusted to fit the cell
                        onChange={handleChange}
                      />
                    ) : (
                      patient.name
                    )}
                  </StyledTableCell>
                  <StyledTableCell>
                    {editedPatient && editedPatient.id === patient.id ? (
                      <TextField
                        name="age"
                        value={editedPatient.age}
                        variant="outlined"
                        size="small"
                        type="number"
                        fullWidth // Adjusted to fit the cell
                        onChange={handleChange}
                      />
                    ) : (
                      patient.age
                    )}
                  </StyledTableCell>
                  <StyledTableCell>
                    {editedPatient && editedPatient.id === patient.id ? (
                      <Select
                        name="gender"
                        value={editedPatient.gender}
                        onChange={handleChange}
                        variant="outlined"
                        size="small"
                        fullWidth // Adjusted to fit the cell
                      >
                        <MenuItem value="Male">Male</MenuItem>
                        <MenuItem value="Female">Female</MenuItem>
                        <MenuItem value="Other">Other</MenuItem>
                      </Select>
                    ) : (
                      patient.gender
                    )}
                  </StyledTableCell>
                  <StyledTableCell className={classes.actionButtons}>
                    {editedPatient && editedPatient.id === patient.id ? (
                      <>
                        <Button
                          size="small"
                          onClick={handleSave}
                        >
                          Save
                        </Button>
                        <Button
                          size="small"
                          onClick={() => setEditedPatient(null)}
                        >
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          size="small"
                          onClick={() => handleEdit(patient)}
                        >
                          Edit
                        </Button>
                        <Button
                          size="small"
                          onClick={() => handleDelete(patient)}
                        >
                          Delete
                        </Button>
                      </>
                    )}
                  </StyledTableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Snackbar
        open={saveSuccess}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message="Save Successful"
        ref={snackbarRef} // Added ref here
      />
      <Snackbar
        open={deleteSuccess}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message="Delete Successful"
        ref={snackbarRef} // Added ref here
      />
    </div>
  );
};

const App = () => {
  const [page, setPage] = useState(1);
  const [itemsPerPage] = useState(10); // Change this to set the number of items per page
  const [patientsData, setPatientsData] = useState([]);

  // Generate 10 pages of patient data with 5 patients per page
  useEffect(() => {
    const newPatientsData = [];
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 5; j++) {
        const id = newPatientsData.length + j + 1;
        newPatientsData.push({
          id,
          name: `Patient ${id}`, // Corrected the template string
          age: Math.floor(Math.random() * 50) + 20, // Random age between 20 and 70
          gender: Math.random() > 0.5 ? 'Male' : 'Female', // Random gender
        });
      }
    }
    setPatientsData(newPatientsData);
  }, []);

  // Pagination
  const totalPages = Math.ceil(patientsData.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, patientsData.length);
  const paginatedPatients = patientsData.slice(startIndex, endIndex);
  
  const classes = useStyles();

  const handleEdit = (editedPatient) => {
    setPatientsData((prevPatients) =>
      prevPatients.map((patient) =>
        patient.id === editedPatient.id ? editedPatient : patient
      )
    );
  };

  const handleDelete = (deletedPatient) => {
    setPatientsData((prevPatients) =>
      prevPatients.filter((patient) => patient.id !== deletedPatient.id)
    );
  };

  const handlePrevPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  return (
    <div>
      <PatientList patients={paginatedPatients} onEdit={handleEdit} onDelete={handleDelete} currentPage={page} itemsPerPage={itemsPerPage} />
      <div className={classes.pagination}>
        <Button onClick={handlePrevPage} disabled={page === 1} className={classes.pageButton} startIcon={<KeyboardArrowLeft />}>
          Prev
        </Button>
        <Typography>Page {page} of {totalPages}</Typography>
        <Button onClick={handleNextPage} disabled={page === totalPages} className={classes.pageButton} endIcon={<KeyboardArrowRight />}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default App;
