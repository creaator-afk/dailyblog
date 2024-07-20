import React, {useEffect} from 'react';
import Grid from "@mui/material/Grid";
import map from "lodash/map";
import range from "lodash/range";
import CardActionArea from "@mui/material/CardActionArea";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import material from "../../material";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {setTheme} from "../../actions/theme";
import Markdown from "./Markdown";

const Scrolling = ({darkTheme, posts}) => {


    useEffect(() => {
    }, [darkTheme]);

    function getLight() {
        return darkTheme ? material().dark : material().light;
    }

    return (
        <Grid item xs={12} md={8}
              sx={{
                  '& .markdown': {
                      py: 3,
                  },
              }}
        >
            {posts.map((post) => (
                <CardActionArea key={post._id} component="a" href="/blog/post3">
                    <Card sx={{display: "flex", marginBottom: "12px"}}>
                        <CardContent sx={{flex: 1, display: "flex", background: `${getLight().tertiary}`}}>
                            <div><Typography component="h2" variant="h5" color={getLight().onTertiary}>
                                {post.title}
                            </Typography>
                                <Typography variant="subtitle1" color={getLight().onTertiary}>
                                    {post.category}
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
        ;
};

Scrolling.propTypes = {
    setTheme: PropTypes.func.isRequired,
    darkTheme: PropTypes.bool,
}

const mapStateToProps = (state) => ({
    darkTheme: state.theme.darkTheme,
})

export default connect(mapStateToProps, {setTheme})(Scrolling);