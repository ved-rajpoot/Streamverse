import { useNavigate } from "react-router-dom"


const JoinMessage = (props) => {
    return (
        <>
            <div className="flex w-[100%] py-1 justify-center items-center">
                <div className="flex w-fit px-2 justify-center items-center text-xs font-sans rounded-lg bg-[#67e8f9]">
                    <p>{props.userName} joined the chat</p>
                </div>
            </div>
        </>
    )
}
const LeaveMessage = (props) => {
    return (
        <>
            <div className="flex w-[100%] py-1 justify-center items-center">
                <div className="flex w-fit px-2 justify-center items-center text-xs font-sans rounded-lg bg-[#67e8f9]">
                    <p>{props.userName} left the chat</p>
                </div>
            </div>
        </>
    )
}
const KickMessage = (props) => {
    return (
        <>
            <div className="flex w-[100%] py-1 justify-center items-center">
                <div className="flex w-fit px-2 justify-center items-center text-xs font-sans rounded-lg bg-[#67e8f9]">
                    <p>{props.userName} was Kicked out of the chat</p>
                </div>
            </div>
        </>
    )
}
const PinnedMessage = () => {
    const navigate = useNavigate();
    return (
        <>
            <div className=" sticky flex flex-row top-0 bg-white dark:bg-[#202c33] outline-none dark:text-white px-1 py-1 text-sm justify-center items-center ">
                <div className="w-[70%]">CreatorName is streaming videoName/AudioName</div>
                <button className="w-[20%] h-[80%] rounded-lg bg-[#2563eb]" onClick={() => { navigate("/viewer") }} >Join</button>
            </div>

        </>
    )
}
const RegularSenderMessage = (props) => {
    return (
        <>
            <div className="flex w-[98%] py-1 justify-end">
                <div className="flex justify-center flex-col min-h-[40px] max-w-[65%] px-2 text-xs font-sans dark:text-white rounded-lg bg-[#d9fdd3] dark:bg-[#005c4b] break-words">
                    <p className="p-1 font-sans">{props.message}</p>
                </div>
            </div>
        </>
    )
}
const RegularRecieverMessage = (props) => {
    return (
        <>
            <div className="flex w-[98%] px-1 py-1 justify-start">
                <div className="flex flex-col justify-center min-h-[40px] max-w-[65%] px-2 text-xs font-sans  dark:text-white rounded-lg bg-[#ffffff] dark:bg-[#202c33] break-words">
                    <p className="text-xs font-bold flex justify-start dark:text-[#08a058] font-mono">{props.userName}</p>
                    <p className="p-1 font-sans text-left flex justify-start">{props.message}</p>
                </div>
            </div>
        </>
    )
}

const CreateMessage = (props) => {
    return (
        <>
            <div className="flex w-[100%] py-1 justify-center items-center">
                <div className="flex w-fit px-2 justify-center items-center text-xs font-sans rounded-lg bg-[#67e8f9]">
                    <p>{props.creator} created "{props.roomName}" </p>
                </div>
            </div>
        </>
    )
}

const RoomIdMessage = (props) => {
    return (
        <>
            <div className="flex w-[100%] py-1 justify-center items-center">
                <div className="flex w-fit px-2 justify-center items-center text-xs font-sans rounded-lg bg-[#67e8f9]">
                    <p>RoomID : {props.roomID}  </p>
                </div>
            </div>
        </>
    )
}
export { JoinMessage, PinnedMessage, RegularSenderMessage,RegularRecieverMessage, CreateMessage, RoomIdMessage, LeaveMessage , KickMessage}