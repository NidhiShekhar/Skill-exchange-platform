import React from "react";
import "./ProfilePage.css";
import Navbar from "./Navbar";
import profileImage from "../assets/profilepage.png"; // Import the image

const ProfilePage = () => {
  return (
    <>
      <Navbar />
      <div className="container">
        <div className="profile-section">
          <img
            src={profileImage} // Use the imported image here
            alt="Profile"
            className="profile-pic"
          />
          <div className="profile-info">
            <h2>Nidhi</h2>
            <p>
              Software Engineer passionate about building impactful applications
              and exploring new technologies.
            </p>
            <button className="edit-profile-btn">Edit Profile</button>
          </div>
        </div>

        <div className="skills-section">
          <h3>Skills & Expertise</h3>
          <div className="skills">
            <span className="skill">Python</span>
            <span className="skill">Project Management</span>
            <span className="skill">Design</span>
            <span className="skill">Machine Learning</span>
            <button className="add-skill-btn">Add Skill</button>
          </div>
        </div>

        <div className="projects-section">
          <h3>My Projects</h3>
          <div className="project">
            <h4>E-commerce Platform Development</h4>
            <p>
              Developed a scalable e-commerce platform with a team of 5,
              focusing on backend services and database management.
            </p>
            <p>
              <strong>Role:</strong> Backend Developer |{" "}
              <strong>Status:</strong> In progress
            </p>
            <button className="view-project-btn">View Project</button>
          </div>
          <div className="project">
            <h4>Community Health App</h4>
            <p>
              Designed a mobile application to track community health metrics
              and provide real-time updates.
            </p>
            <p>
              <strong>Role:</strong> UX Designer | <strong>Status:</strong>{" "}
              Completed
            </p>
            <button className="view-project-btn">View Project</button>
          </div>
        </div>

        <div className="contributions-section">
          <h3>Contributions & Requests</h3>
          <p>
            Contributed to AI research project on predictive analytics -{" "}
            <strong>Status:</strong> Accepted
          </p>
          <p>
            Requested to join VR development team - <strong>Status:</strong>{" "}
            Pending
          </p>
        </div>

        <div className="portfolio-section">
          <h3>Portfolio & Achievements</h3>
          <div className="portfolio-items">
            <a href="/path/to/Portfolio.pdf" className="portfolio-item">
              📄 Portfolio.pdf
            </a>
            <a href="https://mywebsite.com" className="portfolio-item">
              🔗 MyWebsite.com
            </a>
            <a href="/path/to/Designs.png" className="portfolio-item">
              🖼️ Designs.png
            </a>
          </div>
        </div>

        <button className="settings-btn">Settings</button>
      </div>
    </>
  );
};

export default ProfilePage;
