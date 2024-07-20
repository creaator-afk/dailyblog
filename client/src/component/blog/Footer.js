import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import TextField from "@mui/material/TextField";
import material from "../../material";
import {useState} from "react";
import Button from "@mui/material/Button";


function Copyright() {
    const [formData, setFormData] = useState({
        email: '',
    })
    const {email} = formData;
    const onChange = (e) =>
        setFormData({...formData, [e.target.name]: e.target.value});
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
            <Container component="main" maxWidth="xs">
                <TextField
                    sx={{
                        bgcolor: material().light.surfaceVariant,
                        input: {color: `${material().light.onBackground}`}
                    }}
                    fullWidth
                    margin="normal"
                    name="Email"
                    label="Email"
                    type="email"
                    id="email"
                    autoComplete="title"
                    value={email}
                    onChange={(e) => onChange(e)}
                />
                <Button
                    margin="normal"
                    type="submit"
                    variant="contained"
                    sx={{
                        mt: 3,
                        mb: 2,
                        bgcolor: material().light.primary,
                        color: material().light.onPrimary,
                        width: "30%"
                    }}
                >
                    Subscribe
                </Button>
            </Container>
        </Typography>
    );
}

interface FooterProps {
    description: string;
    title: string;
}

export default function Footer(props: FooterProps) {
    const {description, title} = props;

    return (
        <Box component="footer" sx={{bgcolor: 'background.paper', py: 6}}>
            <Container maxWidth="lg">
                <Typography variant="h6" align="center" gutterBottom>
                    {title}
                </Typography>
                <Typography
                    variant="subtitle1"
                    align="center"
                    color="text.secondary"
                    component="p"
                >
                    {description}
                </Typography>
                <Copyright/>
            </Container>
        </Box>
    );
}