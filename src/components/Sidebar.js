import React from 'react';
import { AppBar, Toolbar, Box, Drawer, List, ListItem, ListItemIcon, ListItemText, Collapse } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveSlice, setDrawerOpen } from '../features/drawer/drawerSlice';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import PersonIcon from '@mui/icons-material/Person';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { useNavigate } from 'react-router-dom';

export default function Sidebar() {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.drawer.isOpen);
  const navigate = useNavigate();

  const [openPatient, setOpenPatient] = React.useState(false);

  const handlePatientClick = () => {
    setOpenPatient(!openPatient);
  };

  const handleAddPatientClick = () => {
    dispatch(setDrawerOpen(false));
    navigate('/addPatient');
  };

  const handlePatientListClick = () => {
    dispatch(setDrawerOpen(false));
    navigate('/patientList');
  };

  return (
    <Drawer
      variant="persistent"
      open={isOpen}
      onClose={() => dispatch(setActiveSlice(null))}
    >
      <AppBar position="static" color="inherit">
        <Toolbar>
          <Box display="flex" alignItems="center" justifyContent="center" width="100%">
            <img src="/download.png" alt="Logo" style={{ height: '40px', marginRight: '10px' }} />
          </Box>
        </Toolbar>
      </AppBar>
      <List>
        <ListItem button onClick={handlePatientClick}>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="Patient" />
          {openPatient ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openPatient} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button onClick={handleAddPatientClick}>
              <ListItemIcon>
                <AddCircleOutlineIcon />
              </ListItemIcon>
              <ListItemText primary="Add Patient" />
            </ListItem>
            <ListItem button onClick={handlePatientListClick}>
              <ListItemIcon>
                <ListAltIcon />
              </ListItemIcon>
              <ListItemText primary="Patient List" />
            </ListItem>
          </List>
        </Collapse>
      </List>
    </Drawer>
  );
}
