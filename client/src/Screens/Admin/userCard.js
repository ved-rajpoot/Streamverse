import axios from "axios"
import {useContext, useState} from "react"
import { SocketContext } from "../../Context/SocketContext";

const UserCard = (props) => {
    const [isSuspended,setIsSuspended] = useState(0);
    const socket = useContext(SocketContext)
    const suspendUser = () => {
        socket.emit('userSuspended',{id:props.id})
        axios.post("http://localhost:9002/admin/suspendUser",{id:props.id, email:props.email})
            .then((res) => {
                console.log(res.data)
                setIsSuspended(1);
            })
            .catch((err) => console.log(err))
    }
    return (
        <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
            <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {props.id}
            </th>
            <td class="py-4 px-6">
                {props.name}
            </td>
            <td class="py-4 px-6">
                {props.email}
            </td>
            <td class="py-4 px-6">
                {
                    isSuspended?
                    <div>SUSPENDED</div>
                    :<button onClick={suspendUser} class="m-1 font-medium text-blue-600 dark:text-blue-500 hover:underline">SUSPEND ACCOUNT</button>
                }
            </td>
        </tr>
    )
}

export default UserCard