import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';

import TabPanel from '@mui/lab/TabPanel';
import { OperationsDashboard } from '../OperationsDashboard/OperationsDashboard';
import { BeerDemo } from '../BeerDemo/BeerDemo';
import { MatterportDemo } from '../MatterportDemo/MatterportDemo';
import { StoreViewer } from '../StoreViewer/StoreViewer';

export const Navigation =() => {
  const [value, setValue] = React.useState('ops');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{borderTop: '1px solid rgba(0, 0, 0, 0.12)'}}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} centered>
            <Tab label="Operations" value="ops" />
            <Tab label="Beer Recomendation Demo" value="beer-demo" />
            <Tab label="Matterport Demo" value="materport-demo" />
            <Tab label="Store Viewer " value="store-viewer" />
          </TabList>
        </Box>
        <TabPanel value="ops">
            <OperationsDashboard/>
        </TabPanel>
        <TabPanel value="beer-demo">
            <BeerDemo/>
        </TabPanel>
        <TabPanel value="materport-demo"> 
            <MatterportDemo/>
        </TabPanel>
        <TabPanel value="store-viewer">
            <StoreViewer/>
        </TabPanel>
      </TabContext>
    </Box>
  );
}