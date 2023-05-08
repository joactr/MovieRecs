import {React, useState,useEffect,Fragment} from 'react';
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
  const [ratings, setRatings] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

  const[age,setAge]=useState('')
  const[profesion,setProfesion]=useState('')
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      username: data.get('username'),
      password: data.get('password'),
      age: age,
      profesion: profesion,
    });
    };
    
    const handleRatings = (event) => {
        event.preventDefault();
        let auxArray = ratings
        let numRating = event.target.name
        console.log(numRating.slice(-2))

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
                    <MenuItem value={60}>{"61+" }</MenuItem>
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
                    <MenuItem value={20}>{"0 - 23" }</MenuItem>
                    <MenuItem value={30}>{"24 - 40" }</MenuItem>
                    <MenuItem value={50}>{"41 - 60" }</MenuItem>
                    <MenuItem value={60}>{"61+" }</MenuItem>
                    </Select>
                </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <div className='ratingsContainer'>
                        <div className='columnRatings'>
                        <Typography color="secondary.main">Sign up</Typography> 
                        <StyledRating
                        name="rating01"
                        IconContainerComponent={IconContainer}
                        getLabelText={(value) => customIcons[value].label}
                        highlightSelectedOnly
                        onChange={handleRatings}
                        />
                        <Typography color="secondary.main">Sign up</Typography> 
                        <StyledRating
                        name="rating02"
                        IconContainerComponent={IconContainer}
                        getLabelText={(value) => customIcons[value].label}
                        highlightSelectedOnly
                        onChange={handleRatings}
                        />
                        <Typography color="secondary.main">Sign up</Typography> 
                        <StyledRating
                        name="rating01"
                        IconContainerComponent={IconContainer}
                        getLabelText={(value) => customIcons[value].label}
                        highlightSelectedOnly
                        onChange={handleRatings}
                        />
                        <Typography color="secondary.main">Sign up</Typography> 
                        <StyledRating
                        name="rating02"
                        IconContainerComponent={IconContainer}
                        getLabelText={(value) => customIcons[value].label}
                        highlightSelectedOnly
                        onChange={handleRatings}
                        />
                        <Typography color="secondary.main">Sign up</Typography> 
                        <StyledRating
                        name="rating01"
                        IconContainerComponent={IconContainer}
                        getLabelText={(value) => customIcons[value].label}
                        highlightSelectedOnly
                        onChange={handleRatings}
                        />
                        <Typography color="secondary.main">Sign up</Typography> 
                        <StyledRating
                        name="rating02"
                        IconContainerComponent={IconContainer}
                        getLabelText={(value) => customIcons[value].label}
                        highlightSelectedOnly
                        onChange={handleRatings}
                        />
                        </div>
                        <div className='columnRatings'>
                        <Typography color="secondary.main">Sign up</Typography> 
                        <StyledRating
                        name="rating01"
                        IconContainerComponent={IconContainer}
                        getLabelText={(value) => customIcons[value].label}
                        highlightSelectedOnly
                        onChange={handleRatings}
                        />
                        <Typography color="secondary.main">Sign up</Typography> 
                        <StyledRating
                        name="rating02"
                        IconContainerComponent={IconContainer}
                        getLabelText={(value) => customIcons[value].label}
                        highlightSelectedOnly
                        onChange={handleRatings}
                        />
                        <Typography color="secondary.main">Sign up</Typography> 
                        <StyledRating
                        name="rating01"
                        IconContainerComponent={IconContainer}
                        getLabelText={(value) => customIcons[value].label}
                        highlightSelectedOnly
                        onChange={handleRatings}
                        />
                        <Typography color="secondary.main">Sign up</Typography> 
                        <StyledRating
                        name="rating02"
                        IconContainerComponent={IconContainer}
                        getLabelText={(value) => customIcons[value].label}
                        highlightSelectedOnly
                        onChange={handleRatings}
                        />
                        <Typography color="secondary.main">Sign up</Typography> 
                        <StyledRating
                        name="rating01"
                        IconContainerComponent={IconContainer}
                        getLabelText={(value) => customIcons[value].label}
                        highlightSelectedOnly
                        onChange={handleRatings}
                        />
                        <Typography color="secondary.main">Sign up</Typography> 
                        <StyledRating
                        name="rating02"
                        IconContainerComponent={IconContainer}
                        getLabelText={(value) => customIcons[value].label}
                        highlightSelectedOnly
                        onChange={handleRatings}
                        />
                        </div>
                        <div className='columnRatings'>
                        <Typography color="secondary.main">Sign up</Typography> 
                        <StyledRating
                        name="rating01"
                        IconContainerComponent={IconContainer}
                        getLabelText={(value) => customIcons[value].label}
                        highlightSelectedOnly
                        onChange={handleRatings}
                        />
                        <Typography color="secondary.main">Sign up</Typography> 
                        <StyledRating
                        name="rating02"
                        IconContainerComponent={IconContainer}
                        getLabelText={(value) => customIcons[value].label}
                        highlightSelectedOnly
                        onChange={handleRatings}
                        />
                        <Typography color="secondary.main">Sign up</Typography> 
                        <StyledRating
                        name="rating01"
                        IconContainerComponent={IconContainer}
                        getLabelText={(value) => customIcons[value].label}
                        highlightSelectedOnly
                        onChange={handleRatings}
                        />
                        <Typography color="secondary.main">Sign up</Typography> 
                        <StyledRating
                        name="rating02"
                        IconContainerComponent={IconContainer}
                        getLabelText={(value) => customIcons[value].label}
                        highlightSelectedOnly
                        onChange={handleRatings}
                        />
                        <Typography color="secondary.main">Sign up</Typography> 
                        <StyledRating
                        name="rating01"
                        IconContainerComponent={IconContainer}
                        getLabelText={(value) => customIcons[value].label}
                        highlightSelectedOnly
                        onChange={handleRatings}
                        />
                        <Typography color="secondary.main">Sign up</Typography> 
                        <StyledRating
                        name="rating02"
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