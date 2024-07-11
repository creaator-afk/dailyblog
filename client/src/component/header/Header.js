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
import {Logout, WbSunnyOutlined, WbSunnyRounded} from "@mui/icons-material";
import AccountCircleRounded from "@mui/icons-material/AccountCircleRounded";
import {Helmet} from "react-helmet";
import material from "../../material";
import CssBaseline from "@mui/material/CssBaseline";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import Container from "@mui/material/Container";
import {getTheme} from "./themeSwitcher";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {loadUser, logout} from "../../actions/auth";
import {Link as ReduxLink} from 'react-router-dom'
import {useEffect} from "react";
import {setTheme} from "../../actions/theme";


interface HeaderProps {
    sections: ReadonlyArray<{
        title: string;
        url: string;
    }>;
    title: string;
    isAuthenticated: boolean;
    darkTheme: boolean;
    setTheme: void;
    loadUser: void;
}

const Header = (props: HeaderProps) => {
    // const {sections, title} = props;
    // local settings start--
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
    const {title, isAuthenticated, darkTheme, setTheme, logout} = props;
    useEffect(() => {
    }, [darkTheme]);

    useEffect(() => {
        loadUser();
    }, [isAuthenticated]);
    //local setitings end --
    const [open, setOpen] = React.useState(false);

    const switchTheme = () => {
        setTheme();
    }
    const handleClose = () => {
        setOpen(false);
    }
    const handleOpen = () => {
        setOpen(true);
    }

    const defaultTheme = createTheme();

    const handleLogout = () => {
        logout();
    }


    return (
        <React.Fragment>
            <ThemeProvider theme={defaultTheme}>
                <CssBaseline/>
                <Container maxWidth="lg">
                    <Toolbar sx={{
                        borderBottom: 1,
                        borderColor: 'divider',
                        background: `${getTheme(darkTheme).surfaceVariant}`
                    }}>
                        <Button
                            size="small"
                            sx={{color: `${getTheme(darkTheme).onSurfaceVariant}`}}

                        >Subscribe</Button>
                        <Typography
                            component="h2"
                            variant="h5"
                            color={getTheme(darkTheme).onSurfaceVariant}
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
                                <IconButton onClick={handleClose} type="button" sx={{p: '10px'}} aria-label="search">
                                    <SearchIcon/>
                                </IconButton>
                            </Paper>

                        </Backdrop>
                        <IconButton onClick={handleOpen} sx={{color: `${getTheme(darkTheme).primary}`}}>
                            <SearchIcon/>
                        </IconButton>
                        {isAuthenticated ? (
                            <div>
                                <IconButton component={ReduxLink} to="/dashboard" size="small">
                                    <AccountCircleRounded sx={{color: `${getTheme(darkTheme).primary}`}}/>
                                </IconButton>
                                <IconButton onClick={handleLogout} size="small">
                                    <Logout sx={{color: `${getTheme(darkTheme).primary}`}}/>
                                </IconButton>
                            </div>
                        ) : (
                            <Button sx={{bgcolor: `${getTheme(darkTheme).primary}`, color: `${getTheme(darkTheme).onPrimary}` }} component={ReduxLink} to="/signup" variant="contained" size="small">
                                Sign up
                            </Button>

                        )}
                        <Helmet>
                            <style>{`body { background-color: ${getTheme(darkTheme).background}; }`}</style>
                        </Helmet>
                        {darkTheme ? (<IconButton onClick={switchTheme} size="small"><WbSunnyOutlined
                                sx={{color: `${material().dark.primary}`}}/></IconButton>)
                            :
                            (<IconButton size="small" onClick={switchTheme}><WbSunnyRounded
                                sx={{color: `${getTheme(darkTheme).primary}`}}
                            /></IconButton>)}

                    </Toolbar>

                    <Toolbar
                        component="nav"
                        variant="dense"
                        sx={{justifyContent: 'space-between', overflowX: 'auto'}}
                    >
                        {sections.map((section) => (
                            <Link
                                color={getTheme(darkTheme).onBackground}
                                noWrap
                                key={section.title}
                                variant="body2"
                                href={section.url}
                                sx={{p: 1, flexShrink: 0}}
                            >
                                <Typography
                                    color={getTheme(darkTheme).onBackground}
                                    variant="body2"
                                >
                                    {section.title}
                                </Typography>
                            </Link>
                        ))}
                    </Toolbar>
                </Container>
            </ThemeProvider>
        </React.Fragment>
    );
}

Header.propTypes = {
    logout: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    setTheme: PropTypes.func.isRequired,
    darkTheme: PropTypes.bool.isRequired,
    loadUser: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    darkTheme: state.theme.darkTheme
})


export default connect(mapStateToProps, {logout, setTheme, loadUser})(Header)
// export default  Header;