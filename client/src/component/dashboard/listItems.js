import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountCircleRounded from '@mui/icons-material/AccountCircleRounded';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import {AddBox, HouseRounded} from "@mui/icons-material";
import {Link} from 'react-router-dom'

export const mainListItems = (
    <React.Fragment>
        <Link to="/">
            <ListItemButton>
                <ListItemIcon>
                    <HouseRounded/>
                </ListItemIcon>
                <ListItemText primary="Home"/>
            </ListItemButton>
        </Link>
        <Link to="/blog/post">
            <ListItemButton>
                <ListItemIcon>
                    <AddBox/>
                </ListItemIcon>
                <ListItemText primary="New Blog"/>
            </ListItemButton>
        </Link>
        <ListItemButton>
            <ListItemIcon>
                <DashboardIcon/>
            </ListItemIcon>
            <ListItemText primary="Dashboard"/>
        </ListItemButton>
        <Link to="/profile">
            <ListItemButton>
                <ListItemIcon>
                    <AccountCircleRounded/>
                </ListItemIcon>
                <ListItemText primary="Profile"/>
            </ListItemButton>
        </Link>
        <ListItemButton>
            <ListItemIcon>
                <PeopleIcon/>
            </ListItemIcon>
            <ListItemText primary="Followers"/>
        </ListItemButton>
        <ListItemButton>
            <ListItemIcon>
                <BarChartIcon/>
            </ListItemIcon>
            <ListItemText primary="Reports"/>
        </ListItemButton>
        <ListItemButton>
            <ListItemIcon>
                <LayersIcon/>
            </ListItemIcon>
            <ListItemText primary="Integrations"/>
        </ListItemButton>
    </React.Fragment>
);

export const secondaryListItems = (
    <React.Fragment>
        <ListSubheader component="div" inset>
            Saved reports
        </ListSubheader>
        <ListItemButton>
            <ListItemIcon>
                <AssignmentIcon/>
            </ListItemIcon>
            <ListItemText primary="Current month"/>
        </ListItemButton>
        <ListItemButton>
            <ListItemIcon>
                <AssignmentIcon/>
            </ListItemIcon>
            <ListItemText primary="Last quarter"/>
        </ListItemButton>
        <ListItemButton>
            <ListItemIcon>
                <AssignmentIcon/>
            </ListItemIcon>
            <ListItemText primary="Year-end"/>
        </ListItemButton>
    </React.Fragment>
);