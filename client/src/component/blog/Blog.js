import * as React from 'react';
import './GradientLoadingScreen.css';
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
import {getBlogByCategory} from "../../actions/post";
import PropTypes from "prop-types";
import {useMediaQuery} from "@mui/material";
import {useEffect} from "react";
import {useLocation} from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

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
    posts: any;
    darkTheme: boolean;
    loading: boolean;
    getBlogByCategory: void;
};

const Blog = (props: BlogProps) => {
    const defaultTheme = createTheme(MaterialTheme);
    const {posts, loading, getBlogByCategory} = props;
    const isMobile = useMediaQuery(defaultTheme.breakpoints.down('sm'));
    const location = useLocation();
    const {category, search} = location.state || {}

    useEffect(() => {
        getBlogByCategory(category,search)
    }, [getBlogByCategory, category,search]);


    const GradientLoadingScreen = () => {
        return (
            <div className="gradientLoader">
            </div>
        );
    };
    if (search && search !=="") {
        return (
            <ThemeProvider theme={defaultTheme}>
                <CssBaseline/>
                <Container maxWidth="lg">
                    {posts.length !== 0 ?
                        <main>
                            {posts.map((post) => (
                                <MainFeaturedPost post={post}/>
                            ))}
                        </main>
                        :
                        <ThemeProvider theme={defaultTheme}>
                            <CssBaseline/>
                            <Box
                                sx={{
                                    marginTop: 8,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}
                            >
                                <Typography component="h1" variant="h5" color="primary">
                                    {"\"" + search + "\" not found"}
                                </Typography>
                            </Box>
                        </ThemeProvider>}

                </Container>
                <Footer
                    title="Footer"
                    description="Join our Newsletter"
                />
            </ThemeProvider>
        )
    }
    return (loading ?
            <ThemeProvider theme={defaultTheme}>
                <CssBaseline/>
                <Container maxWidth="lg">
                    <GradientLoadingScreen/>:
                </Container>
            </ThemeProvider>
            :
            <ThemeProvider theme={defaultTheme}>
                <CssBaseline/>
                <Container maxWidth="lg">
                    {posts.length !== 0 ? <main>
                            <MainFeaturedPost post={posts.at(0)}/>
                            <Grid container spacing={isMobile ? 2 : 4}>
                                {(posts.slice(1, 3)).map((post) => (
                                    <FeaturedPost key={post.title} post={post}/>
                                ))}
                            </Grid>
                            <Grid container spacing={5} sx={{mt: 3}}>
                                <Scrolling posts={posts.slice(3, 8)}/>
                                {!isMobile && <Sidebar
                                    title={sidebar.title}
                                    description={sidebar.description}
                                    archives={sidebar.archives}
                                    social={sidebar.social}
                                />}
                            </Grid>
                        </main>
                        :
                        <ThemeProvider theme={defaultTheme}>
                            <CssBaseline/>
                            <Box
                                sx={{
                                    marginTop: 8,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}
                            >
                                <Typography component="h1" variant="h5" color="primary">
                                    {"\"" + category + "\" not found"}
                                </Typography>
                            </Box>
                        </ThemeProvider>}

                </Container>
                <Footer
                    title="Footer"
                    description="Join our Newsletter"
                />
            </ThemeProvider>
    );
}
Blog.propTypes = {
    darkTheme: PropTypes.object.isRequired,
    posts: PropTypes.array.isRequired,
    getBlogByCategory: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired
}
const mapStateToProps = (state) => ({
    getBlogByCategory: state.post.getBlogByCategory,
    darkTheme: state.theme.darkTheme,
    posts: state.post.posts,
    loading: state.post.loading
})

export default connect(mapStateToProps, {getBlogByCategory})(Blog);