import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import contactRoutes from './routes/contactRoutes.js';
import materialRoutes from './routes/materialRoutes.js';

dotenv.config();

const app = express();


// =====================================================
// CORS
// =====================================================

app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'http://127.0.0.1:5173',
    ],
    methods: [
      'GET',
      'POST',
      'PUT',
      'PATCH',
      'DELETE',
      'OPTIONS',
    ],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
    ],
  })
);


// =====================================================
// BODY PARSERS
// =====================================================

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);


// =====================================================
// HEALTH CHECK
// =====================================================

app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: '🚀 Hi-Tech Backend is running...',
  });
});


// =====================================================
// CONTACT ROUTES
// =====================================================

app.use(
  '/api/contact',
  contactRoutes
);


// =====================================================
// STUDY MATERIAL ROUTES
// =====================================================

app.use(
  '/api/materials',
  materialRoutes
);


// =====================================================
// 404 ROUTE
// =====================================================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'API route not found.',
    path: req.originalUrl,
  });
});


// =====================================================
// GLOBAL ERROR HANDLER
// =====================================================

app.use((err, req, res, next) => {
  console.error('❌ Server Error:', err);

  res.status(err.status || 500).json({
    success: false,
    message:
      err.message ||
      'Internal server error.',
  });
});


// =====================================================
// MONGODB CONNECTION + SERVER
// =====================================================

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)

  .then(() => {
    console.log('✅ MongoDB Connected');

    app.listen(PORT, () => {
      console.log(
        `🚀 Server running on http://localhost:${PORT}`
      );
    });
  })

  .catch((err) => {
    console.error(
      '❌ MongoDB connection error:',
      err.message
    );

    process.exit(1);
  });