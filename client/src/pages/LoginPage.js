import React from "react";
import "./LoginPage.css";
import Navbar from "./Navbar";

function LoginPage() {
  return (
    <>
      <Navbar />
      <div className="login-page">
        <div className="login-container">
          <h1 className="login-title">Welcome Back</h1>
          <p className="login-subtitle">Please sign in to continue</p>
          <form className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
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
