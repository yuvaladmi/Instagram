import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "../assets/style/pages/Login.css";
import { userService } from "../services/user.service.remote.js";
import { login } from "../store/actions/user.actions.js";

export function Login() {
  const [credentials, setCredentials] = useState(userService.getEmptyCredentials());
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  function handleChange(ev) {
    const { name, value } = ev.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(ev) {
    ev.preventDefault();

    const { username, password } = credentials;
    if (!username || !password) {
      setError("Please fill in all fields.");
      return;
    }

    handleLogin(credentials);
  }

  function handleGuestLogin() {
    const guestCredentials = {
      username: "guest",
      password: "guest123",
    };

    handleLogin(guestCredentials);
  }

  async function handleLogin(userCredentials) {
    setError("");
    setIsLoading(true);

    try {
      await login(userCredentials);
      setIsLoggedIn(true);
      navigate("/post");
    } catch (err) {
      setError("Invalid username or password.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1 className="logo">Instagram</h1>

        {isLoggedIn ? (
          <p className="success-msg">Welcome back, {credentials.username}!</p>
        ) : (
          <>
            <input
              type="text"
              name="username"
              placeholder="Phone number, username, or email"
              value={credentials.username}
              onChange={handleChange}
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={credentials.password}
              onChange={handleChange}
            />

            <button type="submit" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Log In"}
            </button>

            <button type="button" onClick={handleGuestLogin} disabled={isLoading}>
              {isLoading ? "Logging in..." : "Log In as Guest"}
            </button>

            {error && <p className="error-msg">{error}</p>}

            {/* <a href="#" className="forgot-link">Forgot password?</a> */}

            <p className="switch-msg">
            Don't have an account? <Link to="/login/signup">Sign up</Link>
            </p>
          </>
        )}
      </form>
    </div>
  );
}
