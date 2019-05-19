const mongose = require('mongoose');
const validator = require('mongoose-unique-validator');
const { Schema } = mongose;

const roles = {
    values: ['Administrador', 'Usuario'],
    message: '{VALUE} no es un rol permitido'
};

const usuarioSchema = new Schema({
    nickname: {type: String, unique:true, required:[true, 'Nombre requerido']},
    password: {type: String, required:[true, 'Contraseña requerido']},
    email: {type: String, unique:true, required:[true, 'Email requerido']},
    role: {type: String, required: true, default: 'Usuario', enum: roles},
    description: {type: String},
    image: {type: String},
    conectado: {type: Boolean, default: false},
    smsEnviado: {type: [Object]},
    smsRecibido: {type: [Object]}
});

usuarioSchema.plugin(validator, {message: '{PATH} debe ser unico'});

module.exports = mongose.model('usuarios', usuarioSchema);


