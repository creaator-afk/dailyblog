import Main from "../Main";
import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import material from "../../../material";
import Grid from "@mui/material/Grid";
import Sidebar from "../Sidebar";
import GitHubIcon from "@mui/icons-material/GitHub";
import XIcon from "@mui/icons-material/X";
import FacebookIcon from "@mui/icons-material/Facebook";
import {useLocation} from "react-router-dom";
import {connect} from "react-redux";


const Post1 = () => {
    const defaultTheme = createTheme(material())
    const location = useLocation();
    const {id} = location.state || {};
    const sidebar = {
        title: 'About',
        description:
            'Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.',
        archives: [
            {title: 'March 2020', url: '#'},
            {title: 'February 2020', url: '#'},
            {title: 'January 2020', url: '#'},
            {title: 'November 1999', url: '#'},
            {title: 'October 1999', url: '#'},
            {title: 'September 1999', url: '#'},
            {title: 'August 1999', url: '#'},
            {title: 'July 1999', url: '#'},
            {title: 'June 1999', url: '#'},
            {title: 'May 1999', url: '#'},
            {title: 'April 1999', url: '#'},
        ],
        social: [
            {name: 'GitHub', icon: GitHubIcon},
            {name: 'X', icon: XIcon},
            {name: 'Facebook', icon: FacebookIcon},
        ],
    };


    function getLight() {
        return material().dark;
    }

    return (
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline/>
            <Container maxWidth="lg">
                <main>
                    <Grid container spacing={5} sx={{mt: 3}}>
                        <Main title="From the firehose" id={id}/>
                        <Sidebar
                            title={sidebar.title}
                            description={sidebar.description}
                            archives={sidebar.archives}
                            social={sidebar.social}
                        />

                    </Grid>
                </main>

            </Container>
        </ThemeProvider>
    )
}
export default connect()(Post1);