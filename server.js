const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static('public'));

app.use((req, res, next) => {
  const log = `IP: ${req.ip}, Time: ${new Date().toISOString()}\n`;
  fs.appendFile(path.join(__dirname, 'visits.log'), log, (err) => {
    if (err) console.log(err);
  });
  next();
});

app.get('/logs', (req, res) => {
  fs.readFile(path.join(__dirname, 'visits.log'), 'utf8', (err, data) => {
    if (err) return res.status(500).send('Error reading logs');
    res.json({ logs: data });
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
