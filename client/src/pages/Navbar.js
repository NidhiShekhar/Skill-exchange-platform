import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <header className="navbar">
      <h1 className="navbar-title">PESU Skill Exchange</h1>
      <nav className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/explore">Explore Projects</Link>
        <Link to="/skills">Skills</Link>
        <Link to="/login">Login</Link>
        <Link to="/about-us">About Us</Link>
        <Link to="/profilepage" className="profile-icon">
          👤
        </Link>
      </nav>
    </header>
  );
}

export default Navbar;
