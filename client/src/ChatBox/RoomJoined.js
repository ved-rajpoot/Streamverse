import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import { CreateMessage, JoinMessage, PinnedMessage, RegularMessage, RoomIdMessage } from "./MessageType"


const RommJoined = (props) => {
    return (
        <>
                <div className='flex flex-col bg-[#FAFAFA] h-[86%] overflow-auto'>
                <CreateMessage 
                    creator={props.userName}
                    roomName = {props.roomName}
                />
                <RoomIdMessage 
                    roomID={props.roomID}
                />
                

                </div>
                <div className='flex flex-row p-1 sticky bottom-0 h-[14%] bg-white'>
                    <div className='w-[80%]'>
                        <TextField id="outlined-basic" label="Type Your Message" variant="outlined" />
                    </div>
                    <button className='my-1 mx-1 shadow-sm bg-purple-500 w-11 h-11 rounded-lg flex justify-center items-center'>
                        <SendIcon />
                    </button>
                </div>
        </>
    )
}

export default RommJoined