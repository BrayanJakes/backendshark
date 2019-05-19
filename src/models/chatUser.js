const mongoose = require('mongoose');
const { Schema } = mongoose;


const chatUserSchema = new Schema({
  nickname: { type: String },
  usuarioId: { type: Schema.Types.ObjectId, ref: 'usuarios' },
  img: {type: String},
  conectado: {type: Boolean, default: false}
});



module.exports = mongoose.model('chatusers', chatUserSchema);