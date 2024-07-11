import * as React from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Markdown from './Markdown';
import {connect} from "react-redux";
import {getBlogById} from "../../actions/post";
import {useEffect} from "react";
import material from "../../material";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import {Link as RouterLink} from "react-router-dom";

function Main(props) {
    const {post,getBlogById, darkTheme} = props;

    useEffect(() => {
        getBlogById("668abfbbe5dbcf6f400ccd5c");
    }, []);

    function getDark() {
        return darkTheme ? material().dark:material().light;
    }

    return (
        <Grid item xs={12} md={8}
              sx={{
                  '& .markdown': {
                      py: 3,
                  },
              }}
        >
            <Paper
                sx={{
                    position: 'relative',
                    backgroundColor: 'grey.800',
                    mb: 4,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundImage: `url(${post.image})`,
                }}
            >
                {/* Increase the priority of the hero background image */}
                {<img style={{ display: 'none' }} src={post.image} alt={post.imageText} />}
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        bottom: 0,
                        right: 0,
                        left: 0,
                        backgroundColor: 'rgba(0,0,0,.3)',
                    }}
                />
                <Box
                    sx={{
                        position: 'relative',
                        p: { xs: 3, md: 6 },
                        pr: { md: 0 },
                    }}
                >
                    <Typography component="h1" variant="h3" color={getDark().onSecondary} gutterBottom>
                        {post.title}
                    </Typography>
                </Box>
            </Paper>
            <Divider/>
            <Typography color={getDark().onSurface}>

            <Markdown className="markdown" >
                {post.description}
            </Markdown>
            </Typography>
        </Grid>
    );
}

Main.propTypes = {
    // post: PropTypes.arrayOf(PropTypes.string).isRequired,
    post: PropTypes.object.isRequired,
    getBlogById: PropTypes.func.isRequired,
    darkTheme: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
    getBlogById: state.post.getBlogById,
    post: state.post.post,
    darkTheme: state.theme.darkTheme
})

export default  connect(mapStateToProps,{getBlogById})(Main);