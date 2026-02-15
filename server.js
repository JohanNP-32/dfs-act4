require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Importar rutas
const authRoutes = require('./src/routes/auth');
const productRoutes = require('./src/routes/products');

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(express.static('public')); 

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Conectado a MongoDB Atlas'))
    .catch((err) => console.error('Error de conexión:', err));

// Usar Rutas
app.use('/api/auth', authRoutes);      // Todo lo que empiece con /api/auth
app.use('/api/products', productRoutes); // Todo lo que empiece con /api/products

// Ruta base
app.get('/', (req, res) => {
    res.send('API de Productos Tom Ford v1.0 🚀');
});

// ... (todo tu código anterior sigue igual)

const PORT = process.env.PORT || 3000;

// Solo iniciar el servidor si NO estamos en modo de prueba
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
}

module.exports = app; // Exportamos la app para poder probarla con Jest