import * as React from "react";
import {LinearProgress, TextField, withStyles, withTheme} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {ItemType} from "../../../constants";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({

});

export class _InventoryTab extends React.Component {

    constructor(props) {
        super(props);
        this.state = {inventory: props.inventory};
    }

    componentDidMount() {
        this.props.fetchInventory(this.props.player.id);
    }

    changeSlotValue(slot, event, value) {
        let newSlotState = Object.assign({}, slot, {item: value});
        this.props.updateInventorySlot(this.props.inventory.id, newSlotState);
    }

    render() {
        const { items, inventory } = this.props;

        return (
            inventory ?
                <form>
                    <Grid container>
                        {inventory.slots.map(slot => (
                            <Grid item xs={12} key={slot.slot}>
                                <FormControl fullWidth margin="dense">
                                    <FormHelperText>Slot {slot.slot}</FormHelperText>
                                    <Autocomplete
                                        id={"inventory-slot-" + slot.slot}
                                        options={items ? items.filter(i => i.type.id !== ItemType.HORSE) : [slot.item]}
                                        value={slot.item}
                                        getOptionLabel={item => `${item.id} - ${item.name}`}
                                        onChange={this.changeSlotValue.bind(this, slot)}
                                        renderInput={params => <TextField {...params} variant="standard"  />}
                                    />
                                </FormControl>
                            </Grid>
                        ))}
                    </Grid>
                </form>
                :
                <div>
                    <LinearProgress/>
                    <Typography>Loading player inventory data...</Typography>
                </div>
        );
    }
}

const InventoryTab = withTheme(withStyles(styles)(_InventoryTab));

export default InventoryTab;