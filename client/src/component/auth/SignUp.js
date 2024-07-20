import * as React from 'react';
import {connect} from "react-redux";
import {Navigate} from 'react-router-dom';
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
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {Fragment, useEffect, useState} from "react";
import PropTypes from "prop-types";
import {setAlert} from "../../actions/alert"
import {register} from "../../actions/auth";
import MaterialTheme from '../../material-theme.json'
import {Link as ReduxLink} from 'react-router-dom'
import material from "../../material";

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Daily Blog
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const defaultTheme = createTheme(MaterialTheme);

const SignUp = ({setAlert, register, isAuthenticated, darkTheme}) => {

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        password2: ''
    })

    const {name, email, password, password2} = formData;
    const onChange = (e) =>
        setFormData({...formData, [e.target.name]: e.target.value});

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password !== password2) {
            setAlert('Password do not match', 'danger');
        } else {
            register(email, password);
        }
    };

    useEffect(() => {
    }, [darkTheme, isAuthenticated]);

    function getLight() {
        return darkTheme?material().dark:material().light;
    }

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: getLight().primary, color: getLight().onPrimary}}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5" color={getLight().onSurface}>
                        Sign Up
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                        <TextField
                            sx={{ bgcolor: getLight().surfaceVariant, input : { color:`${getLight().onBackground}` }}}
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="title"
                            value={email}
                            onChange={(e) => onChange(e)}
                            autoFocus
                        />
                        <TextField
                            sx={{ bgcolor: getLight().surfaceVariant, input : { color:`${getLight().onBackground}` }}}
                            margin="normal"
                            required
                            fullWidth
                            id="password"
                            type="password"
                            label="Password"
                            name="password"
                            value={password}
                            onChange={(e) => onChange(e)}
                        /><TextField
                        sx={{ bgcolor: getLight().surfaceVariant, input : { color:`${getLight().onBackground}` }}}
                        margin="normal"
                        required
                        fullWidth
                        id="password2"
                        type="password"
                        label="Confirm Password"
                        name="password2"
                        value={password2}
                        onChange={(e) => onChange(e)}
                    />
                        <Button
                            sx={{ mt: 3, mb: 2,bgcolor: getLight().primary, color: getLight().onPrimary }}
                            type="submit"
                            fullWidth
                            variant="contained"
                        >
                            Sign Up
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <ReduxLink to="/signIn">
                                    <Link variant="body2">
                                        Already have an account?
                                    </Link>
                                </ReduxLink>
                            </Grid>
                            <Grid item>
                                <ReduxLink to="/signIn">
                                    <Link variant="body2">
                                        {"Sign In"}
                                    </Link>
                                </ReduxLink>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{mt: 8, mb: 4}}/>
                { isAuthenticated && <Navigate to='/dashboard'/> }
            </Container>
        </ThemeProvider>
    );
}

SignUp.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    darkTheme: PropTypes.bool
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    darkTheme: state.theme.darkTheme,
});

export default connect(mapStateToProps, {setAlert, register})(SignUp)