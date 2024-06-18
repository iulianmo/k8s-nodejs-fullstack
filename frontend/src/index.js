import express from 'express';
import fetch from 'node-fetch';

const app = express();
const port = 80;
const BACKEND_API_URL = process.env.BACKEND_API_URL

app.get('/', async (req, res) => {
  try {
    const response = await fetch(BACKEND_API_URL);
    const users = await response.json();

    const userRows = users.map(({ username, email, created_at }) => `
      <tr>
        <td>${username}</td>
        <td>${email}</td>
        <td>${new Date(created_at).toLocaleString()}</td>
      </tr>
    `).join('');

    const html = `
    <html>
    <head>
      <title>Users Information</title>
      <style>
        table {
          width: 100%;
          border-collapse: collapse;
          font-family: Arial, sans-serif;
          background-color: #f2f2f2;
        }
        th, td {
          padding: 12px 15px;
          text-align: left;
          border-bottom: 1px solid #ddd;
        }
        th {
          background-color: #4CAF50;
          color: white;
        }
        tr:hover {
          background-color: #e6e6e6;
        }
      </style>
    </head>
    <body>
      <h1><strong>Hello, these are the registered users</strong></h1>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          ${userRows}
        </tbody>
      </table>
      <br><br>
    </body>
    </html>
    `;

    res.send(html);
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).send('Server Error');
  }
});

app.listen(port, () => {
  console.log(`Front-end server running on port ${port}`);
});