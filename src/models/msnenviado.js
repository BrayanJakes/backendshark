const mongoose = require('mongoose');
const { Schema } = mongoose;


const mensajeEnviadoSchema = new Schema({
  mensaje: { type: [String] },
  destinosms: {type: Schema.Types.ObjectId, ref: 'usuarios'},
  quienEnvia: {type: Schema.Types.ObjectId, ref: 'usuarios'}
});



module.exports = mongoose.model('msnenviados', mensajeEnviadoSchema);