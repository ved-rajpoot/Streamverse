import axios from "axios"
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Progress } from 'reactstrap';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

const HomePage = () => {
    
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
    },[])
    
    
    const [selectedFile, setSelectedFile] = useState({
        file: null,
        loaded: 0
    });
    const [isFilePicked, setIsFilePicked] = useState(false);
    
    const changeHandler = (event) => {
        setSelectedFile({ ...selectedFile, file: event.target.files[0] });
        setIsFilePicked(true);
    }
    const upload = async (e) => {

        const data = new FormData();
        data.append("avatar", selectedFile.file);

        axios.post("http://localhost:9002/upload", data, {
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
    // console.log(redirectStatus)
    if (redirectStatus === true) return <Navigate to="/Login" /> 
    return (
        <>
            <div className="flex flex-col grid h-screen place-items-center h-1/2">
                <input type="file" name="avatar" onChange={changeHandler} />
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
                    <p>Select a file to show details</p>
                )}
                <Progress max="100" color="success" value={selectedFile.loaded} className="mt-4 mb-1">
                    {isNaN(Math.round(selectedFile.loaded, 2)) ? 0 : Math.round(selectedFile.loaded, 2)}%
                </Progress>
                <button className="bg-[#002D74]  rounded-xl text-white py-2 hover:scale-105 duration-300 w-[10%]" onClick={upload} >upload</button>
            </div>
        </>
    )
}

export default HomePage