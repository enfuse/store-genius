import React from 'react';
import './App.css';
import {FeedbackForm} from './components/FeedbackForm/FeedbackForm'
import { Navigation } from './components/Navigation/Navigation';
import { Typography } from '@mui/material';
function App() {
  return (
    <div className="store-genius">
      <Typography align="center" variant="h2" >Store Genius</Typography>
      <Navigation/>
      <FeedbackForm/>
    </div>
  );
}

export default App;
