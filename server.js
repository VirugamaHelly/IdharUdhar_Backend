const express = require('express');
require("dotenv").config()
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cors = require('cors');
const db = require("./config/db")

const app = express();

// Middleware setup

app.use(cors());
app.use(express.json());



// Route setup

app.use('/api/auth', authRoutes);

// Start server

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
