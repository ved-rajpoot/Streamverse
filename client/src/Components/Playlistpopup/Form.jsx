import  React, { useState, useEffect, useRef } from 'react';
import TodoCreator from "./FormInput";
import TodoList from "./List";

import './form.css';
import axios from 'axios';

import { createTheme } from '@material-ui/core/styles';
const theme = createTheme({
    palette: {
        primary: { main: '#000000' },
    },
});

const Form = ({playlists, setPlaylists, videoId, type, setPopup}) => {
    
    // To store name of new playlist
    const [ newPlaylist, setNewPlaylist ] = useState('');

    // To check if current video is in playlist or not
    // const [checked, setChecked] = React.useState([]);

    const inputRef = useRef();
    const noteRef = useRef({});
    const [ isInputEmpty, setInputEmpty ] = useState(false)
    
    
    const updatePlaylists = async ()=>{
        console.log('playlists from updatePlaylists: ', playlists);    
        const res = await axios.post("http://localhost:9002/updateplaylists", { updatedPlaylists: playlists, type: type }, {
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userTokenTime')).token
            }
        })    
    }

    useEffect(()=>{
        console.log('playlists: ',playlists);
        if(playlists!=null)
            updatePlaylists();
    },[playlists])

    useEffect(()=>{
        console.log('playlists: ',playlists);
    },[])
    
    // useEffect(()=>{
    //     console.log('checked: ', checked);
    // },[checked])

    const handleToggle = (value, inx) => () => {
        // const newChecked = [...checked];

        // newChecked[inx] = !newChecked[inx];
        playlists[inx].isFilePresent = !playlists[inx].isFilePresent;
        // setChecked(newChecked);
        completeTodo(inx);  
    };
    
    
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
            // creating new playlist.

            let tempPlaylists
            if(type=="video")
                tempPlaylists = [...playlists, { name:text,videos:[] }]
            else 
                tempPlaylists = [...playlists, { name:text,audios:[] }]

            setNewPlaylist({})
            // console.log('tempPlaylists: ', tempPlaylists);

            setPlaylists(tempPlaylists);
        } else {
            console.log('name', text)
            setInputEmpty(true);
        }
    };
    
    // delete a playlist
    const removeTodo = inx => {
        const newArr = [...playlists]
        newArr.splice(inx, 1)
        setPlaylists(newArr);
    }
    
    // add current video to playlist.
    const completeTodo = inx => {
        const tempPlaylists = [...playlists];
        tempPlaylists[inx].isCompleted = !tempPlaylists[inx].isCompleted;

        // playlists[inx].videos me agr videoId nhi preseent hai to daal do, agr present hai to nikaal do.
        if(type=="video") {
            let videoInx = tempPlaylists[inx].videos.indexOf(videoId);
            videoInx === -1 ? tempPlaylists[inx].videos.push(videoId) : tempPlaylists[inx].videos.splice(videoInx,1);
        }
        else {
            let audioInx = tempPlaylists[inx].audios.indexOf(videoId);
            audioInx === -1 ? tempPlaylists[inx].audios.push(videoId) : tempPlaylists[inx].audios.splice(audioInx,1);
        }    
        
        setPlaylists(tempPlaylists);
        console.log('completeTodo ')
    };
    
    // rename playlist
    const editTodo = inx => {
        const tempPlaylists = [...playlists];
        tempPlaylists[inx].isEditing = !tempPlaylists[inx].isEditing;
        setPlaylists(tempPlaylists);
    }
    
    // save new name of playlist after editing.
    const saveTodo = (inx) => {
        const tempPlaylists = [...playlists];
        tempPlaylists[inx].isEditing = !tempPlaylists[inx].isEditing;
        tempPlaylists[inx].name = noteRef.current[inx].value;
        setPlaylists(tempPlaylists);
    }

    const clearInput = () => {
        setNewPlaylist('');
    }

    // setNewPlaylist whose name is entered in input box
    const setTodo = text => {
        setInputEmpty(false);
        setNewPlaylist(text);
    }

    useEffect(() => {
        console.log(newPlaylist);
    }, [newPlaylist])

    return (
        <div>
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Add to
                  </h3>
                  <button
                    className="ml-auto border-0 text-black float-right text-3xl"
                    onClick={() => setPopup(false)}
                  ><sup>x</sup>
                  </button>
            </div>
            <form onSubmit={handleSubmit} className="w-96 p-4">
                <TodoList
                    theme={theme}
                    playlists={playlists}
                    completeTodo={completeTodo}
                    editTodo={editTodo}
                    deleteTodo={removeTodo}
                    saveTodo={saveTodo}
                    noteRef={noteRef}
                    preventSubmit={preventSubmit}
                    videoId={videoId}
                    handleToggle={handleToggle}
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
