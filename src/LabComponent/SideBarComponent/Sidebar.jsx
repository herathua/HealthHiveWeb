import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
  Box,
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import TableChartIcon from '@mui/icons-material/TableChart';
import QrCodeIcon from '@mui/icons-material/QrCode';

function Sidebar({ isOpen, toggleSidebar, handleComponentChange, handleLogout }) {
  return (
    <>
      {/* Icon button to toggle the sidebar */}
      <IconButton
        onClick={toggleSidebar}
        color="inherit"
        aria-label="open drawer"
        edge="start"
        sx={{ padding: 2 }} // Larger padding for easier click
      >
        <ArrowForwardIosIcon sx={{ color: '#1E88E5', borderRadius: '50%' }} /> {/* Blue menu icon */}
      </IconButton>

      {/* Drawer with rounded corners */}
      <Drawer
        open={isOpen}
        onClose={toggleSidebar}
        BackdropProps={{ invisible: true }}
        sx={{
          '.MuiDrawer-paper': {
            backgroundColor: '#F5F5F5',
            borderRadius: '16px', // Adds rounded corners
            padding: 2,
            width: isOpen ? 250 : 60, // Adjust width based on open state
            overflow: 'hidden',
          },
        }}
      >
        {isOpen && (
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <IconButton onClick={toggleSidebar}>
              <ArrowBackIosIcon sx={{ color: '#1E88E5' }} />
            </IconButton>
          </Box>
        )}

        <List sx={{ width: '100%', backgroundColor: '#F5F5F5', borderRadius: '16px' }}>
          {/* Dashboard */}
          <ListItem
            button
            onClick={() => handleComponentChange(3)}
            sx={{
              borderRadius: '12px', // Rounds the list item
              '&:hover': { backgroundColor: '#BBDEFB' },
            }}
          >
            <ListItemIcon>
              <QrCodeIcon sx={{ color: '#1565C0', borderRadius: '50%' }} /> {/* Rounded icon */}
            </ListItemIcon>
            <ListItemText primary="Qr Code" sx={{ color: '#1565C0' }} />
          </ListItem>
          {/* Dashboard */}
          <ListItem
            button
            onClick={() => handleComponentChange(2)}
            sx={{
              borderRadius: '12px', // Rounds the list item
              '&:hover': { backgroundColor: '#BBDEFB' },
            }}
          >
            <ListItemIcon>
              <TableChartIcon sx={{ color: '#1565C0', borderRadius: '50%' }} /> {/* Rounded icon */}
            </ListItemIcon>
            <ListItemText primary="Table" sx={{ color: '#1565C0' }} />
          </ListItem>

          {/* Settings */}
          <ListItem
            button
            onClick={() => handleComponentChange(5)}
            sx={{
              borderRadius: '12px', // Rounds the list item
              '&:hover': { backgroundColor: '#BBDEFB' },
            }}
          >
            <ListItemIcon>
              <SettingsIcon sx={{ color: '#1565C0', borderRadius: '50%' }} />
            </ListItemIcon>
            <ListItemText primary="Settings" sx={{ color: '#1565C0' }} />
          </ListItem>

          <Divider sx={{ backgroundColor: '#BDBDBD', margin:2 }} /> {/* Rounded divider */}

          {/* Logout */}
          <ListItem
            button
            onClick={handleLogout}
            sx={{
              borderRadius: '12px',
              backgroundColor: '#FFCDD2',
              '&:hover': { backgroundColor: '#BBDEFB' },
            }}
          >
            <ListItemIcon>
              <ExitToAppIcon sx={{ color: '#D32F2F', borderRadius: '50%' }} />
            </ListItemIcon>
            <ListItemText primary="Logout" sx={{ color: '#D32F2F' }} />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}

export default Sidebar;
