import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import {Backdrop, InputBase} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import {WbSunnyOutlined, WbSunnyRounded} from "@mui/icons-material";
import AccountCircleRounded from "@mui/icons-material/AccountCircleRounded";
import {Helmet} from "react-helmet";
import material from "./material";

interface HeaderProps {
    sections: ReadonlyArray<{
        title: string;
        url: string;
    }>;
    title: string;
}

export default function Header(props: HeaderProps) {
    const {sections, title, loggedIn} = props;
    const [open, setOpen] = React.useState(false);
    const [dark, setTheme] = React.useState(false);

    const themeDark = () => {
        setTheme(false);
    }
    const themeLight = () => {
        setTheme(true);
    }
    const handleClose = () => {
        setOpen(false);
    }
    const handleOpen = () => {
        setOpen(true);
    }

    return (
        <React.Fragment>

            <Toolbar sx={{borderBottom: 1, borderColor: 'divider', background: `${material().light.surfaceVariant}`}}>
                <Button
                    size="small"
                    sx={{color: `${material().light.onSurfaceVariant}`}}

                >Subscribe</Button>
                <Typography
                    component="h2"
                    variant="h5"
                    color={material().light.onSurfaceVariant}
                    align="center"
                    noWrap
                    sx={{flex: 1}}
                >
                    {title}
                </Typography>
                <Backdrop
                    sx={{color: 'rgb(0,0,0)', zIndex: (theme) => theme.zIndex.drawer + 1}}
                    open={open}
                >
                    <Paper
                        component="form"
                        sx={{p: '2px 4px', display: 'flex', alignItems: 'center', width: 700}}
                    >
                        <IconButton sx={{p: '10px'}} aria-label="menu">
                            <MenuIcon/>
                        </IconButton>
                        <InputBase
                            sx={{ml: 1, flex: 2}}
                            placeholder="Search Blogpost"
                            inputProps={{'aria-label': 'search blogpost'}}
                        />
                        <Divider sx={{height: 28, m: 0.5}} orientation="vertical"/>
                        <InputBase
                            sx={{ml: 1, flex: 1}}
                            placeholder="Category"
                            inputProps={{'aria-label': 'search google maps'}}
                        />
                        <IconButton type="button" sx={{p: '10px'}} aria-label="search">
                            <SearchIcon onClick={handleClose}/>
                        </IconButton>
                    </Paper>

                </Backdrop>
                <IconButton>
                    <SearchIcon onClick={handleOpen}/>
                </IconButton>
                {loggedIn ? (
                    <IconButton href="/dashboard" size="small">
                        <AccountCircleRounded sx={{color: `${material().light.primary}`}}/>
                    </IconButton>
                ) : (
                    <Button href="/signup" variant="filled" size="small"
                            sx={{background: `${material().light.primary}`, color: `${material().light.onPrimary}`}}>
                        Sign up
                    </Button>
                )}
                {dark ? (<Helmet>
                    <style>{`body { background-color: ${material().dark.background}; }`}</style>
                </Helmet>) : (<Helmet>
                    <style>{`body { background-color: ${material().light.background}; }`}</style>
                </Helmet>)}
                {dark ? (<IconButton size="small"><WbSunnyOutlined
                        sx={{color: `${material().dark.primary}`}} onClick={themeDark}/></IconButton>)
                    :
                    (<IconButton size="small"><WbSunnyRounded sx={{color: `${material().light.primary}`}}
                                                          onClick={themeLight}/></IconButton>)}

            </Toolbar>
            <Toolbar
                component="nav"
                variant="dense"
                sx={{justifyContent: 'space-between', overflowX: 'auto'}}
            >
                {sections.map((section) => (
                    <Link
                        color={material().light.onBackground}
                        noWrap
                        key={section.title}
                        variant="body2"
                        href={section.url}
                        sx={{p: 1, flexShrink: 0}}
                    >
                        <Typography
                            color={material().light.onBackground}
                            variant="body2"
                        >
                            {section.title}
                        </Typography>
                    </Link>
                ))}
            </Toolbar>
        </React.Fragment>
    );
}
