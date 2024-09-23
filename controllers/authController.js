const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel'); // Ajusta la ruta según tu estructura de carpetas

exports.register = async (req, res) => {
    const { username, password, email } = req.body;

    try {
        // Verificar si el nombre de usuario ya existe en la base de datos
        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) {
            return res.status(400).json({ message: 'El nombre de usuario ya existe' });
        }

        // Verificar si el email ya existe en la base de datos
        const existingEmail = await User.findOne({ where: { email } });
        if (existingEmail) {
            return res.status(400).json({ message: 'El correo electrónico ya está registrado' });
        }

        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Guardar el nuevo usuario en la base de datos
        const newUser = await User.create({ username, password: hashedPassword, email });

        // Responder con un mensaje de éxito
        res.status(201).json({ message: 'Usuario registrado con éxito', userId: newUser.id });
    } catch (error) {
        console.error('Error al registrar el usuario:', error); // Imprime el error completo
        res.status(500).json({ message: 'Error al registrar el usuario', error: error.message || error });
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body; 
    try {
        // Buscar el usuario en la base de datos
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(400).json({ message: 'Credenciales inválidas' });
        }

        // Comparar la contraseña
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Credenciales inválidas' });
        }

        // Generar el token
        console.log('JWT_SECRET:', process.env.JWT_SECRET);
        const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

        return res.json({ token });
    } catch (error) {
        console.error('Error al login:', error); // Imprime el error completo
        return res.status(500).json({ message: 'Error en el login', error: error.message || 'Ocurrió un error inesperado.' });
    }
};

exports.logout = (req, res) => {
    res.json({ message: 'User logged out' });
};
