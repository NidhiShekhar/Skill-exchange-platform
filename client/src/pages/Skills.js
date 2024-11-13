import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Skills.css";
import Navbar from "./Navbar";
import { useLocation, useNavigate } from "react-router-dom";

function Skills() {
  const location = useLocation();
  const navigate = useNavigate();
  const user_id = location.state?.user_id;
  const username = location.state?.username;
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await axios.get('http://localhost:5000/skills');
        setSkills(response.data);
      } catch (error) {
        console.error("Error fetching skills:", error);
      }
    };

    fetchSkills();
  }, []);

  const handleViewDetails = (skill_id) => {
    navigate(`/skill-details/${skill_id}`, { state: { user_id, username } });
  };

  return (
      <>
        <Navbar user_id={user_id} username={username} />
        <div className="skills-page">
          <div className="search-section">
            <input
                type="text"
                placeholder="Search for a skill or Find a skill expert"
                className="search-bar"
            />
          </div>

          <div className="content">
            <aside className="filter-options">
              <h3>Filter Options</h3>
              <div className="filter-group">
                <h4>Skill Level</h4>
                <label>
                  <input type="checkbox" /> Beginner
                </label>
                <label>
                  <input type="checkbox" /> Intermediate
                </label>
                <label>
                  <input type="checkbox" /> Advanced
                </label>
              </div>
              <div className="filter-group">
                <h4>Availability</h4>
                <label>
                  <input type="checkbox" /> Immediate
                </label>
                <label>
                  <input type="checkbox" /> 1-2 weeks
                </label>
                <label>
                  <input type="checkbox" /> Flexible
                </label>
              </div>
              <div className="filter-group">
                <h4>Type</h4>
                <label>
                  <input type="checkbox" /> Technical
                </label>
                <label>
                  <input type="checkbox" /> Creative
                </label>
                <label>
                  <input type="checkbox" /> Managerial
                </label>
              </div>
              <div className="filter-group">
                <h4>Popularity</h4>
                <input
                    type="range"
                    min="0"
                    max="100"
                    className="popularity-slider"
                />
              </div>
            </aside>

            <main className="skills-content">
              <section className="skills-categories">
                <h2>Explore Skills</h2>
                {skills.map((skill) => (
                    <div key={skill.skill_id} className="skill-card">
                      <img src={`path/to/skill/image/${skill.skill_id}`} alt={skill.skill_name} />
                      <h3>{skill.skill_name}</h3>
                      <p>{skill.description}</p>
                      <button onClick={() => handleViewDetails(skill.skill_id)}>View Details</button>
                    </div>
                ))}
              </section>

              <button className="view-all-categories">View All Categories</button>
            </main>
          </div>

          <footer className="footer">
            <button className="request-skill">Request a New Skill</button>
            <button className="become-mentor">Become a Mentor</button>
          </footer>
        </div>
      </>
  );
}

export default Skills;