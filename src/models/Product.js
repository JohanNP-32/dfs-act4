const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    nombre: { 
        type: String, 
        required: true 
    },
    descripcion: { 
        type: String 
    },
    precio: { 
        type: Number, 
        required: true,
        min: 0 
    },
    stock: { 
        type: Number, 
        default: 0,
        min: 0 
    },
    fechaCreacion: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Product', ProductSchema);