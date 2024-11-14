import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ProfilePage.css";
import Navbar from "./Navbar";
import profileImage from "../assets/profilepage.png"; // Import the image
import { useLocation, useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user_id = location.state?.user_id;
  const username = location.state?.username;
  const isViewingAnotherUser = location.state?.isViewingAnotherUser;

  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState("");
  const [proficiencyLevel, setProficiencyLevel] = useState("beginner");
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    creator_id: user_id,
    status: 'open'
  });
  const [availableSkills, setAvailableSkills] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState("");
  const [selectedProject, setSelectedProject] = useState("");

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/user-skills/${user_id}`);
        setSkills(response.data);
      } catch (error) {
        console.error("Error fetching skills:", error);
      }
    };

    const fetchProjects = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/user-projects/${user_id}`);
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    const fetchAvailableSkills = async () => {
      try {
        const response = await axios.get('http://localhost:5000/skills');
        setAvailableSkills(response.data);
      } catch (error) {
        console.error("Error fetching available skills:", error);
      }
    };

    fetchSkills();
    fetchProjects();
    fetchAvailableSkills();
  }, [user_id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProject({ ...newProject, [name]: value });
  };

  const handleAddProject = async () => {
    try {
      const response = await axios.post('http://localhost:5000/projects', newProject);
      const { project_id } = response.data;
      setProjects([...projects, { ...newProject, project_id }]);
      setNewProject({ title: '', description: '', creator_id: user_id, status: 'open' });
    } catch (error) {
      console.error('Error adding project:', error);
    }
  };

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

  const handleAddSkillToProject = async () => {
    try {
      await axios.post('http://localhost:5000/project-skills', {
        project_id: selectedProject,
        skill_id: selectedSkill
      });
      alert('Skill added to project successfully');
    } catch (error) {
      console.error('Error adding skill to project:', error);
    }
  };

  const handleViewProject = (project_id) => {
    navigate("/project", { state: { project_id, user_id, username } });
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
              {!isViewingAnotherUser && (
                  <button className="edit-profile-btn">Edit Profile</button>
              )}
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
              {!isViewingAnotherUser && (
                  <>
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
                  </>
              )}
            </div>
          </div>

          <div className="projects-section">
            <h3>My Projects</h3>
            <ul>
              {projects.map((project) => (
                  <li key={project.project_id}>
                    <h4>{project.title}</h4>
                    <p>{project.description}</p>
                    <p><strong>Status:</strong> {project.status}</p>
                    <button className="view-project-btn" onClick={() => handleViewProject(project.project_id)}>View Project</button>
                  </li>
              ))}
            </ul>
            {!isViewingAnotherUser && (
                <>
                  <h4>Add New Project</h4>
                  <form onSubmit={(e) => { e.preventDefault(); handleAddProject(); }}>
                    <input
                        type="text"
                        name="title"
                        value={newProject.title}
                        onChange={handleInputChange}
                        placeholder="Title"
                        required
                    />
                    <textarea
                        name="description"
                        value={newProject.description}
                        onChange={handleInputChange}
                        placeholder="Description"
                        required
                    />
                    <select
                        name="status"
                        value={newProject.status}
                        onChange={handleInputChange}
                        required
                    >
                      <option value="open">Open</option>
                      <option value="in_progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>
                    <button type="submit">Add Project</button>
                  </form>
                </>
            )}
          </div>

          {!isViewingAnotherUser && (
              <div className="add-skill-to-project-section">
                <h4>Add Skill to Project</h4>
                <form onSubmit={(e) => { e.preventDefault(); handleAddSkillToProject(); }}>
                  <select
                      value={selectedProject}
                      onChange={(e) => setSelectedProject(e.target.value)}
                      required
                  >
                    <option value="">Select Project</option>
                    {projects.map((project) => (
                        <option key={project.project_id} value={project.project_id}>
                          {project.title}
                        </option>
                    ))}
                  </select>
                  <select
                      value={selectedSkill}
                      onChange={(e) => setSelectedSkill(e.target.value)}
                      required
                  >
                    <option value="">Select Skill</option>
                    {availableSkills.map((skill) => (
                        <option key={skill.skill_id} value={skill.skill_id}>
                          {skill.skill_name}
                        </option>
                    ))}
                  </select>
                  <button type="submit">Add Skill to Project</button>
                </form>
              </div>
          )}

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

          {!isViewingAnotherUser && (
              <button className="settings-btn">Settings</button>
          )}
        </div>
      </>
  );
};

export default ProfilePage;