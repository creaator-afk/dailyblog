import Main from "../Main";
import React from "react";
import Header from "../../header/Header";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import material from "../../../material";
import Grid from "@mui/material/Grid";
import Sidebar from "../Sidebar";
import GitHubIcon from "@mui/icons-material/GitHub";
import XIcon from "@mui/icons-material/X";
import FacebookIcon from "@mui/icons-material/Facebook";


const Post2 = () => {
    const post3 = "# New feature\n" +
        "\n" +
        "_March 14, 2020 by [Tom](/)_\n" +
        "\n" +
        "Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.\n" +
        "Aenean lacinia bibendum nulla sed consectetur. Etiam porta sem malesuada magna mollis euismod.\n" +
        "Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh,\n" +
        "ut fermentum massa justo sit amet risus.\n" +
        "\n" +
        "- Praesent commodo cursus magna, vel scelerisque nisl consectetur et.\n" +
        "- Donec id elit non mi porta gravida at eget metus.\n" +
        "- Nulla vitae elit libero, a pharetra augue.\n" +
        "\n" +
        "Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum.\n" +
        "Aenean lacinia bibendum nulla sed consectetur.\n" +
        "\n" +
        "Donec ullamcorper nulla non metus auctor fringilla. Nulla vitae elit libero, a pharetra augue.";
    const posts = [post3];
    const sections = [
        {title: 'Technology', url: '#'},
        {title: 'Design', url: '#'},
        {title: 'Culture', url: '#'},
        {title: 'Business', url: '#'},
        {title: 'Politics', url: '#'},
        {title: 'Opinion', url: '#'},
        {title: 'Science', url: '#'},
        {title: 'Health', url: '#'},
        {title: 'Style', url: '#'},
        {title: 'Travel', url: '#'},
    ];

    const defaultTheme = createTheme(material())

    function getLight() {
        return material().dark;
    }

    return (
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline/>
            <Container maxWidth="lg">
                <main>
                    <Grid container spacing={5} sx={{mt: 3}}>
                        <Main title="From the firehose" posts={posts}/>
                        <Sidebar/>
                    </Grid>
                </main>

            </Container>
        </ThemeProvider>
    )
}
export default Post2;
