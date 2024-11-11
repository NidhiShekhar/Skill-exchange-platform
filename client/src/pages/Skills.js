import React from "react";
import "./Skills.css";
import Navbar from "./Navbar";

// Import images
import webDevelopmentImg from "../assets/web-development.jpeg";
import graphicDesignImg from "../assets/graphic-design.jpg";
import dataScienceImg from "../assets/data-science.jpeg";
import mentor1Img from "../assets/mentor1.jpeg";
import mentor2Img from "../assets/mentor2.jpeg";
import mentor3Img from "../assets/mentor3.jpeg";

function Skills() {
  return (
    <>
      <Navbar />
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
              <h2>Explore Projects</h2>
              <div className="skill-card">
                <img src={webDevelopmentImg} alt="Web Development" />
                <h3>Web Development</h3>
                <p>Build and maintain websites using various technologies.</p>
                <button>View Details</button>
              </div>
              <div className="skill-card">
                <img src={graphicDesignImg} alt="Graphic Design" />
                <h3>Graphic Design</h3>
                <p>Create visual content to communicate messages.</p>
                <button>View Details</button>
              </div>
              <div className="skill-card">
                <img src={dataScienceImg} alt="Data Science" />
                <h3>Data Science</h3>
                <p>Analyze and interpret complex data sets.</p>
                <button>View Details</button>
              </div>
            </section>

            <button className="view-all-categories">View All Categories</button>

            <section className="mentor-availability">
              <h2>Mentor Availability</h2>
              <div className="mentor-card">
                <img src={mentor1Img} alt="John Smith" />
                <h4>John Smith</h4>
                <p>Full Stack Development, React, Node.js</p>
                <button>Connect with Mentor</button>
              </div>
              <div className="mentor-card">
                <img src={mentor2Img} alt="Emily Jones" />
                <h4>Emily Jones</h4>
                <p>Graphic Design, Adobe Suite, UX/UI</p>
                <button>Connect with Mentor</button>
              </div>
              <div className="mentor-card">
                <img src={mentor3Img} alt="Michael Lee" />
                <h4>Michael Lee</h4>
                <p>Data Science, Python, Machine Learning</p>
                <button>Connect with Mentor</button>
              </div>
            </section>

            <section className="recommended-skills">
              <h2>Recommended Skills for You</h2>
              <div className="recommended-skill">UI/UX Design</div>
              <div className="recommended-skill">Cybersecurity</div>
              <div className="recommended-skill">Project Management</div>
              <div className="recommended-skill">Digital Marketing</div>
            </section>
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
