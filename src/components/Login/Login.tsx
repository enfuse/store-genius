import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

interface LoginProps {
    verify : (psw:string)=> void
}
export function Login({verify} : LoginProps) {
  const [password, setPassword] = React.useState<string>("");

  return (
    <div style={{display:"flex", justifyContent:"center"}} >
      <TextField
        type="password"
        label="Password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
      />
      <Button variant="outlined"
      onClick={()=>verify(password)}
      >
        Sign In</Button>
    </div>
  );
}
