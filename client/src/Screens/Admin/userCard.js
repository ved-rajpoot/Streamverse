const userCard = (props) => {
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
                <a href="#" class="m-1 font-medium text-blue-600 dark:text-blue-500 hover:underline">DELETE</a>
            </td>
        </tr>
    )
}

export default userCard