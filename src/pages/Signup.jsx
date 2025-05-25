import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../assets/style/pages/Login.css";
import { userService } from "../services/user.service.remote.js";
import { signup } from "../store/actions/user.actions.js";

export function Signup() {
    const [signupInfo, setSignupInfo] = useState(userService.getEmptyCredentials());
    const [error, setError] = useState("");
    const [isSignedUp, setIsSignedUp] = useState(false);
    const navigate = useNavigate();

    function handleChange(ev) {
        const { name, value } = ev.target;
        setSignupInfo((prev) => ({ ...prev, [name]: value }));
    }

    function handleSubmit(ev) {
        ev.preventDefault();
        setError("");

        const { email, fullname, username, password } = signupInfo;
        if (!email || !fullname || !username || !password) {
            setError("Please fill in all fields.");
            return;
        }
        signup(signupInfo).then(()=>{
            setIsSignedUp(true);
            navigate('/post')
        })
        // סימולציית הרשמה
        setTimeout(() => {
        }, 1000);
    }

    return (
            <div className="login-container">
                <form className="login-form" onSubmit={handleSubmit}>
                <h1 className="logo">Instagram</h1>

                {isSignedUp ? (
                    <p className="success-msg">Welcome, {signupInfo.fullname}! 🎉</p>
                ) : (
                    <>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email address"
                        value={signupInfo.email}
                        onChange={handleChange}
                    />

                    <input
                        type="text"
                        name="fullname"
                        placeholder="Full Name"
                        value={signupInfo.fullname}
                        onChange={handleChange}
                    />

                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={signupInfo.username}
                        onChange={handleChange}
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={signupInfo.password}
                        onChange={handleChange}
                    />

                    <button type="submit">Sign Up</button>

                    {error && <p className="error-msg">{error}</p>}
                    </>
                )}
                </form>
            </div>
        );
    }
