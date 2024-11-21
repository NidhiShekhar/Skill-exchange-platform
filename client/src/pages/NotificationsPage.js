import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import "./NotificationsPage.css";
import {useLocation} from "react-router-dom";

function NotificationsPage() {
    const [notifications, setNotifications] = useState([]);
    const [rating, setRating] = useState('');
    const [reviewText, setReviewText] = useState('');
    const location = useLocation();
    const user_id = location.state?.user_id;
    const username = location.state?.username;

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await axios.get("http://localhost:5000/notifications", {
                    params: { user_id: user_id }
                });
                setNotifications(response.data);
            } catch (error) {
                console.error("Error fetching notifications:", error);
            }
        };



        fetchNotifications();
    }, [user_id]);

    const handleApproveCollaboration = async (notificationId, projectId) => {
        try {
            await axios.post(`http://localhost:5000/approve-collaboration`, { notificationId, projectId });
            setNotifications(notifications.filter(notification => notification.notification_id !== notificationId));
        } catch (error) {
            console.error("Error approving collaboration:", error);
        }
    };

    const handleDenyCollaboration = async (notificationId) => {
        try {
            await axios.post(`http://localhost:5000/deny-collaboration`, { notificationId });
            setNotifications(notifications.filter(notification => notification.notification_id !== notificationId));
        } catch (error) {
            console.error("Error denying collaboration:", error);
        }
    };

    const handleCollaborate = async (projectId) => {
        try {
            await axios.post("http://localhost:5000/collaborations", {
                project_id: projectId,
                user_id: user_id,
                role: "collaborator"
            });
            console.log("Collaboration request sent");
        } catch (error) {
            console.error("Error sending collaboration request:", error);
        }
    };

    const handleReview = async (revieweeId, projectId) => {
        try {
            await axios.post("http://localhost:5000/add-review", {
                reviewer_id: user_id,
                reviewee_id: revieweeId,
                project_id: projectId,
                rating: rating,
                review_text: reviewText
            });
            console.log("Review added");
        } catch (error) {
            console.error("Error adding review:", error);
        }
    };

    return (
        <>
            <Navbar user_id={user_id} username={username} />
            <div className="notifications-page">
                <h2>Notifications</h2>
                <div className="notifications-list">
                    {notifications.map((notification) => (
                        <div key={notification.notification_id} className="notification-item">
                            <p>{notification.content}</p>
                            {notification.notification_type === "collaboration_request" && (
                                <div className="collaboration-actions">
                                    <button onClick={() => handleApproveCollaboration(notification.notification_id, notification.project_id)}>Approve</button>
                                    <button onClick={() => handleDenyCollaboration(notification.notification_id)}>Deny</button>
                                </div>
                            )}
                            {notification.notification_type === "review_request" && (
                                <div className="review-actions">
                                    <input
                                        type="number"
                                        value={rating}
                                        onChange={(e) => setRating(e.target.value)}
                                        placeholder="Rating"
                                    />
                                    <textarea
                                        value={reviewText}
                                        onChange={(e) => setReviewText(e.target.value)}
                                        placeholder="Review text"
                                    />
                                    <button onClick={() => handleReview(notification.reviewee_id, notification.project_id)}>Submit Review</button>
                                </div>
                            )}
                            {notification.notification_type === "collaborate" && (
                                <button onClick={() => handleCollaborate(notification.project_id)}>Collaborate</button>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default NotificationsPage;