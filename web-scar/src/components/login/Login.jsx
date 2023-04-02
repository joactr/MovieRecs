import React from 'react';
import {useNavigate} from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { green, purple } from '@mui/material/colors';

const theme = createTheme({
    palette: {
        primary: {
          main: "#2E8BC0",
        },
        secondary: {
          main: "#fff",
          },
        text: {
            primary: "#000",
            secondary: "#000"
        },
    },
  });

export default function SignIn() {

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    
    let username = data.get('username');
    let password = data.get('password');
    
    localStorage.setItem("username", username)
    navigate("/");
    
  };

    return (
        <div style={{ width: "100%", height: "100%", backgroundColor: "#0C2D48", top: "0", position:"absolute"}}>
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography color="secondary.main" component="h1" variant="h5">
            Log-in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1}}>
            <TextField 
              margin="normal"
              required
              fullWidth
              id="email"
              label="Nombre de usuario"
              name="username"
              autoComplete="username"
              autoFocus
              variant="filled"
              sx={{bgcolor:"secondary.main"}}
            />
            <TextField 
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
              variant="filled"
              sx={{bgcolor:"secondary.main"}}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Entrar
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
    </div>
  );
}