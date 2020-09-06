import {
    Container,
    Paper, Table,
    TableBody,
    TableContainer,
    TableHead,
    TableRow,
    withStyles,
    withTheme
} from "@material-ui/core";
import React from "react";
import TableCell from "@material-ui/core/TableCell";

const styles = theme => ({
    row: {
        '&:hover': {
            cursor: 'pointer',
            background: '#AAA'
        }
    }
});

export class _CraftingStationList extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchCraftingStations();
    }

    handleManageStation(stationIndex) {
        this.props.history.push(`/craftingStation/${stationIndex}`);
    }

    render() {
        const { craftingStations, classes } = this.props;
        return (
            <Container>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableCell>Index</TableCell>
                            <TableCell>Name</TableCell>
                        </TableHead>
                        <TableBody>
                            {craftingStations && craftingStations.map(craftingStation =>
                                <TableRow
                                    key={craftingStation.index.toString()}
                                    className={classes.row}
                                    onClick={this.handleManageStation.bind(this, craftingStation.index)}
                                >
                                    <TableCell>{craftingStation.index}</TableCell>
                                    <TableCell>{craftingStation.name}</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        );
    }
}

const CraftingStationList = withTheme(withStyles(styles)(_CraftingStationList));
export default CraftingStationList;