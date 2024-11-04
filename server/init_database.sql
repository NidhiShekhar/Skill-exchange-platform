-- Create the database
CREATE DATABASE IF NOT EXISTS skill_exchange_platform;
USE skill_exchange_platform;

-- Users table
CREATE TABLE Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    role ENUM('student', 'admin', 'mentor') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Skills table
CREATE TABLE Skills (
    skill_id INT AUTO_INCREMENT PRIMARY KEY,
    skill_name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT
);

-- UserSkills table (for many-to-many relationship between Users and Skills)
CREATE TABLE UserSkills (
    user_id INT,
    skill_id INT,
    proficiency_level ENUM('beginner', 'intermediate', 'advanced', 'expert') NOT NULL,
    PRIMARY KEY (user_id, skill_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (skill_id) REFERENCES Skills(skill_id) ON DELETE CASCADE
);

-- Projects table
CREATE TABLE Projects (
    project_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    creator_id INT,
    status ENUM('open', 'in_progress', 'completed') NOT NULL DEFAULT 'open',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (creator_id) REFERENCES Users(user_id) ON DELETE SET NULL
);

-- ProjectSkills table (for many-to-many relationship between Projects and Skills)
CREATE TABLE ProjectSkills (
    project_id INT,
    skill_id INT,
    PRIMARY KEY (project_id, skill_id),
    FOREIGN KEY (project_id) REFERENCES Projects(project_id) ON DELETE CASCADE,
    FOREIGN KEY (skill_id) REFERENCES Skills(skill_id) ON DELETE CASCADE
);

-- Collaborations table
CREATE TABLE Collaborations (
    collaboration_id INT AUTO_INCREMENT PRIMARY KEY,
    project_id INT,
    user_id INT,
    role VARCHAR(50) NOT NULL,
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (project_id) REFERENCES Projects(project_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);

-- Reviews table
CREATE TABLE Reviews (
    review_id INT AUTO_INCREMENT PRIMARY KEY,
    reviewer_id INT,
    reviewee_id INT,
    project_id INT,
    rating INT CHECK (rating BETWEEN 1 AND 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (reviewer_id) REFERENCES Users(user_id) ON DELETE SET NULL,
    FOREIGN KEY (reviewee_id) REFERENCES Users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (project_id) REFERENCES Projects(project_id) ON DELETE CASCADE
);

-- Certifications table
CREATE TABLE Certifications (
    certification_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    certification_name VARCHAR(255) NOT NULL,
    issuing_authority VARCHAR(255) NOT NULL,
    issue_date DATE NOT NULL,
    expiry_date DATE,
    verification_url VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);

-- Mentorship table
CREATE TABLE Mentorship (
    mentorship_id INT AUTO_INCREMENT PRIMARY KEY,
    mentor_id INT,
    mentee_id INT,
    skill_id INT,
    status ENUM('requested', 'accepted', 'completed', 'cancelled') NOT NULL,
    start_date DATE,
    end_date DATE,
    FOREIGN KEY (mentor_id) REFERENCES Users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (mentee_id) REFERENCES Users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (skill_id) REFERENCES Skills(skill_id) ON DELETE SET NULL
);

-- Messages table (for communication between users)
CREATE TABLE Messages (
    message_id INT AUTO_INCREMENT PRIMARY KEY,
    sender_id INT,
    receiver_id INT,
    message_text TEXT NOT NULL,
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    read_at TIMESTAMP NULL,
    FOREIGN KEY (sender_id) REFERENCES Users(user_id) ON DELETE SET NULL,
    FOREIGN KEY (receiver_id) REFERENCES Users(user_id) ON DELETE SET NULL
);

-- Notifications table
CREATE TABLE Notifications (
    notification_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    notification_type ENUM('project_invite', 'review_received', 'mentorship_request', 'skill_endorsed') NOT NULL,
    content TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);

-- PESU_Programs table (for PESU-IO programs)
CREATE TABLE PESU_Programs (
    program_id INT AUTO_INCREMENT PRIMARY KEY,
    program_name VARCHAR(255) NOT NULL,
    description TEXT,
    start_date DATE,
    end_date DATE,
    status ENUM('upcoming', 'ongoing', 'completed') NOT NULL
);

-- UserPrograms table (for many-to-many relationship between Users and PESU_Programs)
CREATE TABLE UserPrograms (
    user_id INT,
    program_id INT,
    role ENUM('participant', 'instructor') NOT NULL,
    completion_status ENUM('enrolled', 'in_progress', 'completed', 'dropped') NOT NULL,
    PRIMARY KEY (user_id, program_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (program_id) REFERENCES PESU_Programs(program_id) ON DELETE CASCADE
);



-- 1. Database Optimization

-- Add indexes for frequently accessed columns
CREATE INDEX idx_users_email ON Users(email);
CREATE INDEX idx_skills_name ON Skills(skill_name);
CREATE INDEX idx_projects_status ON Projects(status);
CREATE INDEX idx_mentorship_status ON Mentorship(status);
CREATE INDEX idx_notifications_user_unread ON Notifications(user_id, is_read);

-- 2. Example Stored Procedures

-- Procedure to register a new user
DELIMITER //
CREATE PROCEDURE sp_register_user(
    IN p_username VARCHAR(50),
    IN p_email VARCHAR(100),
    IN p_password_hash VARCHAR(255),
    IN p_full_name VARCHAR(100),
    IN p_role ENUM('student', 'admin', 'mentor')
)
BEGIN
    INSERT INTO Users (username, email, password_hash, full_name, role)
    VALUES (p_username, p_email, p_password_hash, p_full_name, p_role);
END //

-- Procedure to create a new project with skills
CREATE PROCEDURE sp_create_project(
    IN p_title VARCHAR(255),
    IN p_description TEXT,
    IN p_creator_id INT,
    IN p_skills JSON
)
BEGIN
    DECLARE project_id_var INT;
    
    START TRANSACTION;
    
    -- Insert project
    INSERT INTO Projects (title, description, creator_id)
    VALUES (p_title, p_description, p_creator_id);
    
    SET project_id_var = LAST_INSERT_ID();
    
    -- Insert project skills
    INSERT INTO ProjectSkills (project_id, skill_id)
    SELECT project_id_var, skill_id
    FROM JSON_TABLE(p_skills, '$[*]' COLUMNS (skill_id INT PATH '$')) AS skills;
    
    COMMIT;
END //

-- 3. Example Triggers

-- Trigger to update project status when all collaborators complete
CREATE TRIGGER trg_check_project_completion
AFTER UPDATE ON Collaborations
FOR EACH ROW
BEGIN
    DECLARE total_collaborators INT;
    DECLARE completed_collaborators INT;
    
    SELECT COUNT(*), COUNT(CASE WHEN role = 'completed' THEN 1 END)
    INTO total_collaborators, completed_collaborators
    FROM Collaborations
    WHERE project_id = NEW.project_id;
    
    IF total_collaborators = completed_collaborators THEN
        UPDATE Projects 
        SET status = 'completed'
        WHERE project_id = NEW.project_id;
    END IF;
END //

-- Trigger to create notification when new review is added
CREATE TRIGGER trg_review_notification
AFTER INSERT ON Reviews
FOR EACH ROW
BEGIN
    INSERT INTO Notifications (user_id, notification_type, content)
    VALUES (
        NEW.reviewee_id,
        'review_received',
        CONCAT('You received a new review for project #', NEW.project_id)
    );
END //

DELIMITER ;

-- 4. Access Control and Security

-- Create application user roles
CREATE ROLE 'app_admin', 'app_user', 'app_mentor';

-- Grant privileges for app_admin
GRANT ALL PRIVILEGES ON skill_exchange_platform.* TO 'app_admin';

-- Grant privileges for app_user
GRANT SELECT, INSERT ON skill_exchange_platform.Users TO 'app_user';
GRANT SELECT, INSERT ON skill_exchange_platform.UserSkills TO 'app_user';
GRANT SELECT ON skill_exchange_platform.Skills TO 'app_user';
GRANT SELECT, INSERT ON skill_exchange_platform.Projects TO 'app_user';
-- Add more specific grants as needed

-- Grant privileges for app_mentor
GRANT SELECT, INSERT, UPDATE ON skill_exchange_platform.Mentorship TO 'app_mentor';
GRANT SELECT, INSERT ON skill_exchange_platform.Reviews TO 'app_mentor';
-- Add more specific grants as needed

-- 5. Views for Common Queries

-- View for user profiles with skills
CREATE VIEW vw_user_profiles AS
SELECT 
    u.user_id,
    u.username,
    u.full_name,
    u.role,
    GROUP_CONCAT(DISTINCT s.skill_name) as skills,
    COUNT(DISTINCT p.project_id) as total_projects,
    AVG(r.rating) as avg_rating
FROM Users u
LEFT JOIN UserSkills us ON u.user_id = us.user_id
LEFT JOIN Skills s ON us.skill_id = s.skill_id
LEFT JOIN Collaborations c ON u.user_id = c.user_id
LEFT JOIN Projects p ON c.project_id = p.project_id
LEFT JOIN Reviews r ON u.user_id = r.reviewee_id
GROUP BY u.user_id;

-- View for active mentorship opportunities
CREATE VIEW vw_active_mentorships AS
SELECT 
    m.mentorship_id,
    mentor.username as mentor_name,
    mentee.username as mentee_name,
    s.skill_name,
    m.status,
    m.start_date,
    m.end_date
FROM Mentorship m
JOIN Users mentor ON m.mentor_id = mentor.user_id
JOIN Users mentee ON m.mentee_id = mentee.user_id
JOIN Skills s ON m.skill_id = s.skill_id
WHERE m.status IN ('requested', 'accepted');