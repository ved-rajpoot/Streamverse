import { useEffect } from "react";
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "./Context/UserContext";
import { RoomContext } from "./Context/RoomContext";


const AppWrapper = (props) => {
    const [userState, setUserState] = useContext(UserContext);
    const [roomState, setRoomState] = useContext(RoomContext);
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
                        videoPlaylists: user.videoPlaylists,
                        audioPlaylists: user.audioPlaylists,
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
    const UpdateRoom = () => {
        const token = JSON.parse(localStorage.getItem('room'));

        if (token) {
            axios.post("http://localhost:9002/updateroom", { id: token }, {
                headers: {
                    'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userTokenTime')).token
                }
            })
                .then(async (res) => {
                    const room = res.data.room;
                    const id = res.data.id.toString();
                    console.log(room.userArray[0].userId +" " + typeof (room.userArray[0].userId))
                    console.log(id + " " + typeof (id))
                    
                    const index = room.userArray.findIndex((user)=> user.userId == id );
                    try {
                        console.log(index + " " + id);
                        setRoomState({
                            roomId: room._id,
                            roomName: room.roomName,
                            userName: room.userArray[index].userName,
                            AdminID: room.AdminID,
                            role: room.userArray[index].role,
                            userArray: room.userArray
                        })
                    } catch (error) {
                        console.log(error)
                    }
                    
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }
    useEffect(() => {
        document.getElementById('updateuser').click();
        document.getElementById('updateroom').click();

    }, [])
    useEffect(() => console.log(roomState), [roomState])

    return (
        <>
            <div>
                {props.children}
                <button id="updateuser" className="hidden" onClick={() => UpdateUser()} />
                <button id="updateroom" className="hidden" onClick={() => UpdateRoom()} />
            </div>
        </>
    )
}

export default AppWrapper;