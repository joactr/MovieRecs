import React from 'react';
import {useNavigate} from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import collage from './fondoLogin.jpg'

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
    let userData = JSON.stringify({username: username,password:password})
    fetch("http://localhost:8080/logIn", { method: "POST", body: userData,headers: {
      "Content-Type": "application/json",
      }, },)
      .then((res) => {
        
        if (res.ok) {
          let datosRes = res.json().then(post => localStorage.setItem("user_id", post.user_id))
          localStorage.setItem("username", data.get('username'))
          localStorage.setItem("recomendador", [false, true, false])
          localStorage.setItem("nRecs", 10)
          navigate("/")
        } else {
          window.alert("Usuario o contraseña incorrectos")
        }
      }
    )
    
  };

    return (
    <div style={{ width: "100%", height: "100%", backgroundColor: "#0C2D48", top: "0", position:"absolute", backgroundImage:`url(${collage})`}}>
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            padding: "20px",
            borderRadius: "30px",
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: "#0C2D48"
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
              <Grid item>
                <Link href="/registro" variant="body2">
                  {"¿No tienes cuenta?"}
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