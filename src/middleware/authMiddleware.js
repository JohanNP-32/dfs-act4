const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    // 1. Leer el header "Authorization"
    const token = req.header('Authorization');

    // 2. Si no hay token, denegar acceso
    if (!token) {
        return res.status(401).json({ message: 'Acceso denegado. No hay token.' });
    }

    try {
        // 3. Verificar el token (quitamos la palabra "Bearer " si viene)
        const tokenLimpio = token.replace('Bearer ', '');
        const decoded = jwt.verify(tokenLimpio, process.env.JWT_SECRET);

        // 4. Guardar los datos del usuario en la petición
        req.user = decoded;
        next(); // ¡Pase usted!
    } catch (error) {
        res.status(400).json({ message: 'Token inválido.' });
    }
};