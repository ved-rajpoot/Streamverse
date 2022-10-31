

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
const PinnedMessage = () => {
    return (
        <>
            <div className=" sticky flex flex-row top-0 bg-white px-1 py-1 text-sm justify-center items-center border b-4">
                <div className="w-[70%]">CreatorName is streaming videoName/AudioName</div>
                <button className="w-[20%] h-[80%] rounded-lg bg-[#2563eb]">Join</button>
            </div>

        </>
    )
}
const RegularMessage = (props) => {
    return (
        <>
            <div className="flex w-[100%] py-1 justify-center items-center">
                <div className="flex flex-col w-[95%] px-2 text-xs font-sans rounded-lg bg-[#bbf7d0] break-words">
                    <p className="text-xs font-bold left-2 font-mono">{props.userName}</p>
                    <p >{props.message}</p>
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
export { JoinMessage, PinnedMessage, RegularMessage, CreateMessage, RoomIdMessage }