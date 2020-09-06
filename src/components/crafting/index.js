import {
    Container, Grid,
    InputLabel,
    Paper,
    Table,
    TableBody,
    TableContainer, TableFooter,
    TableHead, TableRow, TextField,
    withStyles,
    withTheme
} from "@material-ui/core";
import React from "react";
import Input from "@material-ui/core/Input";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import TableCell from "@material-ui/core/TableCell";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import {ItemType} from "../../constants";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";

const styles = themes => ({

});

export class _CraftingStationPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            craftingStation: this.props.craftingStation,
            craftingRecipes: this.props.craftingRecipes,
            craftingStationInstances: this.props.craftingStationInstances,
            instanceName: '',
            recipeToCreate: {
                item: null,
                profession: null,
                professionTier: 1,
                price: 0,
                hours: 0,
                itemRequirements: []
            }
        };
    }

    componentDidMount() {
        let stationId = parseInt(this.props.match.params.id);
        this.props.fetchItems();
        this.props.fetchProfessions();
        this.props.fetchCraftingStation(stationId);
        this.props.fetchCraftingRecipes(stationId);
        this.props.fetchCraftingStationInstances(stationId);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        let propsToUpdate = ['craftingStation', 'craftingRecipes', 'craftingStationInstances'];
        propsToUpdate.forEach(prop => {
            if (this.props[prop] !== prevProps[prop])
                this.setState({[prop]: this.props[prop]});
        });
    }

    changeStationFieldValue(field, event) {
        let value = event.target.value;
        this.setState(state => ({
            craftingStation: Object.assign({}, state.craftingStation, {[field]: value})
        }));
    }

    handleSave() {
        this.props.updateCraftingStation(this.state.craftingStation);
    }

    deleteCraftingRecipe(recipe) {
        this.props.deleteCraftingRecipe(recipe).then(() => {
            this.setState({craftingRecipes: this.props.craftingRecipes.filter(r => r.id !== recipe.id)});
        });
    }

    handleChangeInstanceName(event) {
        this.setState({ instanceName: event.target.value });
    }

    handleCreateInstance() {
        this.props.createCraftingStationInstance(this.state.craftingStation.index, this.state.instanceName);
    }

    handleChangeRecipeField(id, field, event) {
        this.setState({
            craftingRecipes: this.state.craftingRecipes.map(recipe => recipe.id === id ?
                Object.assign({}, recipe, {[field]: event.target.value})
                :
                recipe
            )
        });
    }

    handleChangeRecipeValue(id, field, event, value) {
        this.setState({
            craftingRecipes: this.state.craftingRecipes.map(recipe => recipe.id === id ?
                Object.assign({}, recipe, {[field]: value})
                :
                recipe
            )
        });
    }

    handleChangeRequirementAmount(id, itemId, event) {
        this.setState({
            craftingRecipes: this.state.craftingRecipes.map(recipe => recipe.id === id ?
                Object.assign({}, recipe, {
                    itemRequirements: recipe.itemRequirements.map(requirement => requirement.item.id === itemId ?
                        Object.assign({}, requirement, {amount: parseInt(event.target.value)})
                        : requirement
                    )
                })
                : recipe
            )
        });
    }

    handleChangeRequirementItem(id, itemId, event, value) {
        this.setState({
            craftingRecipes: this.state.craftingRecipes.map(recipe => recipe.id === id ?
                Object.assign({}, recipe, {
                    itemRequirements: recipe.itemRequirements.map(requirement => requirement.item.id === itemId ?
                        Object.assign({}, requirement, {item: value})
                        : requirement
                    )
                })
                : recipe
            )
        });
    }

    handleAddRequirement(id) {
        this.setState({
            craftingRecipes: this.state.craftingRecipes.map(recipe => recipe.id === id ?
                Object.assign({}, recipe, {
                    itemRequirements: [...recipe.itemRequirements, {item: this.props.items[0], amount: 0}]
                })
                : recipe
            )
        });
    }

    handleRemoveRequirement(id, itemId) {
        this.setState({
            craftingRecipes: this.state.craftingRecipes.map(recipe => recipe.id === id ?
                Object.assign({}, recipe, {
                    itemRequirements: recipe.itemRequirements.filter(req => req.item.id !== itemId)
                })
                : recipe
            )
        });
    }

    handleChangeRecipeToCreateField(field, event) {
        this.setState({
            recipeToCreate: Object.assign({}, this.state.recipeToCreate,
                {[field]: event.target.value})
        });
    }

    handleChangeRecipeToCreateValue(field, event, value) {
        this.setState({
            recipeToCreate: Object.assign({}, this.state.recipeToCreate,
                {[field]: value})
        });
    }

    handleChangeRequirementToCreateAmount(itemId, event) {
        this.setState({
            recipeToCreate: Object.assign({}, this.state.recipeToCreate, {
                itemRequirements: this.state.recipeToCreate.itemRequirements.map(req =>
                    req.item.id === itemId ?
                        Object.assign({}, req, {amount: parseInt(event.target.value)})
                        : req
                )
            })
        });
    }

    handleChangeRequirementToCreateItem(itemId, event, value) {
        this.setState({
            recipeToCreate: Object.assign({}, this.state.recipeToCreate, {
                itemRequirements: this.state.recipeToCreate.itemRequirements.map(req =>
                    req.item.id === itemId ?
                        Object.assign({}, req, {item: value}) : req
                )
            })
        });
    }

    handleAddRequirementToCreate() {
        this.setState({
            recipeToCreate: Object.assign({}, this.state.recipeToCreate, {
                itemRequirements: [
                    ...this.state.recipeToCreate.itemRequirements,
                    {item: this.props.items[0], amount: 0}
                ]
            })
        });
    }

    recipeSorter(a, b) {
        if (a.item.id > b.item.id) return 1;
        if (a.item.id < b.item.id) return -1;
        return 0;
    }

    render() {
        const { items, professions } = this.props;
        const {
            craftingStation, craftingRecipes,
            craftingStationInstances, instanceName,
            recipeToCreate
        } = this.state;

        const tiers = [...Array(5).keys()].map(k => k + 1);

        return (
            craftingStation && craftingRecipes && craftingStationInstances &&
            <Container>
                <h2>{craftingStation.name}</h2>
                <FormControl fullWidth margin="dense">
                    <InputLabel htmlFor="player-name">Name</InputLabel>
                    <Input
                        id="station-name"
                        type="text"
                        name="name"
                        value={craftingStation.name}
                        onChange={this.changeStationFieldValue.bind(this, 'name')}
                    />
                    <FormHelperText>We'll never share your email.</FormHelperText>
                </FormControl>
                <FormControl margin="dense">
                    <Button
                        onClick={this.handleSave.bind(this)}
                        color="primary" variant="contained">Save</Button>
                </FormControl>

                <h3>Instances</h3>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Name</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {craftingStationInstances.map(instance =>
                            <TableRow key={instance.id.toString()}>
                                <TableCell>{instance.id.toString()}</TableCell>
                                <TableCell>{instance.name}</TableCell>
                            </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <FormControl fullWidth margin="dense">
                    <InputLabel htmlFor="instance-name">Name</InputLabel>
                    <Input
                        id="instance-name"
                        type="text"
                        name="name"
                        value={instanceName}
                        onChange={this.handleChangeInstanceName.bind(this)}
                    />
                </FormControl>
                <FormControl margin="dense">
                    <Button
                        onClick={this.handleCreateInstance.bind(this)}
                        color="primary" variant="contained">Create</Button>
                </FormControl>

                <h3>Recipes</h3>
                {tiers.map(tier =>
                    <div>
                        <h4>Tier {tier}</h4>
                        {craftingRecipes.filter(cr => cr.professionTier === tier)
                            .sort(this.recipeSorter)
                            .map(recipe =>
                            <Accordion key={recipe.id.toString()}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography>{recipe.item.name}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Grid container>
                                        <Grid item xs={12}>
                                            <FormControl fullWidth margin="dense">
                                                <InputLabel htmlFor={`recipe-${recipe.id}-id`}>Recipe ID</InputLabel>
                                                <Input
                                                    id={`recipe-${recipe.id}-id`}
                                                    type="number"
                                                    value={recipe.id}
                                                    disabled
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <FormControl fullWidth margin="dense">
                                                <Autocomplete
                                                    id={`recipe-${recipe.id}-item`}
                                                    options={items ? items : []}
                                                    value={recipe.item}
                                                    onChange={this.handleChangeRecipeValue.bind(this, recipe.id, 'item')}
                                                    getOptionLabel={item => `${item.id} - ${item.name}`}
                                                    getOptionSelected={(option, value) => option.id === value.id}
                                                    renderInput={params => <TextField {...params} />}
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <FormControl fullWidth margin="dense">
                                                <Autocomplete
                                                    id={`recipe-${recipe.id}-profession`}
                                                    options={professions ? professions : []}
                                                    value={recipe.profession}
                                                    onChange={this.handleChangeRecipeValue.bind(this, recipe.id, 'profession')}
                                                    getOptionLabel={profession => `${profession.id} - ${profession.name}`}
                                                    getOptionSelected={(option, value) => option.id === value.id}
                                                    renderInput={params => <TextField {...params} />}
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <FormControl fullWidth margin="dense">
                                                <InputLabel htmlFor={`recipe-${recipe.id}-tier`}>Tier</InputLabel>
                                                <Input
                                                    id={`recipe-${recipe.id}-tier`}
                                                    type="number"
                                                    value={recipe.professionTier}
                                                    onChange={this.handleChangeRecipeField.bind(this, recipe.id, 'professionTier')}
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <FormControl fullWidth margin="dense">
                                                <InputLabel htmlFor={`recipe-${recipe.id}-price`}>Price</InputLabel>
                                                <Input
                                                    id={`recipe-${recipe.id}-price`}
                                                    type="number"
                                                    value={recipe.price}
                                                    onChange={this.handleChangeRecipeField.bind(this, recipe.id, 'price')}
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <FormControl fullWidth margin="dense">
                                                <InputLabel htmlFor={`recipe-${recipe.id}-hours`}>Hours</InputLabel>
                                                <Input
                                                    id={`recipe-${recipe.id}-hours`}
                                                    type="number"
                                                    value={recipe.hours}
                                                    onChange={this.handleChangeRecipeField.bind(this, recipe.id, 'hours')}
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} />

                                        <h4>Item Requirements</h4>
                                        {recipe.itemRequirements.map(requirement =>
                                            <Grid container>
                                                <Grid item xs={5}>
                                                    <FormControl fullWidth margin="dense">
                                                        <Autocomplete
                                                            id={`recipe-${recipe.id}-item-requirement-${requirement.item.id}`}
                                                            options={items ? items : []}
                                                            value={requirement.item}
                                                            onChange={
                                                                this.handleChangeRequirementItem.bind(this,
                                                                    recipe.id, requirement.item.id)
                                                            }
                                                            getOptionLabel={item => `${item.id} - ${item.name}`}
                                                            getOptionSelected={(option, value) => option.id === value.id}
                                                            renderInput={params => <TextField {...params} />}
                                                        />
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={5}>
                                                    <FormControl fullWidth margin="dense">
                                                        <InputLabel
                                                            htmlFor={`recipe-${recipe.id}-item-requirement-${requirement.item.id}-amount`}>
                                                            Amount
                                                        </InputLabel>
                                                        <Input
                                                            id={`recipe-${recipe.id}-item-requirement-${requirement.item.id}-amount`}
                                                            type="number"
                                                            value={requirement.amount}
                                                            onChange={
                                                                this.handleChangeRequirementAmount.bind(this,
                                                                    recipe.id, requirement.item.id)
                                                            }
                                                        />
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={2}>
                                                    <Button
                                                        onClick={this.handleRemoveRequirement.bind(this, recipe.id, requirement.item.id)}
                                                    >
                                                        Remove
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        )}
                                        <Grid item xs={4}>
                                            <Button
                                                onClick={this.handleAddRequirement.bind(this, recipe.id)}
                                                variant="contained"
                                                color="secondary"
                                            >
                                                Add Requirement
                                            </Button>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <Button
                                                variant="contained" color="primary"
                                                onClick={this.props.updateCraftingRecipe.bind(this, recipe)}
                                            >
                                                Save
                                            </Button>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <Button
                                                variant="contained" color="secondary"
                                                onClick={this.deleteCraftingRecipe.bind(this, recipe)}
                                            >
                                                Delete
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </AccordionDetails>
                            </Accordion>
                        )}
                    </div>
                )}

                <h3>Create Recipe</h3>
                <Grid container>
                    <Grid item xs={6}>
                        <FormControl fullWidth margin="dense">
                            <Autocomplete
                                id="recipe-create-item"
                                options={items ? items : []}
                                value={recipeToCreate.item}
                                onChange={this.handleChangeRecipeToCreateValue.bind(this, 'item')}
                                getOptionLabel={item => `${item.id} - ${item.name}`}
                                getOptionSelected={(option, value) => value && option.id === value.id}
                                renderInput={params => <TextField {...params} />}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth margin="dense">
                            <Autocomplete
                                id="recipe-create-profession"
                                options={professions ? professions : []}
                                value={recipeToCreate.profession}
                                onChange={this.handleChangeRecipeToCreateValue.bind(this, 'profession')}
                                getOptionLabel={profession => `${profession.id} - ${profession.name}`}
                                getOptionSelected={(option, value) => value && option.id === value.id}
                                renderInput={params => <TextField {...params} />}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth margin="dense">
                            <InputLabel htmlFor="recipe-create-tier">Tier</InputLabel>
                            <Input
                                id="recipe-create-tier"
                                type="number"
                                value={recipeToCreate.professionTier}
                                onChange={this.handleChangeRecipeToCreateField.bind(this, 'professionTier')}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth margin="dense">
                            <InputLabel htmlFor="recipe-create-price">Price</InputLabel>
                            <Input
                                id="recipe-create-price"
                                type="number"
                                value={recipeToCreate.price}
                                onChange={this.handleChangeRecipeToCreateField.bind(this, 'price')}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth margin="dense">
                            <InputLabel htmlFor="recipe-create-hours">Hours</InputLabel>
                            <Input
                                id="recipe-create-hours"
                                type="number"
                                value={recipeToCreate.hours}
                                onChange={this.handleChangeRecipeToCreateField.bind(this, 'hours')}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={6} />

                    <h4>Item Requirements</h4>
                    {recipeToCreate.itemRequirements.map((requirement, index) =>
                        <Grid container>
                            <Grid item xs={6}>
                                <FormControl fullWidth margin="dense">
                                    <Autocomplete
                                        id={`recipe-create-requirement-${index}-item`}
                                        options={items ? items : []}
                                        value={requirement.item}
                                        onChange={
                                            this.handleChangeRequirementToCreateItem.bind(this,
                                                requirement.item.id)
                                        }
                                        getOptionLabel={item => `${item.id} - ${item.name}`}
                                        getOptionSelected={(option, value) => option.id === value.id}
                                        renderInput={params => <TextField {...params} />}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl fullWidth margin="dense">
                                    <InputLabel
                                        htmlFor={`recipe-create-requirement-${index}-amount`}>
                                        Amount
                                    </InputLabel>
                                    <Input
                                        id={`recipe-create-requirement-${index}-amount`}
                                        type="number"
                                        value={requirement.amount}
                                        onChange={
                                            this.handleChangeRequirementToCreateAmount.bind(this,
                                                requirement.item.id)
                                        }
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>
                    )}
                    <Grid item xs={4}>
                        <Button
                            onClick={this.handleAddRequirementToCreate.bind(this)}
                            variant="contained"
                            color="secondary"
                        >
                            Add Requirement
                        </Button>
                    </Grid>
                    <Grid item xs={2}>
                        <Button
                            variant="contained" color="primary"
                            onClick={this.props.createCraftingRecipe.bind(this, craftingStation.index, recipeToCreate)}
                        >
                            Create
                        </Button>
                    </Grid>
                </Grid>
            </Container>
        );
    }
}

const CraftingStationPage = withTheme(withStyles(styles)(_CraftingStationPage));
export default CraftingStationPage;