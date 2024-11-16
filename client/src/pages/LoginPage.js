import React, { useState } from "react";
import "./LoginPage.css";
import Navbar from "./Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/login", {
        username: formData.username,
        password: formData.password,
      });
      const { user_id } = response.data;
      navigate("/", { state: { user_id, username: formData.username } });
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setErrorMessage("Unauthorized: Incorrect username or password.");
      } else {
        console.error("Error during login:", error);
      }
    }
  };

  return (
      <>
        <Navbar />
        <div className="login-page">
          <div className="login-container">
            <h1 className="login-title">Welcome Back</h1>
            <p className="login-subtitle">Please sign in to continue</p>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <form className="login-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Enter your username"
                    required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    required
                />
              </div>
              <button type="submit" className="login-button">
                Sign In
              </button>
            </form>
            <p className="register-link">
              Don't have an account? <a href="/register">Sign up</a>
            </p>
          </div>
        </div>
      </>
  );
}

export default LoginPage;