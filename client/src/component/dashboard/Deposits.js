import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';

function preventDefault(event) {
    event.preventDefault();
}

export default function Deposits() {
    return (
        <React.Fragment>
            <Title>Overall Reach</Title>
            <Typography component="p" variant="h4">
                3,024.00
            </Typography>
            <Typography color="text.secondary" sx={{ flex: 1 }}>
                impressions by 15 March, 2019
            </Typography>
            <div>
                <Link color="primary" href="#" onClick={preventDefault}>
                    View more
                </Link>
            </div>
        </React.Fragment>
    );
}