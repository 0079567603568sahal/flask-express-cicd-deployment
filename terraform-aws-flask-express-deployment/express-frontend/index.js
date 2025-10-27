const express = require('express');
const axios = require('axios');  // add axios to call Flask backend
const app = express();
const PORT = 3000;

app.get('/', async (req, res) => {
  try {
    // Connect to Flask backend running inside Docker network
    const response = await axios.get('http://backend:5000/');
    res.send(`
      <h1>Express Frontend</h1>
      <p>${response.data.message}</p>
    `);
  } catch (error) {
    console.error("Error connecting to backend:", error.message);
    res.send(`
      <h1>Express Frontend</h1>
      <p style="color:red;">Error connecting to backend.</p>
    `);
  }
});

app.get('/health', (req, res) => {
  res.json({ status: "OK" });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Express app running on port ${PORT}`);
});
