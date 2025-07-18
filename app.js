// File: /src/app.js

const express = require('express');
const dotenv = require('dotenv');
const interviewRoutes = require('./routes/interviewRoutes');
const { initializeDatabase } = require('./models/index');

dotenv.config();

const app = express();
const bodyParser = require('body-parser');
app.use(express.json());

// Routes
app.use('/interview', interviewRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {console.log(`Server running on port ${PORT}`);
initializeDatabase();
});
