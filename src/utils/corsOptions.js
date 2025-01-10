module.exports = {
  origin: process.env.CLIENT_URL || 'http://localhost:8080',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};