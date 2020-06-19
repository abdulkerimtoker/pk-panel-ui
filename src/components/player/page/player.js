import React from "react";
import {FetchPlayerStates} from "../../../reducers/player";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import {LinearProgress,  withStyles, withTheme} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import CharacterTab from "./character";

const styles = theme => ({
    tabsContainer: {
        marginTop: '10px'
    }
});

const TabPanel = props => {
    const { children, value, index, ...other } = props;

    return (
        <Container
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
            {...other}
        >
            {value === index && children}
        </Container>
    );
};

function a11yProps(index) {
    return {
        id: `scrollable-auto-tab-${index}`,
        'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
}

class _Player extends React.Component {

    constructor(props) {
        super(props);
        this.state = {tabIndex: 0};
    }

    componentDidMount() {
        this.props.fetchPlayer(this.getPlayerId());
        this.props.fetchFactionList();
        this.props.fetchTroopList();
        this.props.fetchItemList();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    getPlayerId() {
        return this.props.match ? this.props.match.params.id : this.props.playerId;
    }

    handleFieldChange = updatedPlayer => {
        this.props.setPlayer(updatedPlayer);
    };

    handleTabChange = tab => {
        this.props.history.push('/player/' + this.getPlayerId() + '/' + tab);
    };

    fetchPlayer = () => {
        this.props.fetchPlayer(this.getPlayerId());
    };

    changeTab = (event, newIndex) => this.setState({tabIndex: newIndex});

    render() {
        const { classes, player, factionList, troopList, itemList } = this.props;
        const { tabIndex } = this.state;
        return (
            <Container className={classes.container}>
                {this.props.fetchPlayerState === FetchPlayerStates.FETCHING ? (
                    <div>
                        <LinearProgress/>
                        <Typography>Loading player data...</Typography>
                    </div>
                ) : null}
                {this.props.fetchPlayerState === FetchPlayerStates.FETCHED ? (
                    <div>
                        <AppBar position="static" color="transparent">
                            <Tabs
                                value={tabIndex}
                                onChange={this.changeTab}
                                indicatorColor="primary"
                                textColor="primary"
                                aria-label="scrollable auto tabs example"
                                variant="scrollable"
                            >
                                <Tab label="Character" {...a11yProps(0)} />
                                <Tab label="Inventory" {...a11yProps(1)} />
                                <Tab label="Door Keys" {...a11yProps(2)} />
                                <Tab label="Board Accesses" {...a11yProps(3)} />
                                <Tab label="Bans" {...a11yProps(4)} />
                                <Tab label="Crafting Requests" {...a11yProps(5)} />
                            </Tabs>
                        </AppBar>
                        <Container component={Paper} className={classes.tabsContainer}>
                            <TabPanel value={tabIndex} index={0}>
                                <CharacterTab
                                    player={player}
                                    factions={factionList}
                                    troops={troopList}
                                    items={itemList}
                                    updatePlayer={this.props.updatePlayer}
                                />
                            </TabPanel>
                            <TabPanel value={tabIndex} index={1}>
                                Item Two
                            </TabPanel>
                            <TabPanel value={tabIndex} index={2}>
                                Item Three
                            </TabPanel>
                            <TabPanel value={tabIndex} index={3}>
                                Item Four
                            </TabPanel>
                            <TabPanel value={tabIndex} index={4}>
                                Item Five
                            </TabPanel>
                            <TabPanel value={tabIndex} index={5}>
                                Item Six
                            </TabPanel>
                        </Container>
                    </div>
                ) : null}
                {this.props.fetchPlayerState === FetchPlayerStates.FAILED ? (
                    <div>
                        <Alert severity="error">Failed to load player data</Alert>
                        <Button onClick={this.fetchPlayer}>Retry</Button>
                    </div>
                ) : null}
            </Container>
        );
    }
}

const Player = withTheme(withStyles(styles)(_Player));

export default Player