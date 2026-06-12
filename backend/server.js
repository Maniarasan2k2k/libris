import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import bookRoutes from './routes/bookRoutes.js';
import memberRoutes from './routes/memberRoutes.js';

// Load environment variables
dotenv.config();

// Connect to Database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/books', bookRoutes);
app.use('/api/members', memberRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Library Management System API is running...');
});

// Custom 404 handler
app.use((req, res, next) => {
  res.status(404).json({ message: `Not Found - ${req.originalUrl}` });
});


const PORT = process.env.PORT || 5000; // Fixed port for stable API endpoint

const server = app.listen(PORT, () => {
  const actualPort = server.address().port;
  console.log(`Server running in development mode on port ${actualPort}`);
});
