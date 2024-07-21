import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import material from "../../material";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {setTheme} from "../../actions/theme";
import Markdown from "./Markdown";
import {Link as RouterLink} from "react-router-dom";

export const FeaturedPost = ({
                                 post: {_id, date, description, image, imageLabel, title},
                                 darkTheme,
                             }) => {

    function getLight() {
        return darkTheme ? material().dark : material().light;
    }

    return (
        <Grid item xs={12} md={6}>
            <RouterLink to="/blog/post1" state={{id: _id}} style={{textDecoration: 'none', color: 'inherit'}}>
                <CardActionArea>
                    <Card sx={{display: 'flex'}}>
                        <CardContent sx={{flex: 1, background: `${getLight().primary}`}}>
                            <Typography component="h2" variant="h5" color={getLight().onPrimary}>
                                {title}
                            </Typography>
                            <Typography variant="subtitle1" color={getLight().onPrimary}>
                                {date}
                            </Typography>
                            <Typography variant="subtitle1" paragraph color={getLight().onPrimary}>
                                <Markdown>
                                    {description.substring(0, 80) + ". . . ."}
                                </Markdown>
                            </Typography>
                        </CardContent>
                        <CardMedia
                            component="img"
                            sx={{width: 160, display: {xs: 'none', sm: 'block'}}}
                            image={image}
                            alt={imageLabel}
                        />
                    </Card>
                </CardActionArea>
            </RouterLink>
        </Grid>
    );
}
FeaturedPost.propTypes = {
    post: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        imageLabel: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
    }).isRequired,

    darkTheme: PropTypes.bool.isRequired,
    setTheme: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
    darkTheme: state.theme.darkTheme,
})

export default connect(mapStateToProps, {setTheme})(FeaturedPost)