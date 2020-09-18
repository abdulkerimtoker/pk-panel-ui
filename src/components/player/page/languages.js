import {
    Container,
    Input,
    InputLabel,
    LinearProgress, TableCell,
    TableContainer,
    TextField,
    withStyles,
    withTheme
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Button from "@material-ui/core/Button";
import * as React from "react";
import Typography from "@material-ui/core/Typography";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import Table from "@material-ui/core/Table";


const styles = theme => ({

});

export class _LanguagesTab extends React.Component {

    constructor(props) {
        super(props);
        this.state = {selectedLanguage: null};
    }

    componentDidMount() {
        this.props.fetchLanguages();
        this.props.fetchLanguageProficiencies(this.props.player.id);
    }

    handleChangeSelectedLanguage(event, value) {
        this.setState({selectedLanguage: value});
    }

    handleAssign() {
        this.props.assignLanguageProficiency(this.props.player.id, this.state.selectedLanguage.id);
    }

    handleRevoke(languageId) {
        this.props.revokeLanguageProficiency(this.props.player.id, languageId);
    }

    render() {
        const { languages, languageProficiencies } = this.props;
        const { selectedLanguage } = this.state;

        return (
            <Container>
                <form>
                    <Grid container>
                        <Grid item xs={10}>
                            <FormControl fullWidth margin="dense">
                                <FormHelperText>Assign Language Proficiency</FormHelperText>
                                <Autocomplete
                                    options={languages ? languages : []}
                                    value={selectedLanguage}
                                    getOptionLabel={language => `${language.id} - ${language.name}`}
                                    onChange={this.handleChangeSelectedLanguage.bind(this)}
                                    renderInput={params => <TextField {...params} variant="standard" />}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={2}>
                            <Button onClick={this.handleAssign.bind(this)}>Assign</Button>
                        </Grid>
                    </Grid>
                </form>
                {languageProficiencies ?
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{fontWeight: 'bolder'}}>ID</TableCell>
                                    <TableCell style={{fontWeight: 'bolder'}}>Name</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {languageProficiencies.map(proficiency => (
                                    <TableRow key={proficiency.language.id.toString()}>
                                        <TableCell>{proficiency.language.id.toString()}</TableCell>
                                        <TableCell>{proficiency.language.name}</TableCell>
                                        <TableCell>
                                            <Button onClick={this.handleRevoke.bind(this, proficiency.language.id)}>
                                                Revoke
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    :
                    <div>
                        <LinearProgress/>
                        <Typography>Loading player language proficiency data...</Typography>
                    </div>
                }
            </Container>
        );
    }
}

const LanguagesTab = withTheme(withStyles(styles)(_LanguagesTab));
export default LanguagesTab;
