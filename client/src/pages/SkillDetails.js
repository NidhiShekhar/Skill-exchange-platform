import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import "./SkillDetails.css";

function SkillDetails() {
    const { skill_id } = useParams();
    const location = useLocation();
    const user_id = location.state?.user_id;
    const username = location.state?.username;
    const role = location.state?.role; // Get the role from location state
    const [skill, setSkill] = useState({});
    const [users, setUsers] = useState([]);
    const [review, setReview] = useState({ rating: "", review_text: "" });
    const navigate = useNavigate();

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

    const handleUserClick = (user) => {
        navigate("/profilepage", { state: { user_id: user.user_id, username: user.username, isViewingAnotherUser: true } });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setReview({ ...review, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/add-review", {
                reviewer_id: user_id,
                reviewee_id: skill.creator_id, // Assuming skill.creator_id is the user being reviewed
                project_id: skill_id,
                rating: review.rating,
                review_text: review.review_text
            });
            if (response.status === 201) {
                alert("Review added successfully");
            }
        } catch (error) {
            console.error("Error adding review:", error);
        }
    };

    return (
        <>
            <Navbar user_id={user_id} username={username} role={role} />
            <div className="skill-details-page">
                <h2>{skill.skill_name}</h2>
                <p>{skill.description}</p>
                <h3>Users with this skill</h3>
                <div>
                    {users.map((user) => (
                        <div key={user.user_id} className="user-box" onClick={() => handleUserClick(user)}>
                            <div className="username">{user.username}</div>
                            <div className="proficiency">{user.proficiency_level}</div>
                        </div>
                    ))}
                </div>
                {role === "mentor" && (
                    <form onSubmit={handleSubmit}>
                        <label>
                            Rating:
                            <input type="number" name="rating" value={review.rating} onChange={handleInputChange} min="1" max="5" required />
                        </label>
                        <label>
                            Review:
                            <textarea name="review_text" value={review.review_text} onChange={handleInputChange} required />
                        </label>
                        <button type="submit" className="rating-review-button">Submit Review</button>
                    </form>
                )}
            </div>
        </>
    );
}

export default SkillDetails;