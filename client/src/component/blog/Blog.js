import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import MainFeaturedPost from './MainFeaturedPost';
import FeaturedPost from './FeaturedPost';
import Sidebar from './Sidebar';
import Footer from './Footer';
import MaterialTheme from '../../material-theme.json'
import Scrolling from "./Scrolling";
import {connect} from "react-redux";
import {getBlog} from "../../actions/post";
import {useEffect} from "react";
import PropTypes from "prop-types";

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

interface BlogProps {
    posts: any ;
    darkTheme: boolean;
    getBlog: void;
};

const Blog = (props: BlogProps) => {
    const defaultTheme = createTheme(MaterialTheme);
    const {posts} = props;

    return (
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline/>
            <Container maxWidth="lg">
                <main>
                    <MainFeaturedPost post={posts.at(0)}/>
                    <Grid container spacing={4}>
                        {(posts.slice(1,3)).map((post) => (
                            <FeaturedPost key={post.title} post={post}/>
                        ))}
                    </Grid>
                    <Grid container spacing={5} sx={{mt: 3}}>
                        <Scrolling posts={posts.slice(3,6)}/>
                        <Sidebar
                            title={sidebar.title}
                            description={sidebar.description}
                            archives={sidebar.archives}
                            social={sidebar.social}
                        />
                    </Grid>
                </main>
            </Container>
            <Footer
                title="Footer"
                description="Something here to give the footer a purpose!"
            />
        </ThemeProvider>
    );
}
Blog.propTypes = {
    darkTheme: PropTypes.object.isRequired,
    posts: PropTypes.array.isRequired,
    getBlog: PropTypes.func.isRequired,
}
const mapStateToProps = (state) => ({
    getBlog: state.post.getBlog,
    darkTheme: state.theme.darkTheme,
    posts: state.post.posts,
})

export default connect(mapStateToProps, {getBlog})(Blog);