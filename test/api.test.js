const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server'); 
const User = require('../src/models/User');
const Product = require('../src/models/Product');

let token;

beforeAll(async () => {
    if (mongoose.connection.readyState === 0) {
        await mongoose.connect(process.env.MONGO_URI);
    }
    await User.deleteMany({ username: 'testuser' });
    await Product.deleteMany({ nombre: 'Producto Test' });
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('Pruebas de la API Tom Ford', () => {

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

    test('POST /api/auth/login - Debe iniciar sesión y devolver un Token', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                username: 'testuser',
                password: 'password123'
            });

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('token');
        token = res.body.token; 
    });

    test('POST /api/products - Debe crear un producto (con Token)', async () => {
        const res = await request(app)
            .post('/api/products')
            .set('Authorization', token) 
            .send({
                nombre: 'Producto Test',
                precio: 100,
                stock: 10
            });

        expect(res.statusCode).toBe(201);
        expect(res.body.nombre).toBe('Producto Test');
    });

    test('POST /api/products - Debe fallar si no hay Token', async () => {
        const res = await request(app)
            .post('/api/products')
            .send({
                nombre: 'Producto Ilegal',
                precio: 0,
                stock: 0
            });

        expect(res.statusCode).toBe(401); 
    });

    test('GET /api/products - Debe traer la lista de productos', async () => {
        const res = await request(app).get('/api/products');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true); 
    });
});