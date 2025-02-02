import * as React from 'react';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import material from "./material";

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
}

export default function Sidebar(props: SidebarProps) {
    const { archives, description, social, title } = props;

    return (
        <Grid item xs={12} md={4}>
            <Paper elevation={0} sx={{ p: 2, bgcolor: `${material().light.secondaryContainer}` }}>
                <Typography variant="h6" gutterBottom color={material().light.onSecondaryContainer}>
                    {title}
                </Typography>
                <Typography color = {material().light.onSecondaryContainer}>{description}</Typography>
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