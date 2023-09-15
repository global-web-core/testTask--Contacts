import React, { useState } from 'react';
import {Users} from '../../models';
import { Button, TextField, Grid, Paper, Typography } from '@mui/material';

export const Login = (): JSX.Element => {
  // const users = async () => {
  //   const qqq = await Users.getAll();
  //   console.log('===qqq', qqq)
  //   const qqq2 = await Contacts.getAll();
  //   console.log('===qqq2', qqq2)
  // };
  // users();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!username || !password) {
      alert('Пожалуйста, заполните все поля');
      return;
    }

    const user = await Users.getByUsernameAndPassword(username, password);
    if (user.data?.length === 1) {

      console.log('===user', user)
    }
  };

  
  return (
    <>
      <Grid container justifyContent="center" style={{ marginTop: '20px' }}>
        <Grid item xs={12} sm={6} md={4}>
          <Paper style={{ padding: '20px' }}>
            <Typography variant="h5" component="h2">
              Авторизация
            </Typography>
            <form 
              noValidate 
              autoComplete="off" 
              style={{ marginTop: '20px' }}
              onSubmit={handleSubmit}
            >
              <div style={{ marginBottom: '20px' }}>
                <TextField
                  fullWidth
                  label="Имя пользователя"
                  variant="outlined"
                  value={username}
                  onChange={handleUsernameChange}
                  required
                />
              </div>
              <div style={{ marginBottom: '20px' }}>
                <TextField
                  fullWidth
                  label="Пароль"
                  variant="outlined"
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                />
              </div>
              <Button
                fullWidth
                variant="contained"
                type="submit"
              >
                Войти
              </Button>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}