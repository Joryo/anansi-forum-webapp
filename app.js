// Get env configuration
require('dotenv').config();

const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

console.log("Listen on " + process.env.SERVER_PORT);
app.listen(process.env.SERVER_PORT);