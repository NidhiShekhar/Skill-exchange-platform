const express = require("express");
const cors = require('cors');
require('dotenv').config();
const sequelize = require("./server/config/sequelize");

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

  // Add a route for testing DB connectivity
app.get('/db-test', async (req, res) => {
    try {
        const result = await sequelize.query('SELECT 1+1 AS result');
        res.json({ message: 'Database is connected', data: result });
    } catch (err) {
        res.status(500).json({ message: 'Error connecting to database', error: err });
    }
});

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
