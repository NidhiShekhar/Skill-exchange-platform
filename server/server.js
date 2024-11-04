const express = require("express");
const cors = require('cors');
require('dotenv').config();
const sequelize = require("./config/db");

const app = express();

// CORS configuration (optional)
app.use(cors({
    origin: 'http://localhost:3000', // Adjust this to your frontend URL
}));

app.use(express.json());

// Test DB connection
sequelize
  .authenticate()
  .then(() => console.log("Database connected..."))
  .catch((err) => console.log("Error: " + err));

// Define routes
app.get('/', (req, res) => {
    res.send('Hello from the server!');
});

// Error handling middleware (optional)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('Shutting down server...');
    sequelize.close().then(() => {
        process.exit(0);
    });
});
