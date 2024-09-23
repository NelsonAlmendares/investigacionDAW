const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('../routes/authRoutes.js');
const sequelize = require('../config/database.js');
const cors = require('cors');
const User = require('../models/userModel.js'); // Para sincronizar el modelo

// Cargar variables de entorno
dotenv.config();
console.log('JWT_SECRET:', process.env.JWT_SECRET);

const app = express();
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true // Esto es si estás usando cookies o sesiones
}));

// Rutas
app.use('/api/auth', authRoutes);

// Sincronizar la base de datos y luego iniciar el servidor
const PORT = process.env.PORT || 5000;
sequelize.sync().then(() => {
    console.log('Database connected and synchronized');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});
