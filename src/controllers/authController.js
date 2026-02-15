const User = require('../models/User');
const jwt = require('jsonwebtoken');

// --- REGISTRAR USUARIO ---
exports.register = async (req, res) => {
    try {
        const { username, password } = req.body;
        // Crear usuario nuevo (la contraseña se encripta sola en el Modelo)
        const user = await User.create({ username, password });
        res.status(201).json({ message: 'Usuario registrado exitosamente', user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// --- INICIAR SESIÓN ---
exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        
        // 1. Buscar usuario
        const user = await User.findOne({ username });
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

        // 2. Verificar contraseña
        const esCorrecta = await user.compararPassword(password);
        if (!esCorrecta) return res.status(401).json({ message: 'Contraseña incorrecta' });

        // 3. Generar Token (El "Gafete")
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ message: 'Login exitoso', token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};