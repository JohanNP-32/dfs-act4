const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server'); // Importamos tu servidor
const User = require('../src/models/User');
const Product = require('../src/models/Product');

// Variable para guardar el token del usuario de prueba
let token;

// ANTES DE TODAS LAS PRUEBAS: Conectar a la DB y limpiar datos viejos
beforeAll(async () => {
    // Aseguramos conexión (por si acaso server.js no lo hizo a tiempo)
    if (mongoose.connection.readyState === 0) {
        await mongoose.connect(process.env.MONGO_URI);
    }
    // Borramos usuarios y productos de prueba anteriores
    await User.deleteMany({ username: 'testuser' });
    await Product.deleteMany({ nombre: 'Producto Test' });
});

// DESPUÉS DE TODO: Cerrar conexión para que la prueba termine
afterAll(async () => {
    await mongoose.connection.close();
});

describe('Pruebas de la API Tom Ford', () => {

    // 1. PRUEBA DE REGISTRO
    test('POST /api/auth/register - Debe registrar un usuario nuevo', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({
                username: 'testuser',
                password: 'password123'
            });
        
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('message', 'Usuario registrado exitosamente');
    });

    // 2. PRUEBA DE LOGIN (Para obtener el Token)
    test('POST /api/auth/login - Debe iniciar sesión y devolver un Token', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                username: 'testuser',
                password: 'password123'
            });

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('token');
        token = res.body.token; // Guardamos el token para las siguientes pruebas
    });

    // 3. PRUEBA DE CREAR PRODUCTO (Ruta protegida)
    test('POST /api/products - Debe crear un producto (con Token)', async () => {
        const res = await request(app)
            .post('/api/products')
            .set('Authorization', token) // Enviamos el "gafete"
            .send({
                nombre: 'Producto Test',
                precio: 100,
                stock: 10
            });

        expect(res.statusCode).toBe(201);
        expect(res.body.nombre).toBe('Producto Test');
    });

    // 4. PRUEBA DE SEGURIDAD (Intentar crear sin Token)
    test('POST /api/products - Debe fallar si no hay Token', async () => {
        const res = await request(app)
            .post('/api/products')
            .send({
                nombre: 'Producto Ilegal',
                precio: 0,
                stock: 0
            });

        expect(res.statusCode).toBe(401); // 401 = No autorizado
    });

    // 5. PRUEBA DE OBTENER PRODUCTOS
    test('GET /api/products - Debe traer la lista de productos', async () => {
        const res = await request(app).get('/api/products');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true); // Debe ser una lista (array)
    });
});