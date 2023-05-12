import { React, useState, useEffect, Fragment } from 'react';
import {json, useNavigate} from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import collage from '../login/fondoLogin.jpg'
import RatingPelis from './multiSelect';
import './registro.scss'
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Rating from '@mui/material/Rating';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';



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
  
const StyledRating = styled(Rating)(({ theme }) => ({
    '& .MuiRating-iconEmpty .MuiSvgIcon-root': {
      color: "white",
    },
  }));



  const customIcons = {
    1: {
      icon: <SentimentVeryDissatisfiedIcon color="error" />,
      label: 'Very Dissatisfied',
    },
    2: {
      icon: <SentimentDissatisfiedIcon color="error" />,
      label: 'Dissatisfied',
    },
    3: {
      icon: <SentimentSatisfiedIcon color="warning" />,
      label: 'Neutral',
    },
    4: {
      icon: <SentimentSatisfiedAltIcon color="success" />,
      label: 'Satisfied',
    },
    5: {
      icon: <SentimentVerySatisfiedIcon color="success" />,
      label: 'Very Satisfied',
    },
  };

  function IconContainer(props) {
    const { value, ...other } = props;
    return <span {...other}>{customIcons[value].icon}</span>;
  }

  IconContainer.propTypes = {
    value: PropTypes.number.isRequired,
  };

export default function SignUp() {
  const navigate = useNavigate();
  const [ratings, setRatings] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

  const [age, setAge] = useState('')
  const[genero,setGenero]=useState('')
  const[profesion,setProfesion]=useState('')
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let userData = {
      username: data.get('username'),
      password: data.get('password'),
      age: age,
      profesion: profesion,
      genero: genero,
      preferences: ratings
    }
    userData = JSON.stringify(userData)
    console.log(userData);
    fetch("http://localhost:8080/registerUser", { method: "POST", body: userData,headers: {
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
          window.alert("Error")
        }
      }
      )
    };
    
    const handleRatings = (event) => {
      event.preventDefault();
      let auxArray = ratings
      let numRating = Number(event.target.name.slice(-2))
      console.log(numRating)
      let newRating = event.target.value
      auxArray[numRating - 1] = Number(newRating)
      setRatings(auxArray)
      console.log(event.target.value, ratings)

    };

    return (
        <div style={{ width: "100%", height: "100%", backgroundColor: "#0C2D48", top: "0", position: "absolute", backgroundImage: `url(${collage})` }}>
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box sx={{ 
            position: "absolute",
            left: '50%', 
            top: '50%',
            transform: 'translate(-50%, -50%)',
            padding: "20px",
            minWidth: "400px",
            maxWidth: "35%",
            borderRadius: "30px",
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: "#0C2D48"
          }}
        >
          <Typography component="h1" variant="h5" color="secondary.main">
            Registro
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Nombre de usuario"
                  name="username"
                  autoComplete="username"
                  sx={{ bgcolor: "secondary.main" }}
                  variant="filled"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Contraseña"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  sx={{ bgcolor: "secondary.main" }}
                  variant="filled"
                />
                  </Grid>
                  <Grid item xs={12} >
                <FormControl fullWidth required variant="filled" sx={{ bgcolor: "secondary.main"}}>
                    <InputLabel>Género</InputLabel>
                    <Select
                    id="genero"
                    value={genero}
                    required
                    fullWidth
                    onChange={(e)=>setGenero(e.target.value)}
                    sx={{ bgcolor: "secondary.main"}}
                    variant="filled"
                    >
                    <MenuItem value={"M"}>{"Hombre" }</MenuItem>
                    <MenuItem value={"F"}>{"Mujer" }</MenuItem>
                    </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} >
                <FormControl fullWidth required variant="filled" sx={{ bgcolor: "secondary.main"}}>
                    <InputLabel>Rango de edad</InputLabel>
                    <Select
                    id="age"
                    value={age}
                    required
                    fullWidth
                    onChange={(e)=>setAge(e.target.value)}
                    sx={{ bgcolor: "secondary.main"}}
                    variant="filled"
                    >
                    <MenuItem value={20}>{"0 - 23" }</MenuItem>
                    <MenuItem value={30}>{"24 - 40" }</MenuItem>
                    <MenuItem value={50}>{"41 - 60" }</MenuItem>
                    <MenuItem value={70}>{"61+" }</MenuItem>
                    </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth required variant="filled" sx={{ bgcolor: "secondary.main"}}>
                    <InputLabel>Profesión</InputLabel>
                    <Select
                    id="profesion"
                    value={profesion}
                    required
                    fullWidth
                    onChange={(e)=>setProfesion(e.target.value)}
                    sx={{ bgcolor: "secondary.main" }}
                    variant="filled"
                    >
                    <MenuItem value={"doctor"}>{"Sanitario"}</MenuItem>
                    <MenuItem value={"programmer"}>{"Tecnológico/Científico"}</MenuItem>
                    <MenuItem value={"artist"}>{"Arte" }</MenuItem>
                    <MenuItem value={"student"}>{"Desempleado/Jubilado/Estudiante" }</MenuItem>
                    <MenuItem value={"marketing"}>{"Ventas/Leyes" }</MenuItem>
                    </Select>
                </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <div className='ratingsContainer'>
                        <div className='columnRatings'>
                        <Typography color="secondary.main">Acción</Typography> 
                        <StyledRating
                        name="rating01"
                        IconContainerComponent={IconContainer}
                        getLabelText={(value) => customIcons[value].label}
                        highlightSelectedOnly
                        onChange={handleRatings}
                        />
                        <Typography color="secondary.main">Aventura</Typography> 
                        <StyledRating
                        name="rating02"
                        IconContainerComponent={IconContainer}
                        getLabelText={(value) => customIcons[value].label}
                        highlightSelectedOnly
                        onChange={handleRatings}
                        />
                        <Typography color="secondary.main">Animación</Typography> 
                        <StyledRating
                        name="rating03"
                        IconContainerComponent={IconContainer}
                        getLabelText={(value) => customIcons[value].label}
                        highlightSelectedOnly
                        onChange={handleRatings}
                        />
                        <Typography color="secondary.main">Infantil</Typography> 
                        <StyledRating
                        name="rating04"
                        IconContainerComponent={IconContainer}
                        getLabelText={(value) => customIcons[value].label}
                        highlightSelectedOnly
                        onChange={handleRatings}
                        />
                        <Typography color="secondary.main">Comedia</Typography> 
                        <StyledRating
                        name="rating05"
                        IconContainerComponent={IconContainer}
                        getLabelText={(value) => customIcons[value].label}
                        highlightSelectedOnly
                        onChange={handleRatings}
                        />
                        <Typography color="secondary.main">Crimen</Typography> 
                        <StyledRating
                        name="rating06"
                        IconContainerComponent={IconContainer}
                        getLabelText={(value) => customIcons[value].label}
                        highlightSelectedOnly
                        onChange={handleRatings}
                        />
                        </div>
                        <div className='columnRatings'>
                        <Typography color="secondary.main">Documental</Typography> 
                        <StyledRating
                        name="rating07"
                        IconContainerComponent={IconContainer}
                        getLabelText={(value) => customIcons[value].label}
                        highlightSelectedOnly
                        onChange={handleRatings}
                        />
                        <Typography color="secondary.main">Drama</Typography> 
                        <StyledRating
                        name="rating08"
                        IconContainerComponent={IconContainer}
                        getLabelText={(value) => customIcons[value].label}
                        highlightSelectedOnly
                        onChange={handleRatings}
                        />
                        <Typography color="secondary.main">Fantasía</Typography> 
                        <StyledRating
                        name="rating09"
                        IconContainerComponent={IconContainer}
                        getLabelText={(value) => customIcons[value].label}
                        highlightSelectedOnly
                        onChange={handleRatings}
                        />
                        <Typography color="secondary.main">Cine negro</Typography> 
                        <StyledRating
                        name="rating10"
                        IconContainerComponent={IconContainer}
                        getLabelText={(value) => customIcons[value].label}
                        highlightSelectedOnly
                        onChange={handleRatings}
                        />
                        <Typography color="secondary.main">Horror</Typography> 
                        <StyledRating
                        name="rating11"
                        IconContainerComponent={IconContainer}
                        getLabelText={(value) => customIcons[value].label}
                        highlightSelectedOnly
                        onChange={handleRatings}
                        />
                        <Typography color="secondary.main">Musical</Typography> 
                        <StyledRating
                        name="rating12"
                        IconContainerComponent={IconContainer}
                        getLabelText={(value) => customIcons[value].label}
                        highlightSelectedOnly
                        onChange={handleRatings}
                        />
                        </div>
                        <div className='columnRatings'>
                        <Typography color="secondary.main">Misterio</Typography> 
                        <StyledRating
                        name="rating13"
                        IconContainerComponent={IconContainer}
                        getLabelText={(value) => customIcons[value].label}
                        highlightSelectedOnly
                        onChange={handleRatings}
                        />
                        <Typography color="secondary.main">Romance</Typography> 
                        <StyledRating
                        name="rating14"
                        IconContainerComponent={IconContainer}
                        getLabelText={(value) => customIcons[value].label}
                        highlightSelectedOnly
                        onChange={handleRatings}
                        />
                        <Typography color="secondary.main">Ciencia Ficción</Typography> 
                        <StyledRating
                        name="rating15"
                        IconContainerComponent={IconContainer}
                        getLabelText={(value) => customIcons[value].label}
                        highlightSelectedOnly
                        onChange={handleRatings}
                        />
                        <Typography color="secondary.main">Thriller</Typography> 
                        <StyledRating
                        name="rating16"
                        IconContainerComponent={IconContainer}
                        getLabelText={(value) => customIcons[value].label}
                        highlightSelectedOnly
                        onChange={handleRatings}
                        />
                        <Typography color="secondary.main">Bélica</Typography> 
                        <StyledRating
                        name="rating17"
                        IconContainerComponent={IconContainer}
                        getLabelText={(value) => customIcons[value].label}
                        highlightSelectedOnly
                        onChange={handleRatings}
                        />
                        <Typography color="secondary.main">Western</Typography> 
                        <StyledRating
                        name="rating18"
                        IconContainerComponent={IconContainer}
                        getLabelText={(value) => customIcons[value].label}
                        highlightSelectedOnly
                        onChange={handleRatings}
                        />
                        </div>
                    </div>
                </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  ¿Ya tienes cuenta?
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