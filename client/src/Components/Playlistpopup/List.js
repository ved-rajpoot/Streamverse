import React from 'react';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import { Checkbox } from '@material-ui/core';

const useStyles = makeStyles(() => ({
    root: {
        width: '100%',
        backgroundColor: '#f5f5f5',
        padding: 0
    },
    li: {
        borderBottom: '1px dashed black'
    }
}));

const TodoList = ({ theme, playlists, completeTodo, editTodo, deleteTodo, saveTodo, noteRef, preventSubmit }) => {

    const classes = useStyles();
    const [checked, setChecked] = React.useState([0]);
    let UniqKey = 123;


    const handleToggle = (value, inx) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
        completeTodo(inx);
    };

    return (
        <ThemeProvider theme={theme}>
            <List className={classes.root}>
            { Array.isArray(playlists) && playlists.map((playlist, inx) => {
                const labelId = `list-play-${playlist}`;
                {/* console.log(todo.name,inx); */}
                return (
                    <ListItem
                        key={`playlist-${UniqKey++}`}
                        role={undefined}
                        dense
                        button
                        className={classes.li}
                    >
                        <ListItemIcon>
                            <Checkbox
                                color="primary"
                                edge="start"
                                checked={checked.indexOf(playlist) !== -1}
                                tabIndex={-1}
                                disableRipple
                                inputProps={{ 'aria-labelledby': labelId }}
                                onClick={handleToggle(playlist, inx)}
                                onKeyPress={preventSubmit}
                            />
                        </ListItemIcon>
                        {
                            (!playlist.isEditing) ?
                                <>
                                    <ListItemText
                                        id={labelId}
                                        primary={`${playlist.name}`}
                                        style={{textDecoration: playlist.isCompleted ? "" : ""}}
                                    />
                                    <ListItemIcon>
                                        <IconButton
                                            edge="end"
                                            aria-label="edit"
                                            onClick={() => editTodo(inx)}
                                        >
                                            <EditIcon/>
                                        </IconButton>
                                    </ListItemIcon>
                                </>
                                :
                                <>
                                    <label
                                        htmlFor="task" // better accessibility with HTML
                                        className="visuallyhidden"
                                    >
                                        {playlist.name}
                                    </label>
                                    <input
                                        className="form__edit-input"
                                        defaultValue={playlist.name}
                                        ref={(element) => noteRef.current[inx] = element}
                                        onKeyPress={preventSubmit}
                                        id="task"
                                    />
                                    <ListItemIcon>
                                        <IconButton onClick={() => saveTodo(inx)} edge="end" aria-label="delete">
                                            <BookmarkIcon />
                                        </IconButton>
                                    </ListItemIcon>
                                </>
                        }
                        <ListItemSecondaryAction>
                            <IconButton onClick={() => deleteTodo(inx)} edge="end" aria-label="delete">
                                <DeleteIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                );
            })}
        </List>
        </ThemeProvider>
    );
}

export default TodoList;