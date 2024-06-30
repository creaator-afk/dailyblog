import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import Header from './Header';
import MainFeaturedPost from './MainFeaturedPost';
import FeaturedPost from './FeaturedPost';
import Sidebar from './Sidebar';
import Footer from './Footer';
import map from "lodash/map"
import range from "lodash/range";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import MaterialTheme from './/material-theme.json'
import material from "./material";


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

const mainFeaturedPost = {
    title: 'Title of a longer featured blog post',
    description:
        "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
    image: 'https://picsum.photos/800/300',
    imageText: 'main image description',
    linkText: 'Continue reading…',
};

const featuredPosts = [
    {
        title: 'Featured post',
        date: 'Nov 12',
        description:
            'This is a wider card with supporting text below as a natural lead-in to additional content.',
        image: 'https://picsum.photos/200/220',
        imageLabel: 'Image Text',
    },
    {
        title: 'Post title',
        date: 'Nov 11',
        description:
            'This is a wider card with supporting text below as a natural lead-in to additional content.',
        image: 'https://picsum.photos/200/200',
        imageLabel: 'Image Text',
    },
];

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

const defaultTheme = createTheme(MaterialTheme);

function getLight() {
    return material().dark;
}

const Scrolling = () => {
    return (
        <Grid item xs={12} md={8}
              sx={{
                  '& .markdown': {
                      py: 3,
                  },
              }}
        >
            {map(range(4), _ => (
                <CardActionArea component="a" href="/blog/post3">
                <Card sx={{display: "flex", marginBottom:"12px"}}>
                    <CardContent sx={{flex: 1, display: "flex", background:`${getLight().tertiary}`}}>
                        <div><Typography component="h2" variant="h5" color={getLight().onTertiary}>
                            This is a blog
                        </Typography>
                            <Typography variant="subtitle1" color={getLight().onTertiary}>
                                How it started
                            </Typography>
                            <Typography variant="subtitle1" paragraph color={getLight().onTertiary}>
                                It all started with a spark, that ignited and made many possibilities visible
                            </Typography>
                            <Typography variant="subtitle1" color="primary">
                                Continue reading...
                            </Typography></div>
                    </CardContent>
                </Card>
            </CardActionArea>
            ))}

        </Grid>
    )
}


export default function Blog() {
    return (
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline/>
            <Container maxWidth="lg" >
                <Header title="DailyBlog" sections={sections} loggedIn = {true}/>
                <main>
                    <MainFeaturedPost post={mainFeaturedPost}/>
                    <Grid container spacing={4}>
                        {featuredPosts.map((post) => (
                            <FeaturedPost key={post.title} post={post}/>
                        ))}
                    </Grid>
                    <Grid container spacing={5} sx={{mt: 3}}>
                        <Scrolling/>
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