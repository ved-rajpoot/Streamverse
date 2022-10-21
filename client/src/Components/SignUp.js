import { useState } from "react"
import axios from "axios"


const SignUp = () => {
    const [user, setUser] = useState ({
        email: '',
        password: '',
        confirmPassword: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name] : value
        })
    }

    const register = () => {
         axios.post("http://localhost:9002/signup", user)
            .then((res) => {
                console.log(res)
            })
            .catch(err=>console.log(err))
    }

    return (
        <>
            <div>
                <section className="bg-gray-50 min-h-screen flex items-center justify-center">

                    <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-2 md:p-4 items-center">

                        <div className="px-8 md:px-16">
                            <h2 className="font-bold text-2xl text-[#002D74]">Register</h2>

                            <form onSubmit={(e) => e.preventDefault()} action="" className="flex flex-shrink flex-col gap-2">
                                <input className="p-2 mt-4 rounded-xl border" type="text" name="name" value={user.name} onChange={handleChange} placeholder="Name" />
                                <input className="p-2 mt-4 rounded-xl border" type="email" name="email" value={user.email} onChange={handleChange} placeholder="Email" />
                                <input className="p-2 mt-4 rounded-xl border" type="password" name="password" value={user.password} onChange={handleChange} placeholder="Password" />
                                <input className="p-2 mt-4 rounded-xl border" type="password" name="confirmPassword" value={user.confirmPassword} onChange={handleChange} placeholder="Confirm Password" />
                                <button className="bg-[#002D74] rounded-xl text-white py-2 top-2 hover:scale-105 duration-300" onClick={register}>Register</button>
                            </form>
                        </div>
                    </div>
                </section>
            </div>

        </>
    )
}

export default SignUp