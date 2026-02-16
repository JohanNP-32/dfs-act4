require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path'); 

// Importar rutas
const authRoutes = require('./src/routes/auth');
const productRoutes = require('./src/routes/products');

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// --- 1. SERVIR ARCHIVOS ESTÁTICOS ---
// Esto debe ir ANTES de cualquier ruta genérica
app.use(express.static(path.join(__dirname, 'public')));

// --- 2. CONEXIÓN A MONGODB ---
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Conectado a MongoDB Atlas'))
    .catch((err) => console.error('Error de conexión:', err));

// --- 3. RUTAS DE LA API ---
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

// --- 4. RUTA PARA EL FRONTEND ---
// Esta sintaxis evita el error de path-to-regexp
app.use((req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
}

module.exports = app;