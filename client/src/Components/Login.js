import { useState } from "react"

const Login = () => {
    const [user, setUser] = useState({
        email: "test@gmail.com",
        password: "test"
    })
    

    return (
        <>
            <div className="text-center">
                <h1>login Page</h1>
                <h1>email : {user.email}</h1>
                <h1>password : {user.password}</h1>
            </div>
        </>
    )
}

export default Login