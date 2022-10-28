import  React from 'react';
import Button from "@material-ui/core/Button";
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import TextField from "@material-ui/core/TextField";
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';

const useStyles = makeStyles({
    root: {
        background: 'linear-gradient(45deg, gray 30%, black 90%)',
        border: 0,
        color: 'white',
        height: 30,
        padding: '0 10px',
        whiteSpace: 'nowrap',
        margin: '15px 0 0 20px',
    },
    label: {
        width: '80%'
    }
});

// bug: setToDo is not a function
const NewPlaylistCreator = ({ theme, newPlaylist, setTodo, clearInput, inputRef, isInputEmpty, preventSubmit }) => {
    
    const classes = useStyles();
    return (
        <div className="flex w-full border-gray-100 border-b-1 pt-5 h-16">
            <ThemeProvider theme={theme}>
                <FormControl   className={classes.label}>
                    <TextField
                        id="outlined-basic"
                        // label="What's need to be done?" // better accessibility with Material UI
                        value={newPlaylist}
                        variant="outlined"
                        onChange={(e) => setTodo(e.target.value)}
                        onFocus={clearInput}
                        ref={inputRef}
                        aria-describedby="component-error-text"
                        onKeyPress={preventSubmit}
                    />

                    { !isInputEmpty ?
                        <></>
                        :
                        <>
                            <FormHelperText id="component-error-text">Name can't be empty</FormHelperText>
                        </>
                    }
                </FormControl>
                <Button
                    type="submit"
                    alt="add-note"
                    className={classes.root}
                    onKeyPress={preventSubmit}
                >
                    Create
                </Button>
            </ThemeProvider>
        </div>
    )

}

export  default NewPlaylistCreator;