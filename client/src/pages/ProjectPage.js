import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import "./ProjectPage.css";

function ProjectPage() {
    const [project, setProject] = useState(null);
    const location = useLocation();
    const { project_id, user_id, username } = location.state;

    useEffect(() => {
        const fetchProjectDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/project-details/${project_id}`);
                setProject(response.data);
            } catch (error) {
                console.error("Error fetching project details:", error);
            }
        };

        fetchProjectDetails();
    }, [project_id]);

    if (!project) {
        return <div>Loading...</div>;
    }

    const handleCollaborate = async (project_id) => {
        try {
            console.log(user_id, project_id);
            const response = await axios.post("http://localhost:5000/collaborations", {
                user_id: user_id,
                project_id: project_id,
                role: "Student"
            });
            if (response.status === 201) {
                alert("Collaboration request sent successfully");
            }
        } catch (error) {
            console.error("Error sending collaboration request:", error);
        }
    };

    return (
        <>
            <Navbar user_id={user_id} username={username} />
            <div className="project-page-container">
                <h1>{project.title}</h1>
                <p>{project.description}</p>
                <p><strong>Status:</strong> {project.status}</p>
                <p><strong>Creator:</strong> {project.creator_username}</p>
                <div>
                    <h3>Skills Required:</h3>
                    <ul>
                        {project.skills.map(skill => (
                            <li key={skill[0]}>{skill[1]}</li>
                        ))}
                    </ul>
                </div>
                <button className="collaborate-btn" onClick={() => handleCollaborate(project.project_id)}>Collaborate</button>
            </div>
        </>
    );
}

export default ProjectPage;