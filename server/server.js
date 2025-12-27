import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { clerkMiddleware, requireAuth } from '@clerk/express'
import aiRoutes from './routes/AiRoutes.js';
import connectCloudinary from './configs/cloudinary.js';
import userRoutes from './routes/userRoutes.js';

const app = express()

// Connect to Cloudinary
await connectCloudinary()

//  FIXED: Proper CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173', // Vite default
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))

app.use(express.json())
app.use(clerkMiddleware())

//  Public route (no auth required)
app.get('/', (req, res) => res.send('Server is Live!'))

//  Health check route (no auth required)
app.get('/health', (req, res) => res.json({ status: 'OK', timestamp: new Date() }))

//  Protected routes (auth required)
app.use('/api/ai', aiRoutes)
app.use('/api/user', userRoutes)

//  ADDED: 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    success: false, 
    message: `Route ${req.originalUrl} not found` 
  })
})

//  ADDED: Global error handler
app.use((err, req, res, next) => {
  console.error('Server Error:', err)
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  })
})

const PORT = process.env.PORT || 3000; //  CHANGED: Default to 4000 (3000 often used by React)

app.listen(PORT, () => {
    console.log(` Server is running on http://localhost:${PORT}`);
})