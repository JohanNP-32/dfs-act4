const Product = require('../models/Product');

// --- OBTENER TODOS LOS PRODUCTOS ---
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// --- CREAR UN PRODUCTO ---
exports.createProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// --- ACTUALIZAR UN PRODUCTO ---
exports.updateProduct = async (req, res) => {
    try {
        // Busca por ID y actualiza. { new: true } devuelve el producto ya cambiado.
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!product) return res.status(404).json({ message: 'Producto no encontrado' });
        res.json(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// --- ELIMINAR UN PRODUCTO ---
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).json({ message: 'Producto no encontrado' });
        res.json({ message: 'Producto eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};