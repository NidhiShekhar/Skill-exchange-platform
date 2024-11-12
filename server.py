from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
import os
import bcrypt
app = Flask(__name__)
CORS(app)


def get_db_connection():
    with open(".passwd.txt", "r") as file:
        passwd = file.read().strip()
    return mysql.connector.connect(
        host="bar0n.live", user="skill_exchange", password=passwd, database="skill_exchange_platform"
    )


# User signup endpoint
@app.route("/signup", methods=["POST"])
def signup():
    data = request.json
    print(data)
    username = data.get("username")
    email = data.get("email")
    password = data.get("password")
    full_name = data.get("full_name")
    role = data.get("role")

    if not all([username, email, password, full_name, role]):
        return jsonify({"error": "All fields are required."}), 400

    password_hash = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt())

    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO Users (username, email, password_hash, full_name, role) VALUES (%s, %s, %s, %s, %s)",
            (username, email, password_hash, full_name, role),
        )
        conn.commit()
        cursor.execute("SELECT user_id FROM Users WHERE username = %s", (username,))
        user_id = cursor.fetchone()[0]
        return jsonify({"message": "User created successfully", "user_id":user_id}), 201
    except mysql.connector.IntegrityError:
        return jsonify({"error": "Username or email already exists."}), 409
    finally:
        cursor.close()
        conn.close()


# User login endpoint
@app.route("/login", methods=["POST"])
def login():
    data = request.json
    username = data.get("username")
    password = data.get("password")

    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM Users WHERE username = %s", (username,))
        user = cursor.fetchone()

        if user and bcrypt.checkpw(
            password.encode("utf-8"), user["password_hash"].encode("utf-8")
        ):
            return jsonify({"user_id": user["user_id"]}), 200
        return jsonify({"error": "Invalid credentials"}), 401
    finally:
        cursor.close()
        conn.close()


# Endpoint to add a new skill
@app.route("/skills", methods=["POST"])
def add_skill():
    data = request.json
    skill_name = data.get("skill_name")
    description = data.get("description")

    if not skill_name:
        return jsonify({"error": "Skill name is required."}), 400

    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO Skills (skill_name, description) VALUES (%s, %s)",
            (skill_name, description),
        )
        conn.commit()
        return jsonify({"message": "Skill added successfully"}), 201
    except mysql.connector.IntegrityError:
        return jsonify({"error": "Skill name already exists."}), 409
    finally:
        cursor.close()
        conn.close()


# Endpoint to add or retrieve a skill and associate it with a user
@app.route("/add-skill-to-user", methods=["POST"])
def add_skill_to_user():
    data = request.json
    user_id = data.get("user_id")
    skill_name = data.get("skill_name")
    proficiency_level = data.get("proficiency_level")

    if not all([user_id, skill_name, proficiency_level]):
        return jsonify(
            {"error": "User ID, skill name, and proficiency level are required."}
        ), 400

    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        cursor.execute(
            "SELECT skill_id FROM Skills WHERE skill_name = %s", (skill_name,)
        )
        skill = cursor.fetchone()

        if skill:
            skill_id = skill[0]
        else:
            cursor.execute("INSERT INTO Skills (skill_name) VALUES (%s)", (skill_name,))
            conn.commit()
            skill_id = cursor.lastrowid

        cursor.execute(
            """
            INSERT INTO UserSkills (user_id, skill_id, proficiency_level)
            VALUES (%s, %s, %s)
            ON DUPLICATE KEY UPDATE proficiency_level = %s
            """,
            (user_id, skill_id, proficiency_level, proficiency_level),
        )
        conn.commit()
        return jsonify(
            {"message": "Skill added or updated successfully for the user."}
        ), 201
    finally:
        cursor.close()
        conn.close()


# Endpoint to list all users with a specific skill
@app.route("/users-with-skill", methods=["GET"])
def list_users_with_skill():
    skill_name = request.args.get("skill_name")

    if not skill_name:
        return jsonify({"error": "Skill name is required."}), 400

    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute(
            "SELECT skill_id FROM Skills WHERE skill_name = %s", (skill_name,)
        )
        skill = cursor.fetchone()

        if not skill:
            return jsonify({"error": "Skill not found."}), 404

        skill_id = skill["skill_id"]
        cursor.execute(
            """
            SELECT Users.user_id, Users.username, Users.full_name, UserSkills.proficiency_level
            FROM UserSkills
            JOIN Users ON UserSkills.user_id = Users.user_id
            WHERE UserSkills.skill_id = %s
            """,
            (skill_id,),
        )
        users_with_skill = cursor.fetchall()
        return jsonify(users_with_skill), 200
    finally:
        cursor.close()
        conn.close()


# Endpoint to add a new project
@app.route("/projects", methods=["POST"])
def add_project():
    data = request.json
    title = data.get("title")
    description = data.get("description")
    creator_id = data.get("creator_id")
    status = data.get("status", "open")

    if not title or not description:
        return jsonify({"error": "Title and description are required."}), 400

    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute(
            """
            INSERT INTO Projects (title, description, creator_id, status)
            VALUES (%s, %s, %s, %s)
            """,
            (title, description, creator_id, status),
        )
        conn.commit()
        return jsonify({"message": "Project added successfully"}), 201
    finally:
        cursor.close()
        conn.close()


# Endpoint to associate a skill with a project
@app.route("/project-skills", methods=["POST"])
def add_project_skill():
    data = request.json
    project_id = data.get("project_id")
    skill_id = data.get("skill_id")

    if not project_id or not skill_id:
        return jsonify({"error": "Project ID and Skill ID are required."}), 400

    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute(
            """
            INSERT INTO ProjectSkills (project_id, skill_id)
            VALUES (%s, %s)
            """,
            (project_id, skill_id),
        )
        conn.commit()
        return jsonify({"message": "Project skill added successfully"}), 201
    finally:
        cursor.close()
        conn.close()


@app.route("/collaborations", methods=["POST"])
def add_collaboration():
    data = request.json
    project_id = data.get("project_id")
    user_id = data.get("user_id")
    role = data.get("role")

    if not all([project_id, user_id, role]):
        return jsonify({"error": "Project ID, User ID, and role are required."}), 400

    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute(
            """
            INSERT INTO Collaborations (project_id, user_id, role)
            VALUES (%s, %s, %s)
            """,
            (project_id, user_id, role),
        )
        conn.commit()
        return jsonify({"message": "Collaboration added successfully"}), 201
    except mysql.connector.IntegrityError:
        return jsonify({"error": "This collaboration already exists."}), 409
    finally:
        cursor.close()
        conn.close()


# Endpoint to list all collaborations of a specific user
@app.route("/user-collaborations/<int:user_id>", methods=["GET"])
def list_user_collaborations(user_id):
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute(
            """
            SELECT Projects.project_id, Projects.title, Projects.description, Collaborations.role, Collaborations.joined_at
            FROM Collaborations
            JOIN Projects ON Collaborations.project_id = Projects.project_id
            WHERE Collaborations.user_id = %s
            """,
            (user_id,),
        )
        user_collaborations = cursor.fetchall()
        return jsonify(user_collaborations), 200
    finally:
        cursor.close()
        conn.close()


# Endpoint to list all collaborators of a specific project
@app.route("/project-collaborators/<int:project_id>", methods=["GET"])
def list_project_collaborators(project_id):
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute(
            """
            SELECT Users.user_id, Users.username, Users.full_name, Collaborations.role, Collaborations.joined_at
            FROM Collaborations
            JOIN Users ON Collaborations.user_id = Users.user_id
            WHERE Collaborations.project_id = %s
            """,
            (project_id,),
        )
        project_collaborators = cursor.fetchall()
        return jsonify(project_collaborators), 200
    finally:
        cursor.close()
        conn.close()


# Endpoint to list all projects of a specific user
@app.route("/user-projects/<int:user_id>", methods=["GET"])
def list_user_projects(user_id):
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute(
            "SELECT * FROM Projects WHERE creator_id = %s", (user_id,)
        )
        user_projects = cursor.fetchall()
        return jsonify(user_projects), 200
    finally:
        cursor.close()
        conn.close()

# Endpoint to list all skills
@app.route("/skills", methods=["GET"])
def list_skills():
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM Skills")
        skills = cursor.fetchall()
        return jsonify(skills), 200
    finally:
        cursor.close()
        conn.close()

# Endpoint to list all projects
@app.route("/projects", methods=["GET"])
def list_projects():
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM Projects")
        projects = cursor.fetchall()
        return jsonify(projects), 200
    finally:
        cursor.close()
        conn.close()

# Endpoint to list all users
@app.route("/users", methods=["GET"])
def list_users():
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT username, user_id FROM Users")
        users = cursor.fetchall()
        return jsonify(users), 200
    finally:
        cursor.close()
        conn.close()

# Endpoint to list all skills of a specific user
@app.route("/user-skills/<int:user_id>", methods=["GET"])
def list_user_skills(user_id):
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute(
            """
            SELECT Skills.skill_name, UserSkills.proficiency_level
            FROM UserSkills
            JOIN Skills ON UserSkills.skill_id = Skills.skill_id
            WHERE UserSkills.user_id = %s
            """,
            (user_id,),
        )
        user_skills = cursor.fetchall()
        return jsonify(user_skills), 200
    finally:
        cursor.close()
        conn.close()

if __name__ == "__main__":
    app.run(host="localhost", port=5000, debug=True)
