import {FormControl, Grid, List, TextField, withStyles, withTheme} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import React from "react";
import Button from "@material-ui/core/Button";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import ListItemIcon from "@material-ui/core/ListItemIcon";

const styles = theme => ({
    wordField: {
        marginRight: '10px'
    }
});

export class _LogsPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedLogFile: null,
            words: ['', '', ''],
            searchResult: ''
        };
    }

    componentDidMount() {
        this.props.fetchLogFiles();
    }

    handleSelectLogFile(event, value) {
        this.setState({ selectedLogFile: value });
    }

    handleDownload() {
        if (this.state.selectedLogFile)
            this.props.fetchLogFileDownloadToken(this.state.selectedLogFile);
    }

    handleChangeWord(index, event) {
        this.setState({
            words: this.state.words.map((v, i) => i === index ? event.target.value : v)
        });
    }

    handleAddWord() {
        this.setState({words: [...this.state.words, '']});
    }

    handleSearch() {
        this.props.searchLogFile(this.state.selectedLogFile, this.state.words)
            .then(result => this.setState({searchResult: result}));
    }

    render() {
        const { logFiles, authorities, selectedServer, classes } = this.props;
        const { selectedLogFile, words, searchResult } = this.state;

        return (
            <Grid container>
                <h2>Log Files</h2>
                <Grid item xs={12}>
                    <Autocomplete
                        options={logFiles ? logFiles : []}
                        value={selectedLogFile}
                        onChange={this.handleSelectLogFile.bind(this)}
                        getOptionLabel={file => file}
                        renderInput={params => <TextField {...params} variant="standard" />}
                    />
                </Grid>

                <Grid item xs={12}>
                    {authorities.includes(`ROLE_${selectedServer.id}_FULL_LOG_CHECKER`) &&
                    <Button
                        color="primary" variant="contained"
                        onClick={this.handleDownload.bind(this)}
                        disabled={!selectedLogFile}
                    >
                        Download
                    </Button>
                    }
                </Grid>

                <Grid item xs={12}>
                    <h3>Search by Words</h3>
                </Grid>

                <Grid item xs={12}>
                    <List>
                        <ListItem>
                            <ListItemIcon>
                                <FiberManualRecordIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText primary="Each word should contain a minimum of 3 characters" />
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <FiberManualRecordIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText primary="Words may contain : a-z, A-Z, 0-9, []-_ and space (Must match RegEx: [\w _\-\[\]]{3,})" />
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <FiberManualRecordIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText primary="Any reference to timestamps is ignored. Words are matched with the log text starting after '-'" />
                        </ListItem>
                    </List>
                </Grid>

                {words.map((word, index) =>
                    <Grid item xs={3}>
                        <TextField
                            placeholder="Word"
                            value={word} key={index.toString()}
                            onChange={this.handleChangeWord.bind(this, index)}
                        />
                    </Grid>
                )}

                <Grid item xs={12}>
                    <Button
                        color="default" variant="contained"
                        onClick={this.handleAddWord.bind(this)}
                    >
                        Add Field
                    </Button>
                </Grid>

                <Grid item xs={12}>
                    <Button
                        color="secondary" variant="contained" className={classes.wordField}
                        onClick={this.handleSearch.bind(this)}
                        disabled={!selectedLogFile}
                    >
                        Search
                    </Button>
                </Grid>

                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <TextareaAutosize value={searchResult} rowsMin={3} />
                    </FormControl>
                </Grid>
            </Grid>
        );
    }
}

const LogsPage = withTheme(withStyles(styles)(_LogsPage));
export default LogsPage;