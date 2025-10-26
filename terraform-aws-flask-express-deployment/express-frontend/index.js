const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send("Hello from Express frontend on EC2!");
});

app.get('/health', (req, res) => {
  res.json({ status: "OK" });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Express app running on port ${PORT}`);
});
