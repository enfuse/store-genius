import React from 'react';
import './App.css';
import {FeedbackForm} from './components/FeedbackForm/FeedbackForm'
import { Navigation } from './components/Navigation/Navigation';
import { Login } from './components/Login/Login';
import { Typography } from '@mui/material';

function App() {
  const [isSignedIn, setSignedIn] = React.useState(false)
  const [isWrongPassword, setWrongPassword] = React.useState(false)
  const verifyPassowrd = (psw:string)=>{
    if (psw == import.meta.env.VITE_REACT_APP_PASSCODE ){
      setWrongPassword(false)
      setSignedIn(true) 
    }
    else {
      setWrongPassword(true)
    }
  }
  return (
    <div className="store-genius">
      <Typography align="center" variant="h2" >Store Genius</Typography>
      {isSignedIn ? 
      <>
        <Navigation />
        <FeedbackForm />
      </>
      : 
      <>
        <div style = {{display:"flex", flexDirection:"column", alignItems:"center"}}>
            <Login verify={verifyPassowrd}/>
            {isWrongPassword ? <>Wrong Password! Try again </>: <></>}

        </div>
      </>
      }
    </div> 
  );
}

export default App;
