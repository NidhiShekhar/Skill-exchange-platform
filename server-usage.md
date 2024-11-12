### API Endpoints Documentation

#### 1. **User Signup**
- **Endpoint:** `/signup`
- **Method:** POST
- **Description:** Registers a new user.
- **Request Body:**
  ```json
  {
    "username": "string",
    "email": "string",
    "password": "string",
    "full_name": "string",
    "role": "string"
  }
  ```
- **Response:**
  - **201 Created:** User created successfully.
  - **400 Bad Request:** All fields are required.
  - **409 Conflict:** Username or email already exists.

#### 2. **User Login**
- **Endpoint:** `/login`
- **Method:** POST
- **Description:** Authenticates a user.
- **Request Body:**
  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```
- **Response:**
  - **200 OK:** Returns user ID.
  - **401 Unauthorized:** Invalid credentials.

#### 3. **Add Skill**
- **Endpoint:** `/skills`
- **Method:** POST
- **Description:** Adds a new skill.
- **Request Body:**
  ```json
  {
    "skill_name": "string",
    "description": "string"
  }
  ```
- **Response:**
  - **201 Created:** Skill added successfully.
  - **400 Bad Request:** Skill name is required.
  - **409 Conflict:** Skill name already exists.

#### 4. **Add Skill to User**
- **Endpoint:** `/add-skill-to-user`
- **Method:** POST
- **Description:** Associates a skill with a user.
- **Request Body:**
  ```json
  {
    "user_id": "integer",
    "skill_name": "string",
    "proficiency_level": "string"
  }
  ```
- **Response:**
  - **201 Created:** Skill added or updated successfully for the user.
  - **400 Bad Request:** User ID, skill name, and proficiency level are required.

#### 5. **List Users with Skill**
- **Endpoint:** `/users-with-skill`
- **Method:** GET
- **Description:** Lists all users with a specific skill.
- **Query Parameter:** `skill_name`
- **Response:**
  - **200 OK:** Returns a list of users with the specified skill.
  - **400 Bad Request:** Skill name is required.
  - **404 Not Found:** Skill not found.

#### 6. **Add Project**
- **Endpoint:** `/projects`
- **Method:** POST
- **Description:** Adds a new project.
- **Request Body:**
  ```json
  {
    "title": "string",
    "description": "string",
    "creator_id": "integer",
    "status": "string"
  }
  ```
- **Response:**
  - **201 Created:** Project added successfully.
  - **400 Bad Request:** Title and description are required.

#### 7. **Add Project Skill**
- **Endpoint:** `/project-skills`
- **Method:** POST
- **Description:** Associates a skill with a project.
- **Request Body:**
  ```json
  {
    "project_id": "integer",
    "skill_id": "integer"
  }
  ```
- **Response:**
  - **201 Created:** Project skill added successfully.
  - **400 Bad Request:** Project ID and Skill ID are required.

#### 8. **Add Collaboration**
- **Endpoint:** `/collaborations`
- **Method:** POST
- **Description:** Adds a collaboration to a project.
- **Request Body:**
  ```json
  {
    "project_id": "integer",
    "user_id": "integer",
    "role": "string"
  }
  ```
- **Response:**
  - **201 Created:** Collaboration added successfully.
  - **400 Bad Request:** Project ID, User ID, and role are required.
  - **409 Conflict:** This collaboration already exists.

#### 9. **List User Collaborations**
- **Endpoint:** `/user-collaborations/<int:user_id>`
- **Method:** GET
- **Description:** Lists all collaborations of a specific user.
- **Response:**
  - **200 OK:** Returns a list of collaborations for the user.

#### 10. **List Project Collaborators**
- **Endpoint:** `/project-collaborators/<int:project_id>`
- **Method:** GET
- **Description:** Lists all collaborators of a specific project.
- **Response:**
  - **200 OK:** Returns a list of collaborators for the project.

#### 11. **List User Projects**
- **Endpoint:** `/user-projects/<int:user_id>`
- **Method:** GET
- **Description:** Lists all projects of a specific user.
- **Response:**
  - **200 OK:** Returns a list of projects for the user.