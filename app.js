const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const transcriptionRoutes = require('./routes/transcriptionRoutes'); 

dotenv.config();  
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => {
        console.error("MongoDB Connection Error:", err);
        process.exit(1);
    });

// Use /api prefix for routes
app.use('/api', transcriptionRoutes);

// Handle 404 errors
app.use((req, res) => {
    res.status(404).json({ error: "Route not found." });
});

// // Server Setup
// app.listen(process.env.PORT || 5000, () => console.log(`Server running on port ${process.env.PORT || 5000}`));
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
  