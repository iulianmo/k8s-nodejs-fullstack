const express = require('express');
const { Pool } = require('pg');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());


// PostgreSQL connection configuration
const pool = new Pool({
  host: process.env.POSTGRES_HOST,
  user: process.env.POSTGRES_USER,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: "5432",
});


// Endpoint to get all the users information
app.get('/api/users', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT username, email, created_at FROM users');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching user data:', err);
    res.status(500).send('Server Error');
  }
});


// Endpoint to create a new user
app.post('/api/add-users', async (req, res) => {
  const { username, email } = req.body;
  const created_at = new Date().toISOString();
  try {
    const { rows } = await pool.query('INSERT INTO users (username, email, created_at) VALUES ($1, $2, $3) RETURNING *', [username, email, created_at]);
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error('Error inserting user:', err);
    res.status(500).send('Server Error');
  }
});


// Endpoint to delete all users
app.delete('/api/delete-users', async (req, res) => {
  try {
    await pool.query('DELETE FROM users');
    res.status(200).send('All users deleted successfully');
  } catch (err) {
    console.error('Error deleting users:', err);
    res.status(500).send('Server Error');
  }
});


// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
