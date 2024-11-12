import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar({user_id, username}) {
  return (
    <header className="navbar">
      <h1 className="navbar-title">PESU Skill Exchange</h1>
      <nav className="navbar-links">
        <Link to="/" state={{ "user_id":user_id, "username":username }}>Home</Link>
        <Link to="/explore" state={{ "user_id":user_id, "username":username }}>Explore Projects</Link>
        <Link to="/skills" state={{ "user_id":user_id, "username":username }}>Skills</Link>
        <Link to="/login">Login</Link>
        <Link to="/about-us" state={{ "user_id":user_id, "username":username }}>About Us</Link>
        <Link to="/profilepage " state={{ "user_id":user_id, "username":username }} className="profile-icon">
          👤
        </Link>
      </nav>
    </header>
  );
}

export default Navbar;
