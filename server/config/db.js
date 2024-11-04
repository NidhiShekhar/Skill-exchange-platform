// config/database.js

const { Sequelize } = require("sequelize");

// Create a new Sequelize instance
const sequelize = new Sequelize(
  "skill_exchange_platform",
  "root",
  "9326115",
  {
    host: "localhost",
    dialect: "mariadb", // Use 'mariadb' as the dialect
    logging: false, // Optional: Disable logging for cleaner output
  }
);

// Test the database connection
sequelize
  .authenticate()
  .then(() => console.log("Database connected..."))
  .catch((err) => console.log("Error: " + err));

// Sync the models with the database
sequelize
  .sync({ force: true })
  .then(() => console.log("Database and tables created!"))
  .catch((err) => console.log("Error: " + err));

module.exports = sequelize;
