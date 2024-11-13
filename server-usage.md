Here is the documentation for all the endpoints in `server.py`:

### User Signup
**Endpoint:** `/signup`  
**Method:** `POST`  
**Description:** Registers a new user.  
**Request Body:**
```json
{
  "username": "string",
  "email": "string",
  "password": "string",
  "full_name": "string",
  "role": "string"
}
```
**Responses:**
- `201 Created`: User created successfully.
- `400 Bad Request`: All fields are required.
- `409 Conflict`: Username or email already exists.

### User Login
**Endpoint:** `/login`  
**Method:** `POST`  
**Description:** Authenticates a user.  
**Request Body:**
```json
{
  "username": "string",
  "password": "string"
}
```
**Responses:**
- `200 OK`: Returns user ID.
- `401 Unauthorized`: Invalid credentials.

### Add Skill
**Endpoint:** `/skills`  
**Method:** `POST`  
**Description:** Adds a new skill.  
**Request Body:**
```json
{
  "skill_name": "string",
  "description": "string"
}
```
**Responses:**
- `201 Created`: Skill added successfully.
- `400 Bad Request`: Skill name is required.
- `409 Conflict`: Skill name already exists.

### Add Skill to User
**Endpoint:** `/add-skill-to-user`  
**Method:** `POST`  
**Description:** Adds or updates a skill for a user.  
**Request Body:**
```json
{
  "user_id": "integer",
  "skill_name": "string",
  "proficiency_level": "string"
}
```
**Responses:**
- `201 Created`: Skill added or updated successfully for the user.
- `400 Bad Request`: User ID, skill name, and proficiency level are required.

### List Users with Skill
**Endpoint:** `/users-with-skill`  
**Method:** `GET`  
**Description:** Lists all users with a specific skill.  
**Query Parameters:**
- `skill_name`: The name of the skill.

**Responses:**
- `200 OK`: Returns a list of users with the specified skill.
- `400 Bad Request`: Skill name is required.
- `404 Not Found`: Skill not found.

### Add Project
**Endpoint:** `/projects`  
**Method:** `POST`  
**Description:** Adds a new project.  
**Request Body:**
```json
{
  "title": "string",
  "description": "string",
  "creator_id": "integer",
  "status": "string"
}
```
**Responses:**
- `201 Created`: Project added successfully.
- `400 Bad Request`: Title and description are required.

### Add Project Skill
**Endpoint:** `/project-skills`  
**Method:** `POST`  
**Description:** Associates a skill with a project.  
**Request Body:**
```json
{
  "project_id": "integer",
  "skill_id": "integer"
}
```
**Responses:**
- `201 Created`: Project skill added successfully.
- `400 Bad Request`: Project ID and Skill ID are required.

### Add Collaboration
**Endpoint:** `/collaborations`  
**Method:** `POST`  
**Description:** Adds a collaboration to a project.  
**Request Body:**
```json
{
  "project_id": "integer",
  "user_id": "integer",
  "role": "string"
}
```
**Responses:**
- `201 Created`: Collaboration added successfully.
- `400 Bad Request`: Project ID, User ID, and role are required.
- `409 Conflict`: This collaboration already exists.

### List User Collaborations
**Endpoint:** `/user-collaborations/<int:user_id>`  
**Method:** `GET`  
**Description:** Lists all collaborations of a specific user.  
**Path Parameters:**
- `user_id`: The ID of the user.

**Responses:**
- `200 OK`: Returns a list of collaborations for the user.

### List Project Collaborators
**Endpoint:** `/project-collaborators/<int:project_id>`  
**Method:** `GET`  
**Description:** Lists all collaborators of a specific project.  
**Path Parameters:**
- `project_id`: The ID of the project.

**Responses:**
- `200 OK`: Returns a list of collaborators for the project.

### Get Project Details
**Endpoint:** `/project/<int:project_id>`  
**Method:** `GET`  
**Description:** Retrieves details of a specific project. 
**Path Parameters:**
- `project_id`: The ID of the project.

**Responses:**
- `200 OK`: Returns the project details.


### List User Projects
**Endpoint:** `/user-projects/<int:user_id>`  
**Method:** `GET`  
**Description:** Lists all projects of a specific user.  
**Path Parameters:**
- `user_id`: The ID of the user.

**Responses:**
- `200 OK`: Returns a list of projects for the user.

### List Skills
**Endpoint:** `/skills`  
**Method:** `GET`  
**Description:** Lists all skills.  
**Responses:**
- `200 OK`: Returns a list of all skills.

### List Projects
**Endpoint:** `/projects`  
**Method:** `GET`  
**Description:** Lists all projects.  
**Responses:**
- `200 OK`: Returns a list of all projects.

### List Users
**Endpoint:** `/users`  
**Method:** `GET`  
**Description:** Lists all users.  
**Responses:**
- `200 OK`: Returns a list of all users.

### List User Skills
**Endpoint:** `/user-skills/<int:user_id>`  
**Method:** `GET`  
**Description:** Lists all skills of a specific user.  
**Path Parameters:**
- `user_id`: The ID of the user.

**Responses:**
- `200 OK`: Returns a list of skills for the user.