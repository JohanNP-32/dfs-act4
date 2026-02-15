const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware');

// Rutas: /api/products

// CUALQUIERA puede ver los productos (GET)
router.get('/', productController.getAllProducts);

// SOLO USUARIOS AUTENTICADOS pueden Crear, Editar o Borrar
router.post('/', authMiddleware, productController.createProduct);
router.put('/:id', authMiddleware, productController.updateProduct);
router.delete('/:id', authMiddleware, productController.deleteProduct);

module.exports = router;