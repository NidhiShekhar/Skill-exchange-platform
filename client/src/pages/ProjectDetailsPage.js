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
  const role = location.state?.role; // Get the role from location state

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

  const handleCollaborate = async (project_id) => {
    try {
      console.log(user_id, project_id);
      const response = await axios.post("http://localhost:5000/collaborate", {
        user_id: user_id,
        project_id: project_id
      });
      if (response.status === 201) {
        alert("Collaboration request sent successfully");
      }
    } catch (error) {
      console.error("Error sending collaboration request:", error);
    }
  };

  const handleReviewSubmit = async (e, project_id, creator_id) => {
    e.preventDefault();
    const review = {
      reviewer_id: user_id,
      reviewee_id: creator_id, // Assuming project.creator_id is the user being reviewed
      project_id: project_id,
      rating: e.target.rating.value,
      review_text: e.target.review_text.value
    };
    try {
      const response = await axios.post("http://localhost:5000/add-review", review);
      if (response.status === 201) {
        alert("Review added successfully");
      }
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };

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

  const handleViewDetails = (project_id) => {
    navigate("/project", { state: { project_id, user_id, username } });
  };

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
                      <span>{skill}</span>
                      <input
                          type="checkbox"
                          checked={selectedSkills.includes(skill)}
                          onChange={() => handleSkillChange(skill)}
                      />
                    </label>
                ))}
              </section>
              <section>
                <h4>Project Status</h4>
                {statuses.map(status => (
                    <label key={status}>
                      <span>{status}</span>
                      <input
                          type="checkbox"
                          checked={selectedStatuses.includes(status)}
                          onChange={() => handleStatusChange(status)}
                      />
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
                      <button className="view-details-btn" onClick={() => handleViewDetails(project.project_id)}>View Details</button>
                      {role === "user" && (
                          <button className="collaborate-button" onClick={() => handleCollaborate(project.project_id)}>Collaborate</button>
                      )}
                      {role === "mentor" && (
                          <form onSubmit={(e) => handleReviewSubmit(e, project.project_id, project.creator_id)}>
                            <label>
                              Rating:
                              <input type="number" name="rating" min="1" max="5" required />
                            </label>
                            <label>
                              Review:
                              <textarea name="review_text" required />
                            </label>
                            <button type="submit" className="rating-review-button">Submit Review</button>
                          </form>
                      )}
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