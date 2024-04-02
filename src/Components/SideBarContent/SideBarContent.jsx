import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import QrCodeContent from '../QrCodeContent/QrCodeContent'; // Corrected import statement
import PationListComponent from '../PationListComponent/PationListComponent'; // Corrected import statement
import LabInfomationContent from '../LabInfomationContent/LabInfomationContent';
import QrCodeContent2 from '../QrCodeContent/QrCodeContent2';
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: screen.height }}
    >
      
      <Tabs
        orientation="vertical"
        variant="f"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider',}}
      >
        <Tab label="Home" {...a11yProps(0)} sx={{ fontSize: '20px', }} />
        <Tab label="Upload" {...a11yProps(1)} sx={{ fontSize: '20px' }} />
        <Tab label="Scane" {...a11yProps(2)} sx={{ fontSize: '20px' }} />
        <Tab label="Help Center" {...a11yProps(3)} sx={{ fontSize: '20px' }} />
        <Tab label="Log out" {...a11yProps(4)} sx={{ fontSize: '20px' }} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Typography variant="h6">Item One</Typography> 
        <div><LabInfomationContent/></div> {/* Including QRCodeContent component */}
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Typography variant="h6">Item Two</Typography>
        <div><PationListComponent/></div>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Typography variant="h6">Item Three</Typography>
        <div><QrCodeContent/></div>
        <div><QrCodeContent2/></div> Including QrCodeContent2 component
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Typography variant="h6">Item Four</Typography>
        <div><LabInfomationContent/></div>
      </TabPanel>
    </Box>
  );
}
