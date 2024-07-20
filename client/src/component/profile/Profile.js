import React, {useState, useEffect} from 'react';
import {createTheme, ThemeProvider, useTheme} from "@mui/material/styles";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import axios from "axios";
import {Icon} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Box from "@mui/material/Box";
import {Person, Person3} from "@mui/icons-material";
import material from "../../material";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";

const Profile = () => {
    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    const handleSubmit = async (event) => {
        event.preventDefault();
    };

    const [formData, setFormData] = useState({
        name:'',
        email:'',
    })
    const { name,email} = formData;
    const onChange = (e) =>
        setFormData({...formData,[e.target.name]:e.target.value});


    function getLight() {
        return material().light;
    }

    useEffect(() => {
        // Fetch user profile data from an API

        const fetchUserProfile = async () => {
            try {
                // Placeholder for fetching user data, replace URL with your API endpoint
                const response = await axios.get(`/api/profile/${""}`);
                const data = await response.data;
                setUserProfile(data);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch user profile:', error);
                setLoading(false);
            }
        };
        fetchUserProfile();
    }, []);
    const defaultTheme = createTheme();

    if (loading) {
        return (
            <ThemeProvider theme={defaultTheme}>
                <Container component="main" maxWidth="lg">
                    <CssBaseline/>
                    <div>Loading profile...</div>
                </Container>
            </ThemeProvider>)
    }

    if (!userProfile) {
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
                        <h1>Profile not found</h1>
                        <Avatar sx={{m: 1, bgcolor: getLight().primary, color: getLight().onPrimary}}>
                            <Person/>
                        </Avatar>
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                            <TextField
                                sx={{ bgcolor: getLight().surfaceVariant, input : { color:`${getLight().onBackground}` }}}
                                background="blue"
                                margin="normal"
                                required
                                fullWidth
                                id="name"
                                label="Full Name"
                                name="name"
                                autoComplete="title"
                                autoFocus
                                value={name}
                                onChange={(e) => onChange(e)}
                            /><TextField
                                sx={{ bgcolor: getLight().surfaceVariant, input : { color:`${getLight().onBackground}` }}}
                                background="blue"
                                margin="normal"
                                required
                                fullWidth
                                id="name"
                                label="email"
                                name="name"
                                autoComplete="title"
                                value={name}
                                onChange={(e) => onChange(e)}
                            /><TextField
                                sx={{ bgcolor: getLight().surfaceVariant, input : { color:`${getLight().onBackground}` }}}
                                background="blue"
                                margin="normal"
                                required
                                fullWidth
                                id="name"
                                label="username"
                                name="name"
                                autoComplete="title"
                                value={name}
                                onChange={(e) => onChange(e)}
                            /><TextField
                                sx={{ bgcolor: getLight().surfaceVariant, input : { color:`${getLight().onBackground}` }}}
                                background="blue"
                                margin="normal"
                                required
                                fullWidth
                                id="name"
                                label="Bio"
                                name="name"
                                autoComplete="title"
                                value={name}
                                onChange={(e) => onChange(e)}
                            /><TextField
                                sx={{ bgcolor: getLight().surfaceVariant, input : { color:`${getLight().onBackground}` }}}
                                background="blue"
                                margin="normal"
                                required
                                fullWidth
                                id="name"
                                label="website"
                                name="name"
                                autoComplete="title"
                                value={name}
                                onChange={(e) => onChange(e)}
                            /><TextField
                                sx={{ bgcolor: getLight().surfaceVariant, input : { color:`${getLight().onBackground}` }}}
                                background="blue"
                                margin="normal"
                                required
                                fullWidth
                                id="name"
                                label="twitter"
                                name="name"
                                autoComplete="title"
                                value={name}
                                onChange={(e) => onChange(e)}
                            /><TextField
                                sx={{ bgcolor: getLight().surfaceVariant, input : { color:`${getLight().onBackground}` }}}
                                background="blue"
                                margin="normal"
                                required
                                fullWidth
                                id="name"
                                label="linkedIn"
                                name="name"
                                autoComplete="title"
                                value={name}
                                onChange={(e) => onChange(e)}
                            />
                            <FormControlLabel
                                control={<Checkbox value="remember" sx={{  color: getLight().onSurface }}/>}
                                label="Remember me"
                                sx={{  color: getLight().onSurface }}
                            /><FormControlLabel
                                control={<Checkbox value="remember" sx={{  color: getLight().onSurface }}/>}
                                label="Email Notification"
                                sx={{  color: getLight().onSurface }}
                            /><FormControlLabel
                                control={<Checkbox value="remember" sx={{  color: getLight().onSurface }}/>}
                                label="Public Profile"
                                sx={{  color: getLight().onSurface }}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2,bgcolor: getLight().primary, color: getLight().onPrimary }}
                            >
                                Create Profile
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>)


    }

    // Example of displaying user profile data
    return (<ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="lg">
            <CssBaseline/>
            <h1>User Profile</h1>
            <p>Name: {userProfile.name}</p>
            <p>name: {userProfile.name}</p>
            {/* Add more user profile information here */}
        </Container>
    </ThemeProvider>);
};

export default Profile;