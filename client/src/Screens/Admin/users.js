import axios from "axios"
import { useEffect, useState } from "react"
import UserCard from "./userCard"

const Users = () => {
    const [users,setUsers] = useState(null)

    useEffect(() => {
        axios.post("http://localhost:9002/admin/users")
            .then((res) => {
                // console.log(res.data)
                setUsers(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])
    return (
        <>
        <div class="m-5 w-screen overflow-x-auto relative shadow-md sm:rounded-lg">
                {/* <button class="float-right bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                ADD USER
                </button> */}
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-[#cbd5e1] dark:text-black-400">
                        <tr>
                            <th scope="col" class="py-3 px-6">
                                User ID
                            </th>
                            <th scope="col" class="py-3 px-6">
                                Name
                            </th>
                            <th scope="col" class="py-3 px-6">
                                Email
                            </th>
                            <th scope="col" class="py-3 px-6">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Array.isArray(users)?
                            users.map((val,index) => {
                                return (
                                    <>
                                    <UserCard id={val._id} name={val.name} email={val.email} />
                                    </>
                                )
                            })
                            : null
                        }
                    </tbody>
                </table>
            </div>
            </>
        )
}

export default Users