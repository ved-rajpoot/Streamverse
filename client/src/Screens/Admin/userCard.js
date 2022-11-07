import axios from "axios"

const userCard = (props) => {
    const deleteUser = () => {
        axios.post("http://localhost:9002/admin/deleteUser",{id:props.id, email:props.email})
            .then((res) => console.log(res.data))
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
                <button onClick={deleteUser} class="m-1 font-medium text-blue-600 dark:text-blue-500 hover:underline">DELETE</button>
            </td>
        </tr>
    )
}

export default userCard