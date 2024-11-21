# Skill Exchange Platform

## Description
This project is a web application built with React, Node.js, and SQL. It allows users to manage their skills and projects, including adding skills to projects and updating project statuses.

## Features
- User authentication (login and signup)
- Error handling for various scenarios (e.g., unauthorized login, duplicate signup)
- Skill management (add, view, and remove skills)
- Project management (add, view, update, and remove projects)
- Add skills to projects
- Responsive UI with a carousel on the homepage
- Collaborative options
- Reviewing projects

## Technologies Used
- JavaScript
- React
- Python
- Flask
- SQL
- Axios
- CSS

## Endpoints

### User Authentication:
- `/signup`: User signup.
- `/login`: User login.

### Skill Management:
- `/skills` (POST): Add a new skill.
- `/add-skill-to-user`: Add or update a skill for a user.
- `/users-with-skill-id/<int:skill_id>`: List users with a specific skill by skill ID.
- `/users-with-skill`: List users with a specific skill by skill name.
- `/delete-skill-from-user`: Delete a skill from a user profile.
- `/skills` (GET): List all skills.
- `/user-skills/<int:user_id>`: List all skills of a specific user.

### Project Management:
- `/projects` (POST): Add a new project.
- `/project-skills`: Associate a skill with a project.
- `/project-skills/<int:project_id>`: List all skills of a specific project.
- `/projects` (GET): List all projects.
- `/project-details/<int:project_id>`: Get project details.
- `/user-projects/<int:user_id>`: List all projects of a specific user.

### Collaboration:
- `/collaborations`: Add a new collaboration to a project.
- `/user-collaborations/<int:user_id>`: List all collaborations of a specific user.
- `/project-collaborators/<int:project_id>`: List all collaborators of a specific project.
- `/approve-collaboration`: Approve a collaboration request.
- `/deny-collaboration`: Deny a collaboration request.

### Role Management:  
- `/request-upgrade`: Students request role upgrade.
- `/approve-upgrade`: Admins approve role upgrade.
- `/reject-upgrade`: Admins reject role upgrade.

### Reviews:  
- `/add-review`: Add a review (only mentors can post reviews).
- `/notifications`: Fetch notifications.

## Installation
1. Clone the repository:
   git clone https://github.com/NidhiShekhar/Skill-exchange-platform.git
