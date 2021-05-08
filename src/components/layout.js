import React from 'react';

import PlayerList from "../containers/player/list";
import {Route, Switch} from "react-router-dom";
import PlayerPage from "../containers/player";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import {withStyles} from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import clsx from "clsx";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import BoardIcon from '@material-ui/icons/Assessment';
import AdminIcon from '@material-ui/icons/AccessibleForward';
import LogIcon from '@material-ui/icons/Subject';
import DoorIcon from '@material-ui/icons/MeetingRoom'
import PeopleIcon from '@material-ui/icons/People';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import withTheme from "@material-ui/core/styles/withTheme";
import { withRouter } from "react-router-dom";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {FormControl, Grid, Input, Paper, TextField} from "@material-ui/core";
import SockJS from "sockjs-client";
import Stomp from "stompjs-websocket";
import ServerPage from "../containers/server/server";
import Button from "@material-ui/core/Button";
import LogsPage from "../containers/logs/logs";
import httpclient from "../utils/httpclient";
import CraftingStationList from "../containers/crafting/list";
import CraftingStationPage from "../containers/crafting";
import AdminList from "../containers/admin/list";
import AdminPage from "../containers/admin";
import InputLabel from "@material-ui/core/InputLabel";
import DoorList from "./door/list";
import DoorPage from "./door";
import BoardList from "./board/list";
import BoardPage from "./board";
import PermissionsList from "./permissions";

const drawerWidth = 240;

const styles = theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    contentDrawerOpen: {
        width: `calc(100% - ${drawerWidth}px)`
    },
    contentDrawerClosed: {
        width: `calc(100% - ${theme.spacing(7) + 1}px)`
    }
});

class _MainLayout extends React.Component {

    constructor(props) {
        super(props);
        this.state = {open: false, invitationCode: ''};
    }

    handleDrawerOpen = () => {
        this.setState({open: true});
    };

    handleDrawerClose = () => {
        this.setState({open: false});
    };

    handleSelectServer(event, value) {
        this.props.selectServer(value);
    }

    handleChangeInvitationCode(event) {
        this.setState({invitationCode: event.target.value});
    }

    handleUseInvitationCode() {
        httpclient.fetch(`/api/invitation/${this.state.invitationCode}`, {method: 'PUT'})
            .then(resp => {
                if (resp.status === 200) alert("You've successfully used the invitation code. You will be re-logged for the change to take effect.");
                else alert('The invitation code is invalid.');
            });
    }

    goToLink(link) {
        this.props.history.push(link);
    }

    logOut() {
        httpclient.fetch('/api/logout');
        localStorage.removeItem('JWT');
        localStorage.removeItem('Selected-Server-ID');
        window.location.href = '/';
    }

    render() {
        const {
            classes, theme,
            serverList, selectedServer,
            authorities
        } = this.props;

        return (
            <div className={classes.root}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    className={clsx(classes.appBar, {
                        [classes.appBarShift]: this.state.open,
                    })}
                >
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={this.handleDrawerOpen}
                            edge="start"
                            className={clsx(classes.menuButton, {
                                [classes.hide]: this.state.open,
                            })}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap>
                            Saptor Panel
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
                    className={clsx(classes.drawer, {
                        [classes.drawerOpen]: this.state.open,
                        [classes.drawerClose]: !this.state.open,
                    })}
                    classes={{
                        paper: clsx({
                            [classes.drawerOpen]: this.state.open,
                            [classes.drawerClose]: !this.state.open,
                        }),
                    }}
                >
                    <div className={classes.toolbar}>
                        <IconButton onClick={this.handleDrawerClose}>
                            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                        </IconButton>
                    </div>
                    <Divider />
                    <Autocomplete
                        options={serverList ? serverList : []}
                        value={selectedServer}
                        onChange={this.handleSelectServer.bind(this)}
                        getOptionLabel={server => `${server.id} - ${server.name}`}
                        renderInput={params => <TextField {...params} variant="standard" />}
                    />
                    <Divider />
                    {selectedServer ? (
                        <List>
                            {authorities.includes(`ROLE_${selectedServer.id}_PLAYER_MANAGER`) &&
                            <ListItem button key="players" onClick={this.goToLink.bind(this, '/players')}>
                                <ListItemIcon>
                                    <PeopleIcon />
                                </ListItemIcon>
                                <ListItemText primary="Players" />
                            </ListItem>
                            }
                            {authorities.includes(`ROLE_${selectedServer.id}_DOOR_MANAGER`) &&
                            <ListItem button key="doors" onClick={this.goToLink.bind(this, '/doors')}>
                                <ListItemIcon>
                                    <DoorIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Doors"/>
                            </ListItem>
                            }
                            {authorities.includes(`ROLE_${selectedServer.id}_BOARD_MANAGER`) &&
                            <ListItem button key="boards" onClick={this.goToLink.bind(this, '/boards')}>
                                <ListItemIcon>
                                    <DoorIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Boards"/>
                            </ListItem>
                            }
                            {authorities.includes(`ROLE_${selectedServer.id}_CRAFTING_MANAGER`) &&
                            <ListItem button key="craftingStations"
                                      onClick={this.goToLink.bind(this, '/craftingStations')}>
                                <ListItemIcon>
                                    <BoardIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Crafting Stations"/>
                            </ListItem>
                            }
                            {authorities.includes(`ROLE_${selectedServer.id}_LOG_CHECKER`) &&
                            <ListItem button key="logs" onClick={this.goToLink.bind(this, '/logs')}>
                                <ListItemIcon>
                                    <LogIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Logs"/>
                            </ListItem>
                            }
                            {authorities.includes(`ROLE_${selectedServer.id}_PERMISSIONS_MANAGER`) &&
                            <ListItem button key="permissions" onClick={this.goToLink.bind(this, '/permissions')}>
                                <ListItemIcon>
                                    <LogIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Permissions"/>
                            </ListItem>
                            }
                            {authorities.includes(`ROLE_${selectedServer.id}_ADMIN_MANAGER`) &&
                            <ListItem button key="admins" onClick={this.goToLink.bind(this, '/admins')}>
                                <ListItemIcon>
                                    <AdminIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Admins"/>
                            </ListItem>
                            }
                            {authorities.includes(`ROLE_${selectedServer.id}_SERVER_MANAGER`) &&
                            <ListItem button key="server" onClick={this.goToLink.bind(this, '/server')}>
                                <ListItemIcon>
                                    <AdminIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Server"/>
                            </ListItem>
                            }
                        </List>
                    ) : 'Select a Server'}
                    <Divider/>
                    <ListItem button key="logout" onClick={this.logOut.bind(this)}>
                        <ListItemText primary="Log out"/>
                    </ListItem>
                </Drawer>
                <main
                    className={clsx(classes.content, {
                        [classes.contentDrawerOpen]: this.state.open,
                        [classes.contentDrawerClosed]: !this.state.open
                    })}
                >
                    <div className={classes.toolbar} />
                    {selectedServer ?
                        <Switch>
                            <Route path="/players" component={PlayerList} />
                            <Route path="/player/:id/:tab?" component={PlayerPage} />
                            <Route path="/server" component={ServerPage} />
                            <Route path="/logs" component={LogsPage} />
                            <Route path="/craftingStations" component={CraftingStationList} />
                            <Route path="/craftingStation/:id" component={CraftingStationPage} />
                            <Route path="/admins" component={AdminList} />
                            <Route path="/admin/:id" component={AdminPage} />
                            <Route path="/doors" component={DoorList} />
                            <Route path="/door/:doorId" component={DoorPage} />
                            <Route path="/boards" component={BoardList} />
                            <Route path="/board/:boardId" component={BoardPage} />
                            <Route path="/permissions" component={PermissionsList} />
                        </Switch>
                        :
                        <Grid container>
                            <Grid item xs={12}>
                                <h3>Use Invitation</h3>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl>
                                    <InputLabel htmlFor="invitation-code">
                                        Code
                                    </InputLabel>
                                    <Input
                                        id="invitation-code"
                                        value={this.state.invitationCode}
                                        onChange={this.handleChangeInvitationCode.bind(this)}
                                    />
                                </FormControl>
                                <Button
                                    variant="contained" color="primary"
                                    onClick={this.handleUseInvitationCode.bind(this)}
                                >
                                    Use
                                </Button>
                            </Grid>
                        </Grid>
                    }
                </main>
            </div>
        );
    }
}

const MainLayout = withTheme(withStyles(styles)(withRouter(_MainLayout)));

export default MainLayout