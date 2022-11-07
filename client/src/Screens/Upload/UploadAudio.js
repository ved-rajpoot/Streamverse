import axios from "axios"
import React from "react";
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { Progress } from 'reactstrap';
import { Switch } from "@mui/material";

const UploadAudio = () => {

    const [redirectStatus, setRedirectStatus] = useState(false)
    useEffect(() => {
        if (localStorage.getItem('userTokenTime')) {
            // Check if user holds token which is valid in accordance to time
            const data = JSON.parse(localStorage.getItem('userTokenTime'));
            if (new Date().getTime() - data.time > (1 * 60 * 60 * 1000)) {
                // It's been more than hour since you have visited dashboard
                localStorage.removeItem('userTokenTime');
                setRedirectStatus(true);
            }
        } else {
            setRedirectStatus(true);
        }
    }, [])


    const [selectedFile, setSelectedFile] = useState({
        file: null,
        loaded: 0
    });
    const [isFilePicked, setIsFilePicked] = useState(false);
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
    }
    const upload = async (e) => {

        const data = new FormData();
        data.append("avatar", selectedFile.file);
        data.append("title", title);
        data.append("description", description);
        data.append("isPrivate", isPrivate);

        console.log(data);
        axios.post("http://localhost:9002/uploadaudio", data, {
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

    if (redirectStatus) return <Navigate to="/signIn" />
    return (
        <>
            <div className="flex flex-col dark:text-white ">
                <div className="text-xl m-3">
                    Enter title: <br />
                    <input autoComplete={false} type="text" className="input bg-[#f9fafb] dark:bg-[#374151] h-7 rounded-lg" placeholder="Title" onChange={changeHandler} name="title" value={title} />
                </div>

                <div className="m-3">
                    <p className="text-xl">Upload Audio file: </p>
                    <input type="file" className="text-sm" name="avatar" onChange={changeHandler} />
                </div>

                <div className="text-xl m-3">
                    Add Description: <br />
                    <input autoComplete={false} type="text" className="input bg-[#f9fafb] dark:bg-[#374151] h-7 rounded-lg" placeholder="Description" onChange={changeHandler} name="description" value={description} />
                </div>
                {isFilePicked ? (
                    <div>
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
                <Progress max="100" color="success" value={selectedFile.loaded} className="m-3 mb-1">
                    {isNaN(Math.round(selectedFile.loaded, 2)) ? 0 : Math.round(selectedFile.loaded, 2)}%
                </Progress>
                <div className="text-xl m-3">
                    <Switch checked={isPrivate} onChange={()=>{setIsprivate(!isPrivate)}}/> <span>Private</span>
                </div>
                
                <button className="bg-[#1d4ed8] rounded-xl text-white hover:scale-105 duration-300 w-[90px] py-1 m-3 text-sm" onClick={upload} >upload</button>
            </div>
        </>
    )
}

export default UploadAudio
