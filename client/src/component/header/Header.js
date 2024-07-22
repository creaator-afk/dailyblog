import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import {Backdrop, Drawer, InputBase, ListItem, Menu, MenuItem, useMediaQuery} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import {Logout, WbSunnyOutlined, WbSunnyRounded} from "@mui/icons-material";
import AccountCircleRounded from "@mui/icons-material/AccountCircleRounded";
import {Helmet} from "react-helmet";
import material from "../../material";
import CssBaseline from "@mui/material/CssBaseline";
import {ThemeProvider, useTheme} from "@mui/material/styles";
import Container from "@mui/material/Container";
import {getTheme} from "./themeSwitcher";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {loadUser, logout} from "../../actions/auth";
import {Link as ReduxLink} from 'react-router-dom'
import {useEffect, useState} from "react";
import {setTheme} from "../../actions/theme";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import {getBlogByCategory} from "../../actions/post";

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
    posts: null;
    getBlogByCategory: void
}

const Header = (props: HeaderProps) => {
    // const {categories, title} = props;
    // local settings start--
    const {title, isAuthenticated, darkTheme, setTheme, logout, posts, getBlogByCategory} = props;

    useEffect(() => {
    }, [darkTheme]);

    useEffect(() => {
        loadUser();
    }, [isAuthenticated]);

    const [open, setOpen] = React.useState(false);

    const switchTheme = () => {
        setTheme();
    }
    const handleClose = () => {
        if (search) {
            console.log(search);
        } else if (category) {
            getBlogByCategory(category);
        }
        setOpen(false);
    }
    const handleOpen = () => {
        setOpen(true);
    }

    const defaultTheme = useTheme();
    const isMobile = useMediaQuery(defaultTheme.breakpoints.down('sm'));
    const [drawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    }

    const getCategories = (posts) => {
        const categories = []
        posts.map((post) => {
            categories.push(post.category);
        });
        return new Set(categories);
    }

    const handleLogout = () => {
        logout();
    }

    const [category, setCategory] = useState("");
    const [search, setSearch] = useState("");
    return (
        <React.Fragment>
            <ThemeProvider theme={defaultTheme}>
                <CssBaseline/>
                <Container maxWidth="lg">
                    {isMobile ? (
                        <Toolbar>
                            <IconButton
                                edge="start"
                                color="default"
                                onClick={toggleDrawer(true)}
                            >
                                <MenuIcon/>
                            </IconButton>
                            <Typography variant="h6" style={{flexGrow: 1}}>
                                Daily Blog
                            </Typography>
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
                                <Button sx={{
                                    bgcolor: `${getTheme(darkTheme).primary}`,
                                    color: `${getTheme(darkTheme).onPrimary}`
                                }} component={ReduxLink} to="/signup" variant="contained" size="small">
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
                            <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
                                <List>
                                    <Typography variant="h6" style={{padding: 10}}>Categories</Typography>
                                    {[...getCategories(posts)].map((section, index) => (
                                        <ListItem button key={section} onClick={toggleDrawer(false)}>
                                            <ListItemText primary={section}/>
                                        </ListItem>
                                    ))}
                                </List>
                            </Drawer>


                        </Toolbar>) : (
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
                                        sx={{ml: 1, flex: 1}}
                                        placeholder="Search.."
                                        inputProps={{'aria-label': 'search dailyBlog'}}
                                        onChange={(e) => setSearch(e.target.value)}
                                        value={search}
                                    />
                                    <Divider sx={{height: 28, m: 0.5}} orientation="vertical"/>
                                    <InputBase
                                        sx={{ml: 1, flex: 1}}
                                        placeholder="Category"
                                        inputProps={{'aria-label': 'search category'}}
                                        onChange={(e) => setCategory(e.target.value)}
                                        value={category}
                                    />
                                    <ReduxLink to="/" state={{category: category, search: search}}
                                               style={{textDecoration: 'none', color: 'inherit'}}>
                                        <IconButton onClick={handleClose} type="button" sx={{p: '10px'}}
                                                    aria-label="search">
                                            <SearchIcon/>
                                        </IconButton>
                                    </ReduxLink>

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
                                <Button sx={{
                                    bgcolor: `${getTheme(darkTheme).primary}`,
                                    color: `${getTheme(darkTheme).onPrimary}`
                                }} component={ReduxLink} to="/signup" variant="contained" size="small">
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

                        </Toolbar>)}

                    {!isMobile && <Toolbar
                        component="nav"
                        variant="dense"
                        sx={{justifyContent: 'space-between', overflowX: 'auto'}}
                    >
                        {[...getCategories(posts)].map((section) => (
                            <Link
                                color={getTheme(darkTheme).onBackground}
                                noWrap
                                key={section}
                                variant="body2"
                                href={section}
                                sx={{p: 1, flexShrink: 0}}
                            >
                                <ReduxLink to="/" state={{category: section}}
                                           style={{textDecoration: 'none', color: 'inherit'}}>
                                    <Typography
                                        color={getTheme(darkTheme).onBackground}
                                        variant="body2"
                                    >
                                        {section}
                                    </Typography>
                                </ReduxLink>
                            </Link>
                        ))}
                        <ReduxLink to="/" state={{category: "All"}}
                                   style={{textDecoration: 'none', color: 'inherit'}}>
                            <Typography
                                color={getTheme(darkTheme).onBackground}
                                variant="body2"
                            >
                                All
                            </Typography>
                        </ReduxLink>
                    </Toolbar>}
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
    posts: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    darkTheme: state.theme.darkTheme,
    posts: state.post.posts,
})

export default connect(mapStateToProps, {logout, setTheme, loadUser, getBlogByCategory})(Header)
// export default  Header;