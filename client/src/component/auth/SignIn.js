import * as React from 'react';
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
import {useEffect, useState} from "react";
import {Navigate} from "react-router-dom";
import {login} from "../../actions/auth";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Link as ReduxLink} from 'react-router-dom';
import Material from '../..//material-theme.json'
import material from "../../material";

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const defaultTheme = createTheme();

const SignIn = ({login, isAuthenticated, darkTheme}) => {
    const [formData, setFormData] = useState({
        email:'',
        password:'',
    })
    const { email,password} = formData;
    const onChange = (e) =>
        setFormData({...formData,[e.target.name]:e.target.value});

    const handleSubmit = async (event) => {
        login(email, password);
        event.preventDefault();
    };


    useEffect(() => {

    }, [darkTheme]);

    function getLight() {
        return darkTheme?material().dark:material().light;
    }
    return (
        <ThemeProvider theme={defaultTheme}>
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
                    <Avatar sx={{ m: 1, bgcolor: getLight().primary, color: getLight().onPrimary}}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5" color={getLight().onSurface}>
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            sx={{ bgcolor: getLight().surfaceVariant, input : { color:`${getLight().onBackground}` }}}
                            background="blue"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={email}
                            onChange={(e) => onChange(e)}
                        />
                        <TextField
                            sx={{ bgcolor: getLight().surfaceVariant, input : { color:`${getLight().onBackground}` }}}
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => onChange(e)}
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" sx={{  color: getLight().onSurface }}/>}
                            label="Remember me"
                            sx={{  color: getLight().onSurface }}

                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2,bgcolor: getLight().primary, color: getLight().onPrimary }}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <ReduxLink to="#">
                                    <Link href="#" variant="body2">
                                        Forgot password?
                                    </Link>
                                </ReduxLink>

                            </Grid>
                            <Grid item>
                                <ReduxLink to="/signup"><Link  variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link></ReduxLink>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                { isAuthenticated && <Navigate to='/dashboard'/> }
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
}

SignIn.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    darkTheme: PropTypes.bool.isRequired,
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    darkTheme: state.theme.darkTheme,
})

export default connect(mapStateToProps,{login}) (SignIn);