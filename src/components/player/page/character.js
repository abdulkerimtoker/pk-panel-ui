import * as React from "react";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import {InputLabel, Select, TextField, withStyles, withTheme} from "@material-ui/core";
import Input from "@material-ui/core/Input";
import FormHelperText from "@material-ui/core/FormHelperText";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {ItemType} from "../../../constants";
import Divider from "@material-ui/core/Divider";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Slider from "@material-ui/core/Slider";
import Button from "@material-ui/core/Button";

const styles = theme => ({
    firstExpansion: {
        marginTop: '20px'
    }
});

export class _CharacterTab extends React.Component {

    constructor(props) {
        super(props);
        this.state = {player: props.player};
    }

    changeFieldValue(field, event) {
        let value = event.target.value;
        this.setState(state => ({
            player: Object.assign({}, state.player, {[field]: value})
        }));
    }

    changeSelectValue(field, event, value) {
        this.setState(state => ({
            player: Object.assign({}, state.player, {[field]: value})
        }));
    }

    changeSlidingValue(field, event, value) {
        this.setState(state => ({
            player: Object.assign({}, state.player, {[field]: value})
        }));
    }

    render() {
        const { player } = this.state;
        const { classes, troops, factions, items } = this.props;
        return (
            <form>
                <Grid container>
                    <Grid item xs={12}>
                        <FormControl fullWidth margin="dense">
                            <InputLabel htmlFor="player-name">Name</InputLabel>
                            <Input
                                id="player-name"
                                type="text"
                                name="name"
                                value={player.name}
                                onChange={this.changeFieldValue.bind(this, 'name')}
                            />
                            <FormHelperText>We'll never share your email.</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth margin="dense">
                            <InputLabel htmlFor="player-id">ID</InputLabel>
                            <Input
                                id="player-id"
                                type="number"
                                name="id"
                                value={player.id}
                                disabled
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth margin="dense">
                            <InputLabel htmlFor="player-guid">GUID</InputLabel>
                            <Input
                                id="player-guid"
                                type="number"
                                name="uniqueId"
                                value={player.uniqueId}
                                onChange={this.changeFieldValue.bind(this, 'uniqueId')}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth margin="dense">
                            <InputLabel htmlFor="player-gold">Gold</InputLabel>
                            <Input
                                id="player-gold"
                                type="number"
                                name="gold"
                                value={player.gold}
                                onChange={this.changeFieldValue.bind(this, 'gold')}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth margin="dense">
                            <FormHelperText>Troop</FormHelperText>
                            <Autocomplete
                                id="player-troop"
                                options={troops ? troops : [player.troop]}
                                value={player.troop}
                                getOptionLabel={troop => troop.name}
                                onChange={this.changeSelectValue.bind(this, 'troop')}
                                renderInput={params => <TextField {...params} />}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth margin="dense">
                            <FormHelperText>Faction</FormHelperText>
                            <Autocomplete
                                id="player-faction"
                                options={factions ? factions : [player.faction]}
                                value={player.faction}
                                getOptionLabel={faction => faction.name}
                                onChange={this.changeSelectValue.bind(this, 'faction')}
                                renderInput={params => <TextField {...params} />}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth margin="dense">
                            <InputLabel htmlFor="player-hp">Health: {player.hp}</InputLabel>
                            <Slider
                                id="player-hp"
                                value={player.hp}
                                onChange={this.changeSlidingValue.bind(this, 'hp')}
                                min={0}
                                max={100}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth margin="dense">
                            <InputLabel htmlFor="player-food">Food: {player.food}</InputLabel>
                            <Slider
                                id="player-food"
                                value={player.food}
                                onChange={this.changeSlidingValue.bind(this, 'food')}
                                min={0}
                                max={100}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth margin="dense">
                            <InputLabel htmlFor="player-fatigue">Fatigue: {player.fatigue}</InputLabel>
                            <Slider
                                id="player-fatigue"
                                value={player.fatigue}
                                onChange={this.changeSlidingValue.bind(this, 'fatigue')}
                                min={0}
                                max={1000}
                            />
                        </FormControl>
                    </Grid>
                </Grid>

                <ExpansionPanel className={classes.firstExpansion}>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                    >
                        <Typography>Items</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Grid container>
                            <Grid item xs={12}>
                                <FormControl fullWidth margin="dense">
                                    <FormHelperText>Head Armor</FormHelperText>
                                    <Autocomplete
                                        id="player-head-armor"
                                        options={items ? items.filter(i => i.type.id === ItemType.HEAD_ARMOR) : [player.headArmor]}
                                        value={player.headArmor}
                                        getOptionLabel={item => `${item.id} - ${item.name}`}
                                        onChange={this.changeSelectValue.bind(this, 'headArmor')}
                                        renderInput={params => <TextField {...params} />}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth margin="dense">
                                    <FormHelperText>Body Armor</FormHelperText>
                                    <Autocomplete
                                        id="player-body-armor"
                                        options={items ? items.filter(i => i.type.id === ItemType.BODY_ARMOR) : [player.bodyArmor]}
                                        value={player.bodyArmor}
                                        getOptionLabel={item => `${item.id} - ${item.name}`}
                                        onChange={this.changeSelectValue.bind(this, 'bodyArmor')}
                                        renderInput={params => <TextField {...params} />}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth margin="dense">
                                    <FormHelperText>Foot Armor</FormHelperText>
                                    <Autocomplete
                                        id="player-foot-armor"
                                        options={items ? items.filter(i => i.type.id === ItemType.FOOT_ARMOR) : [player.footArmor]}
                                        value={player.footArmor}
                                        getOptionLabel={item => `${item.id} - ${item.name}`}
                                        onChange={this.changeSelectValue.bind(this, 'footArmor')}
                                        renderInput={params => <TextField {...params} />}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth margin="dense">
                                    <FormHelperText>Hand Armor</FormHelperText>
                                    <Autocomplete
                                        id="player-hand-armor"
                                        options={items ? items.filter(i => i.type.id === ItemType.HAND_ARMOR) : [player.handArmor]}
                                        value={player.handArmor}
                                        getOptionLabel={item => `${item.id} - ${item.name}`}
                                        onChange={this.changeSelectValue.bind(this, 'handArmor')}
                                        renderInput={params => <TextField {...params} />}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth margin="dense">
                                    <FormHelperText>Item 0</FormHelperText>
                                    <Autocomplete
                                        id="player-item_0"
                                        options={items ? items.filter(i => i.type.id === ItemType.ITEM) : [player.item_0]}
                                        value={player.item_0}
                                        getOptionLabel={item => `${item.id} - ${item.name}`}
                                        onChange={this.changeSelectValue.bind(this, 'item_0')}
                                        renderInput={params => <TextField {...params} />}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth margin="dense">
                                    <FormHelperText>Item 1</FormHelperText>
                                    <Autocomplete
                                        id="player-item_1"
                                        options={items ? items.filter(i => i.type.id === ItemType.ITEM) : [player.item_1]}
                                        value={player.item_1}
                                        getOptionLabel={item => `${item.id} - ${item.name}`}
                                        onChange={this.changeSelectValue.bind(this, 'item_1')}
                                        renderInput={params => <TextField {...params} />}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth margin="dense">
                                    <FormHelperText>Item 2</FormHelperText>
                                    <Autocomplete
                                        id="player-item_2"
                                        options={items ? items.filter(i => i.type.id === ItemType.ITEM) : [player.item_2]}
                                        value={player.item_2}
                                        getOptionLabel={item => `${item.id} - ${item.name}`}
                                        onChange={this.changeSelectValue.bind(this, 'item_2')}
                                        renderInput={params => <TextField {...params} />}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth margin="dense">
                                    <FormHelperText>Item 3</FormHelperText>
                                    <Autocomplete
                                        id="player-item_3"
                                        options={items ? items.filter(i => i.type.id === ItemType.ITEM) : [player.item_3]}
                                        value={player.item_3}
                                        getOptionLabel={item => `${item.id} - ${item.name}`}
                                        onChange={this.changeSelectValue.bind(this, 'item_3')}
                                        renderInput={params => <TextField {...params} />}
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>
                    </ExpansionPanelDetails>
                </ExpansionPanel>

                <ExpansionPanel>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                    >
                        <Typography>Horses</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Grid container>
                            <Grid item xs={12}>
                                <FormControl fullWidth margin="dense">
                                    <FormHelperText>Horse 0</FormHelperText>
                                    <Autocomplete
                                        id="player-horse_0"
                                        options={items ? items.filter(i => i.type.id === ItemType.HORSE) : [player.horse_0]}
                                        value={player.horse_0}
                                        getOptionLabel={item => `${item.id} - ${item.name}`}
                                        onChange={this.changeSelectValue.bind(this, 'horse_0')}
                                        renderInput={params => <TextField {...params} />}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth margin="dense">
                                    <FormHelperText>Horse 1</FormHelperText>
                                    <Autocomplete
                                        id="player-horse_1"
                                        options={items ? items.filter(i => i.type.id === ItemType.HORSE) : [player.horse_1]}
                                        value={player.horse_1}
                                        getOptionLabel={item => `${item.id} - ${item.name}`}
                                        onChange={this.changeSelectValue.bind(this, 'horse_1')}
                                        renderInput={params => <TextField {...params} />}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth margin="dense">
                                    <FormHelperText>Horse 2</FormHelperText>
                                    <Autocomplete
                                        id="player-horse_2"
                                        options={items ? items.filter(i => i.type.id === ItemType.HORSE) : [player.horse_2]}
                                        value={player.horse_2}
                                        getOptionLabel={item => `${item.id} - ${item.name}`}
                                        onChange={this.changeSelectValue.bind(this, 'horse_2')}
                                        renderInput={params => <TextField {...params} />}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth margin="dense">
                                    <InputLabel htmlFor="player-guid">Riding Tier</InputLabel>
                                    <Input
                                        id="player-riding-tier"
                                        type="number"
                                        name="uniqueId"
                                        value={player.ridingTier}
                                        onChange={this.changeFieldValue.bind(this, 'ridingTier')}
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <Button variant="contained"
                        color="primary"
                        onClick={this.props.updatePlayer.bind(this, player)}>
                    Save Changes
                </Button>
            </form>
        );
    }
}

const CharacterTab = withTheme(withStyles(styles)(_CharacterTab));

export default CharacterTab;