import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import material from "./material";

interface FeaturedPostProps {
    post: {
        date: string;
        description: string;
        image: string;
        imageLabel: string;
        title: string;
    }
}

function getLight() {
    return material().light;
}

export default function FeaturedPost(props: FeaturedPostProps) {
    const { post } = props;

    return (
        <Grid item xs={12} md={6}>
            <CardActionArea component="a" href="/blog/post2">
                <Card sx={{ display: 'flex' }}>
                    <CardContent sx={{ flex: 1 , background:`${getLight().primaryContainer}`}}>
                        <Typography component="h2" variant="h5" color={getLight().onPrimaryContainer}>
                            {post.title}
                        </Typography>
                        <Typography variant="subtitle1" color={getLight().onPrimaryContainer}>
                            {post.date}
                        </Typography>
                        <Typography variant="subtitle1" paragraph color={getLight().onPrimaryContainer}>
                            {post.description}
                        </Typography>
                        <Typography variant="subtitle1" color="primary">
                            Continue reading...
                        </Typography>
                    </CardContent>
                    <CardMedia
                        component="img"
                        sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
                        image={post.image}
                        alt={post.imageLabel}
                    />
                </Card>
            </CardActionArea>
        </Grid>
    );
}