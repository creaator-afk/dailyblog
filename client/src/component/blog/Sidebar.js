import * as React from 'react';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import material from "../../material";
import GitHubIcon from "@mui/icons-material/GitHub";
import XIcon from "@mui/icons-material/X";
import FacebookIcon from "@mui/icons-material/Facebook";
import {useEffect} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

interface SidebarProps {
    archives: ReadonlyArray<{
        url: string;
        title: string;
    }>;
    description: string;
    social: ReadonlyArray<{
        icon: React.ElementType;
        name: string;
    }>;
    title: string;
    darkTheme: boolean;
}

const Sidebar = (props: SidebarProps) => {
    const {  darkTheme } = props;
    const archives =  [
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
    ];
    const description = 'Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.'
    const title = 'About'
    const social = [
        {name: 'GitHub', icon: GitHubIcon},
        {name: 'X', icon: XIcon},
        {name: 'Facebook', icon: FacebookIcon},
    ]

    useEffect(() => {
    }, [darkTheme]);
    function getLight() {
        return darkTheme ? material().dark:material().light;
    }

    return (
        <Grid item xs={12} md={4}>
            <Paper elevation={0} sx={{ p: 2, bgcolor: `${getLight().secondaryContainer}` }}>
                <Typography variant="h6" gutterBottom color={getLight().onSecondaryContainer}>
                    {title}
                </Typography>
                <Typography color = {getLight().onSecondaryContainer}>{description}</Typography>
            </Paper>
            <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                Archives
            </Typography>
            {archives.map((archive) => (
                <Link display="block" variant="body1" href={archive.url} key={archive.title}>
                    {archive.title}
                </Link>
            ))}
            <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                Social
            </Typography>
            {social.map((network) => (
                <Link
                    display="block"
                    variant="body1"
                    href="#"
                    key={network.name}
                    sx={{ mb: 0.5 }}
                >
                    <Stack direction="row" spacing={1} alignItems="center">
                        <network.icon />
                        <span>{network.name}</span>
                    </Stack>
                </Link>
            ))}
        </Grid>
    );
}
Sidebar.propTypes = {
    darkTheme: PropTypes.bool.isRequired,
}

const mapStateToProps = (state) =>({
    darkTheme: state.theme.darkTheme,
})
export default connect(mapStateToProps,null)(Sidebar)