const express = require('express');
const axios = require('axios');

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/api/fitness-classes/:endpoint', async (req, res) => {
  const { endpoint } = req.params;
  const { query } = req;
  const apiUrl = `https://gldev-practicalapi.azurewebsites.net/api/FitnessClass/${endpoint}?${new URLSearchParams(query)}`;
  try {
    const response = await axios.get(apiUrl);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
