import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ProfilePage.css";
import Navbar from "./Navbar";
import profileImage from "../assets/profilepage.png"; // Import the image
import { useLocation } from "react-router-dom";

const ProfilePage = () => {
  const location = useLocation();
  const user_id = location.state?.user_id;
  const username = location.state?.username;

  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState("");
  const [proficiencyLevel, setProficiencyLevel] = useState("beginner");

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/user-skills/${user_id}`);
        setSkills(response.data);
      } catch (error) {
        console.error("Error fetching skills:", error);
      }
    };

    fetchSkills();
  }, [user_id]);

  const handleAddSkill = async () => {
    try {
      await axios.post("http://localhost:5000/add-skill-to-user", {
        skill_name: newSkill,
        user_id: user_id,
        proficiency_level: proficiencyLevel,
      });
      setSkills([...skills, { skill_name: newSkill, proficiency_level: proficiencyLevel }]);
      setNewSkill("");
      setProficiencyLevel("beginner");
    } catch (error) {
      console.error("Error adding skill:", error);
    }
  };

  return (
      <>
        <Navbar user_id={user_id} username={username} />
        <div className="container">
          <div className="profile-section">
            <img
                src={profileImage} // Use the imported image here
                alt="Profile"
                className="profile-pic"
            />
            <div className="profile-info">
              <h2>{username}</h2>
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
              {skills.map((skill, index) => (
                  <span key={index} className="skill">
                {skill.skill_name} ({skill.proficiency_level})
              </span>
              ))}
              <input
                  type="text"
                  placeholder="New Skill"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
              />
              <select
                  value={proficiencyLevel}
                  onChange={(e) => setProficiencyLevel(e.target.value)}
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
                <option value="expert">Expert</option>
              </select>
              <button className="add-skill-btn" onClick={handleAddSkill}>
                Add Skill
              </button>
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