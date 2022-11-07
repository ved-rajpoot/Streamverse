import axios from "axios"
import React from "react";
import { useState } from "react";
import { Progress } from 'reactstrap';
import { Switch } from "@mui/material";

const UploadVideo = () => {

    const [selectedFile, setSelectedFile] = useState({
        file: null,
        loaded: 0
    });
    const [seletcedThumbnail, setSelectedThumbnail] = useState({ file: null });
    const [isFilePicked, setIsFilePicked] = useState(false);
    const [isThumbnailPicked, setIsThumbnailPicked] = useState(false);
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [isPrivate,setIsprivate] = useState(false);

    const changeHandler = (event) => {
        if (event.target.name === 'title') {
            return setTitle(event.target.value);
        }
        if (event.target.name === 'description') {
            return setDescription(event.target.value);
        }
        if (event.target.name === 'avatar') {
            setSelectedFile({ ...selectedFile, file: event.target.files[0] });
            setIsFilePicked(true);
            return;
        }
        if (event.target.name === 'thumbnail') {
            setSelectedThumbnail({ ...seletcedThumbnail, file: event.target.files[0] });
            setIsThumbnailPicked(true);
            return;
        }
    }
    const upload = async (e) => {
        let tags=[]
        for(var i=0;i<todos.length;i++) tags.push(todos[i].text)

        const data = new FormData();
        data.append("avatar", selectedFile.file);
        data.append("thumbnail", seletcedThumbnail.file);
        data.append("title", title);
        data.append("description", description);
        data.append("tags",tags);
        data.append("isPrivate", isPrivate);

        console.log(data);
        axios.post("http://localhost:9002/uploadvideo", data, {
            headers: {
                "Content-Type": "multipart/form-data",
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userTokenTime')).token
            },
            onUploadProgress: ProgressEvent => {
                setSelectedFile({
                    ...selectedFile,
                    loaded: (ProgressEvent.loaded / ProgressEvent.total * 100)
                });
            }
        })
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })

    }

    function Todo({ todo, index, removeTodo }) {
        return (
            <div className=" bg-[#b8d7f7] px-1 py-1 text-black m-1 rounded-xl gap-1 flex flex-row">
                <div className="flex items-center justify-center text-xs">#{todo.text}</div>
                <div>
                    <button onClick={() => removeTodo(index)} className="flex items-center justify-center text-xs">x</button>
                </div>
            </div>
        );
    }

    function TodoForm({ addTodo }) {
        const [value, setValue] = React.useState("");

        const handleSubmit = e => {
            e.preventDefault();
            if (!value) return;
            addTodo(value);
            setValue("");
        };

        return (
            <form onSubmit={handleSubmit}>
                <input
                    autoComplete={false}
                    type="text"
                    className="input bg-[#f9fafb] dark:bg-[#374151] h-7 rounded-lg"
                    value={value}
                    placeholder="Add tag"
                    onChange={e => setValue(e.target.value)}
                />
                <button className="bg-[#1d4ed8]  rounded-xl text-white hover:scale-105 duration-300 w-[90px] py-1 m-2 text-sm">Enter</button>
            </form>
        );
    }

    const [todos, setTodos] = React.useState([
    ]);

    const addTodo = text => {
        if(text === "")return
        const newTodos = [...todos, { text }];
        setTodos(newTodos);
    };

    const removeTodo = index => {
        const newTodos = [...todos];
        newTodos.splice(index, 1);
        setTodos(newTodos);
    };

    return (
        <>
            <div className="flex flex-col dark:text-white ">
                <div className="text-xl m-3">
                    Enter title: <br />
                    <input autoComplete={false} type="text" className="input bg-[#f9fafb] dark:bg-[#374151] h-7 rounded-lg" placeholder="Title" onChange={changeHandler} name="title" value={title} />
                </div>

                <div className="m-3">
                    <p className="text-xl"> Upload thumbnail: </p>
                    <input type="file" className="text-sm" name="thumbnail" onChange={changeHandler} />
                </div>

                <div className="m-3">
                    <p className="text-xl">Upload Video file: </p>
                    <input type="file" className="text-sm" name="avatar" onChange={changeHandler} />
                </div>

                <div className="text-xl m-3">
                    Add Description: <br />
                    <input autoComplete={false} type="text" className="input bg-[#f9fafb] dark:bg-[#374151] h-7 rounded-lg" placeholder="Description" onChange={changeHandler} name="description" value={description} />
                </div>
                {isFilePicked ? (
                    <div className="m-3">
                        <p>Filename: {selectedFile.file.name}</p>
                        <p>Filetype: {selectedFile.file.type}</p>
                        <p>Size in bytes: {selectedFile.file.size}</p>
                        <p>
                            lastModifiedDate:{' '}
                            {selectedFile.file.lastModifiedDate.toLocaleDateString()}
                        </p>
                    </div>
                ) : (
                    <p className="ml-3">Select a file to show details</p>
                )}
                {console.log(selectedFile.loaded)}
                <Progress max="100" color="success" value={selectedFile.loaded} className="m-5 mb-1">
                    {isNaN(Math.round(selectedFile.loaded, 2)) ? 0 : Math.round(selectedFile.loaded, 2)}%
                </Progress>
                <div className="text-xl m-3 ">
                    <Switch checked={isPrivate} onChange={()=>{setIsprivate(!isPrivate)}}/> <span>Private</span>
                </div>
                <div className="text-xl m-3">
                    Add tags:
                    <div className="app ml-3 text-lg">
                        <div className="todo-list flex flex-col">
                            <div className="flex flex-wrap max-w-[40%]">
                                {todos.map((todo, index) => (
                                    <Todo
                                        key={index}
                                        index={index}
                                        todo={todo}
                                        removeTodo={removeTodo}
                                    />
                                ))}
                            </div>    
                            <TodoForm addTodo={addTodo} />
                        </div>
                    </div>
                </div>

                <button className="bg-[#1d4ed8] rounded-xl text-white hover:scale-105 duration-300 w-[90px] py-1 m-3 text-sm" onClick={upload} >upload</button>
            </div>
        </>
    )
}

export default UploadVideo
