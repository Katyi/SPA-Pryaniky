import { useNavigate} from "react-router-dom";

import React, { useState } from 'react';
import { Button, ButtonGroup, TextField, Typography} from '@mui/material';

type Auth = {
  username: string;
  password: string;
}

export const Login = ()=> {
  const navigate = useNavigate();
  const [userAuth, setUserAuth] = useState<Auth>({
    username: "", 
    password: "",
  });
  const [indForMessage, setIndForMessage] = useState(0);
  const token = localStorage.getItem("token");
 
  const signUpUser = async (e:React.MouseEvent<HTMLElement>) =>{
    e.preventDefault();
    console.log(process.env.REACT_APP_REACT_API)
    let result = await fetch(`${process.env.REACT_APP_REACT_API}/ru/data/v3/testmethods/docs/login`, 
    {
      method: 'POST',
      headers: {'Content-Type': 'application/json', 
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE, PUT",
      "Access-Control-Allow-Headers": "x-requested-with, Content-Type, origin, authorization, accept, x-access-token"},
      body: JSON.stringify({
          username: userAuth.username,
          password: userAuth.password,
      }),
    }).then(function(resp)
    {
      return resp.json()
    }).catch(error=>console.log(error));
    if (result.error_code !== 0) {
      setIndForMessage(1);
      return;
    }
    console.log(result);
    let token = result.data.token;
    localStorage.setItem("token", token);
    navigate('/main')
  };
      
  return (
    <React.Fragment>
      {!token &&
          <Typography variant='h5' fontWeight="700" marginTop='5%'color='rgb(35, 114, 217)'>you are not authorized</Typography>
      }
      {token &&
        <Typography variant='h5' fontWeight="700" marginTop='5%' color='rgb(35, 114, 217)'>You are already logged in</Typography>
      }
      {indForMessage === 1 &&
        <Typography variant='h5' fontWeight="700" marginTop='1%'color='red'>Password entry error!</Typography>
      }
      <form autoComplete="off" >
        <TextField
          type="username"
          required
          variant="outlined"
          color="primary"
          sx={{
            marginTop:"30px", 
            background:'rgba(222, 239, 248, 0.877)',
            borderRadius: '5px',
            width:{sm:"300px", xs:"100%"},
            input: {color: 'rgb(35, 114, 217)'}
          }}
          placeholder="username"
          fullWidth
          value={userAuth.username}
          onChange={(e)=> setUserAuth({ ...userAuth, username: e.currentTarget.value})}
        />
        <TextField
          type="password"
          required
          variant="outlined"
          color="primary"
          sx={{
            marginTop:"30px",
            background:'rgba(222, 239, 248, 0.877)',
            borderRadius: '5px',
            width:{sm:"300px", xs:"100%"},
            input: {color: 'rgb(35, 114, 217)'}
          }}
          placeholder="password"
          fullWidth
          value={userAuth.password}
          onChange={(e)=> setUserAuth({...userAuth, password: e.currentTarget.value})}
        />
        
        <ButtonGroup 
          variant='outlined' 
          aria-label='outlined button group' 
          sx={{marginTop:"15px", flexWrap:"wrap", alignItems:"center", justifyContent:"center"}}
        >
          <Button
            variant="outlined"
            color="primary"
            style={{ 
              marginRight: 5,
              marginTop: 5,
              background:'rgba(222, 239, 248, 0.877)',
              height:'35px',
              borderRadius:"5px",
              fontWeight:"700"
            }} 
            onClick={(e)=>signUpUser(e)}
          >
            Login
          </Button>
          <Button 
            variant="outlined"
            color="primary"
            style={{ 
              marginRight: 5,
              marginTop: 5,
              background:'rgba(222, 239, 248, 0.877)',
              height:'35px',
              borderRadius:"5px",
              fontWeight:"700"
            }}
            onClick={()=>token!==null && navigate("/main")}
          > 
            Enter
          </Button>
        </ButtonGroup>
      </form>
  </React.Fragment>
  )
};