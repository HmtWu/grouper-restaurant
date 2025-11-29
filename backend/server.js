const path = require('path');
const express = require('express');
const cors = require('cors');

const fishRoutes = require('./routes/fishRoutes');
const menuRoutes = require('./routes/menuRoutes');
const reservationRoutes = require('./routes/reservationRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// Serve frontend
app.use(express.static(path.join(__dirname, '..', 'frontend')));

// API routes
app.use('/api/fish', fishRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/reservations', reservationRoutes);

// Fallback to index
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));