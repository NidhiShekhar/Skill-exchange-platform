import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import "./SkillDetails.css";

function SkillDetails() {
    const { skill_id } = useParams();
    const location = useLocation();
    const user_id = location.state?.user_id;
    const username = location.state?.username;
    const [skill, setSkill] = useState({});
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchSkillDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/skills/${skill_id}`);
                setSkill(response.data);
            } catch (error) {
                console.error("Error fetching skill details:", error);
            }
        };

        const fetchUsersWithSkill = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/users-with-skill-id/${skill_id}`);
                setUsers(response.data);
            } catch (error) {
                console.error("Error fetching users with skill:", error);
            }
        };

        fetchSkillDetails();
        fetchUsersWithSkill();
    }, [skill_id]);

    return (
        <>
            <Navbar user_id={user_id} username={username} />
            <div className="skill-details-page">
                <h2>{skill.skill_name}</h2>
                <p>{skill.description}</p>
                <h3>Users with this skill</h3>
                <div>
                    {users.map((user) => (
                        <div key={user.user_id} className="user-box">
                            <div className="username">{user.username}</div>
                            <div className="proficiency">{user.proficiency_level}</div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default SkillDetails;