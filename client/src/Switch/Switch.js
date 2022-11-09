import React, { useEffect, useState } from 'react';
import './Switch.css';

const Switch = () => {
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
    const switchTheme = (e) => {
        if (e.target.checked) {
            setTheme("dark");
            localStorage.setItem("theme", "dark");
            document.getElementById("app").classList.add("dark");
        } else {
            setTheme("light");
            localStorage.setItem("theme", "light");
            document.getElementById("app").classList.remove("dark");
        }
    }
    useEffect(() => {
        if (theme === "dark") {
            document.getElementById("react-switch-new").checked = true;
            localStorage.setItem("theme", "dark");
            document.getElementById("app").classList.add("dark");
        } else {
            document.getElementById("react-switch-new").checked = false;
            localStorage.setItem("theme", "light");
            document.getElementById("app").classList.remove("dark");
        }
    })
    useEffect(() => {
        console.log("theme changed")
    },[theme])
    return (
        <>
            <input
                className="react-switch-checkbox"
                id={`react-switch-new`}
                type="checkbox"
                onChange={switchTheme}
            />
            <label
                className="react-switch-label"
                htmlFor={`react-switch-new`}
            >
                <span className={`react-switch-button`} />
            </label>
        </>
    );
};

export default Switch;