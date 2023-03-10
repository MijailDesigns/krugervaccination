import React, { useState } from 'react';
import {Avatar,CssBaseline,Typography,Container,Grid,Button, TextField} from '@mui/material'
import img from '../../image/fondo-removebg-preview.png'

import classes from './Login.module.css'

import { NAME_DATA_LOCALSTORAGE } from '../../constants'
import { Box } from '@mui/system';


function Login({login}) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  console.log(username, password)

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!username || !password) {
      setErrorMessage('Ingrese usuario y contraseña');
      return;
    }

    const data = JSON.parse(localStorage.getItem(NAME_DATA_LOCALSTORAGE));
    let user = data.find(e => e.username === username)
    console.log(data, user)
    if (!user || user.length === 0) {
      return alert("The user doesn't exist")
    }
    if (user.password !== password) {
      return alert("The password is incorrect")
    }
    if (user.password === password) {
      login(user)
    }
  };

  return (
    <Box className={classes.main} >
      <div className={classes.imgContainer}>
        <img src={img} alt="kruger" />
        <h1>Vaccination control</h1>
      </div>
    <div className={classes.paper}>
      <div className={classes.conteiner}>
      <Avatar className={classes.avatar}></Avatar>
      <Typography component="h1" variant="h5">
        Sign up
      </Typography>
      </div>
      <form className={classes.form} noValidate onSubmit={handleSubmit} >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="email"
              label="Username"
              value={username}
              name="username"
              autoComplete="username"
              onChange={(event) => setUsername(event.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(event) => setPassword(event.target.value)}
            />
          </Grid>
          
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          style={{"margin": "12px 0"}}
          
        >
          Sign Up
        </Button>
      </form>
    </div>
  </Box>
  );
}

export default Login;
