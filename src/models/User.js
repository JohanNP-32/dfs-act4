const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true 
    }
});

// --- CORRECCIÓN AQUÍ ---
// Al usar 'async', quitamos el parámetro 'next'. 
// Mongoose esperará automáticamente a que el código termine.
UserSchema.pre('save', async function() {
    // Si la contraseña no ha cambiado, no hacemos nada y la función termina sola.
    if (!this.isModified('password')) return;

    // Si cambió, la encriptamos.
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Método para comparar contraseñas
UserSchema.methods.compararPassword = async function(passwordIngresada) {
    return await bcrypt.compare(passwordIngresada, this.password);
};

module.exports = mongoose.model('User', UserSchema);