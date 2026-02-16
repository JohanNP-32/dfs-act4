const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Acceso denegado. No hay token.' });
    }

    try {
        const tokenLimpio = token.replace('Bearer ', '');
        const decoded = jwt.verify(tokenLimpio, process.env.JWT_SECRET);

        req.user = decoded;
        next(); 
    } catch (error) {
        res.status(400).json({ message: 'Token inválido.' });
    }
};