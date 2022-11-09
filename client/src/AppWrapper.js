import { useEffect } from "react";
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "./Context/UserContext";


const AppWrapper = (props) => {
    const [userState, setUserState] = useContext(UserContext);
    const UpdateUser = () => {
        const token = localStorage.getItem('userTokenTime');
        if (token) {
            axios.post("http://localhost:9002/updateuser", { id: null }, {
                headers: {
                    'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userTokenTime')).token
                }
            })
                .then((res) => {
                    const user = res.data;
                    setUserState({
                        userId: user._id,
                        email: user.email,
                        userName: user.name,
                        videoPlaylists: user.videoPlaylist,
                        audioPlaylists: user.audioPlaylist,
                        videoFavourites: user.videoFavourites,
                        audioFavourites: user.audioFavourites,
                        likedVideos: user.likedVideos,
                        likedAudios: user.likedAudios,
                        dislikedVideos: user.dislikedVideos,
                        dislikedAudios: user.dislikedAudios,
                        favouriteTags: user.favouriteTags
                    })
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }
    useEffect(() => {
        document.getElementById('updateuser').click();
    }, [])

    return (
        <>
            <div>
                {props.children}
                <button id="updateuser" className="hidden" onClick={() =>UpdateUser()} />
            </div>
        </>
    )
}

export default AppWrapper;