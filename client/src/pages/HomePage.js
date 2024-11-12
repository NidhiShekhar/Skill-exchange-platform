import React from "react";
import "./HomePage.css";
import Navbar from "./Navbar";

// Importing images
import icon1 from "../assets/icon1.png";
import icon2 from "../assets/icon2.png";
import icon3 from "../assets/icon3.png";
import homepageImage from "../assets/homepage.png";
import { useLocation, useNavigate } from "react-router-dom";// Import the homepage image

function HomePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const user_id = location.state?.user_id;
  const username = location.state?.username;
  console.log(user_id, username);
  return (
    <div>
      <Navbar user_id={user_id} username={username}/>

      <div className="home-container">
        <div className="home-image">
          <img src={homepageImage} alt="Homepage" />
        </div>
        <div className="home-content">
          <h1>Collaborate, Learn & Grow</h1>
          <p>
            Find projects, enhance your skills, and gain real-world experience.
          </p>
          <div className="home-buttons">
            <button className="join-now">Join Now</button>
            <button className="learn-more">Learn More</button>
          </div>
        </div>
      </div>

      <section className="features">
        <div className="feature">
          <img src={icon1} alt="Collaborate Icon" />
          <h3>Collaborate with Talented Peers</h3>
          <p>
            Join a community of learners and engineers to enhance your skills
            through knowledge sharing.
          </p>
        </div>
        <div className="feature">
          <img src={icon2} alt="Projects Icon" />
          <h3>Real-World Projects</h3>
          <p>
            Engage in hands-on projects that are industry-relevant and
            challenging.
          </p>
        </div>
        <div className="feature">
          <img src={icon3} alt="Skill Icon" />
          <h3>Skill Development and Certification</h3>
          <p>
            Earn certifications and boost your portfolio with valuable skills.
          </p>
        </div>
      </section>

      <section className="how-it-works">
        <h2>How it works</h2>
        <div className="steps">
          <div className="step">
            <h3>Sign Up</h3>
            <p>Start your journey</p>
          </div>
          <div className="step">
            <h3>Browse Projects</h3>
            <p>Find relevant projects</p>
          </div>
          <div className="step">
            <h3>Collaborate & Learn</h3>
            <p>Gain hands-on experience</p>
          </div>
        </div>
        <button className="start-journey-btn">Start Your Journey</button>
      </section>

      <footer>
        <p>© 2024 PESU Skill Exchange. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default HomePage;
