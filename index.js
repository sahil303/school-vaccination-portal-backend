const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Import routes
const authRoutes    = require('./routes/auth');
const studentRoutes = require('./routes/students');

app.use(cors());
app.use(bodyParser.json());

app.use('/api', authRoutes);
app.use('/api/students', studentRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
