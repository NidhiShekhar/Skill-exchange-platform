import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import "./ProjectDetailsPage.css";

function ProjectDetailsPage() {
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const user_id = location.state?.user_id;
  const username = location.state?.username;

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("http://localhost:5000/projects");
        setProjects(response.data);

        const uniqueSkills = [...new Set(response.data.flatMap(project => project.skills.map(skill => skill[1])))];
        setSkills(uniqueSkills);

        const uniqueStatuses = [...new Set(response.data.map(project => project.status))];
        setStatuses(uniqueStatuses);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  const handleSkillChange = (skill) => {
    setSelectedSkills(prev =>
        prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  const handleStatusChange = (status) => {
    setSelectedStatuses(prev =>
        prev.includes(status) ? prev.filter(s => s !== status) : [...prev, status]
    );
  };

  const filteredProjects = projects.filter(project =>
      (selectedSkills.length === 0 || project.skills.some(skill => selectedSkills.includes(skill[1]))) &&
      (selectedStatuses.length === 0 || selectedStatuses.includes(project.status)) &&
      (searchQuery === "" || project.title.toLowerCase().includes(searchQuery.toLowerCase()) || project.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
      <>
        <Navbar user_id={user_id} username={username} />
        <div className="project-details-container">
          <input
              type="text"
              placeholder="Search Projects..."
              className="search-bar"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
          />

          <div className="content">
            <aside className="filters">
              <h3>Filters</h3>
              <section>
                <h4>Skills</h4>
                {skills.map(skill => (
                    <label key={skill}>
                      <input
                          type="checkbox"
                          checked={selectedSkills.includes(skill)}
                          onChange={() => handleSkillChange(skill)}
                      />
                      <span>{skill}</span>
                    </label>
                ))}
              </section>
              <section>
                <h4>Project Status</h4>
                {statuses.map(status => (
                    <label key={status}>
                      <input
                          type="checkbox"
                          checked={selectedStatuses.includes(status)}
                          onChange={() => handleStatusChange(status)}
                      />
                      <span>{status}</span>
                    </label>
                ))}
              </section>
            </aside>

            <main className="project-explorer">
              <header className="explore-header">
                <h2>Explore Projects</h2>
              </header>

              <div className="project-cards">
                {filteredProjects.map((project) => (
                    <div key={project.project_id} className="project-card">
                      <h3>{project.title}</h3>
                      <p>{project.description}</p>
                      <div className="tags">
                        {project.skills.map(skill => (
                            <span key={skill[0]} className="tag">{skill[1]}</span>
                        ))}
                        <span className={`tag ${project.status.toLowerCase()}`}>
                      {project.status}
                    </span>
                      </div>
                      <button className="view-details-btn">View Details</button>
                    </div>
                ))}
              </div>
            </main>
          </div>
        </div>
      </>
  );
}

export default ProjectDetailsPage;