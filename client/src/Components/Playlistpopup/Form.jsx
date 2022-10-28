import  React, { useState, useEffect, useRef } from 'react';
import TodoCreator from "./FormInput";
import TodoList from "./List";

import './form.css';

import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
    palette: {
        primary: { main: '#000000' },
    },
});

const Form = ({playlists, setPlaylists, videoId}) => {

    const [ newPlaylist, setNewPlaylist ] = useState({});
    // const [ playlists, setPlaylists ] = useState([
    //     {
    //         text: "Learn about React",
    //         isCompleted: false,
    //         isEditing: false
    //     },
    //     {
    //         text: "Meet friend for lunch",
    //         isCompleted: false,
    //         isEditing: false
    //     },
    //     {
    //         text: "Build really cool todo app",
    //         isCompleted: false,
    //         isEditing: false
    //     }
    // ]);
    const inputRef = useRef();
    const noteRef = useRef({});
    const [ isInputEmpty, setInputEmpty ] = useState(false)


    // create button click in creating new playlist.
    const handleSubmit = e => {
        e.preventDefault();
        addTodo(newPlaylist);
        clearInput();
        inputRef.current.focus();
    };

    const preventSubmit = e => {
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    };

    // adding new playlist to playlists array.
    const addTodo = text => {
        if ( text !== '') {
            const newPlaylist = [...playlists, { name:text,videos:[] }]
            setNewPlaylist({})
            setPlaylists(newPlaylist);
        } else {
            console.log('name', text)
            setInputEmpty(true);
        }
    };

    // delete a playlist
    const removeTodo = inx => {
        const newArr = [...playlists]
        newArr.splice(inx, 1)
        setPlaylists(newArr)
    }

    // add current video to playlist.
    const completeTodo = inx => {
        const newPlaylist = [...playlists];
        newPlaylist[inx].isCompleted = !newPlaylist[inx].isCompleted;
        setPlaylists(newPlaylist);
    };

    // rename playlist
    const editTodo = inx => {
        const newPlaylist = [...playlists];
        newPlaylist[inx].isEditing = !newPlaylist[inx].isEditing;
        setPlaylists(newPlaylist);
    }

    // save new name of playlist.
    const saveTodo = (inx) => {
        const newPlaylist = [...playlists];
        newPlaylist[inx].isEditing = !newPlaylist[inx].isEditing;
        newPlaylist[inx].name = noteRef.current[inx].value;
        setPlaylists(newPlaylist);
    }

    const clearInput = () => {
        setNewPlaylist('');
    }


    const setTodo = newPlaylist => {
        setInputEmpty(false);
        setNewPlaylist(newPlaylist);
    }

    useEffect(() => {
        console.log(newPlaylist);
    }, [newPlaylist])

    return (
        <div>
            <h1 className='mb-4'>Add to</h1>
            <form onSubmit={handleSubmit} className="form">


                <TodoList
                    theme={theme}
                    playlists={playlists}
                    completeTodo={completeTodo}
                    editTodo={editTodo}
                    deleteTodo={removeTodo}
                    saveTodo={saveTodo}
                    noteRef={noteRef}
                    preventSubmit={preventSubmit}
                />
                <TodoCreator
                    theme={theme}
                    newPlaylist={newPlaylist}
                    setTodo={setTodo}
                    clearInput={clearInput}
                    inputRef={inputRef}
                    isInputEmpty={isInputEmpty}
                    preventSubmit={preventSubmit}
                />
            </form>
        </div>
    )
}

export default Form;