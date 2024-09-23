const express = require('express');
const { register, login, logout } = require('../controllers/authController.js'); // Asegúrate que las rutas del controlador sean correctas
const { protect } = require('../middlewares/authMiddlewares.js');
const router = express.Router();

router.post('/register', register);  // Aquí debería estar 'register' bien importado
router.post('/login', login);        // Aquí debería estar 'login' bien importado
router.post('/logout', logout);      // Aquí debería estar 'logout' bien importado

router.get('/protected', protect, (req, res) => {
    res.json({ message: 'Access to protected resource' });
});

module.exports = router;

