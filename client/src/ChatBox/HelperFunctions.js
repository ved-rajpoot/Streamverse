import jwtDecode from "jwt-decode";

const getUserId = () => {
    const token = localStorage.getItem('userTokenTime');
    if (token) {
        const user = jwtDecode(token);
        return user.userId;
    }
}

export {getUserId}