import { useState } from "react"

const SignUp = () => {
    const [user, setUser] = useState({
        user: "",
        password: "",
        confirmPassword:""
    })


    return (
        <>
            <div>
                <h1>Sign up Page</h1>
            </div>
        </>
    )
}

export default SignUp