const mongoose = require('mongoose');
const { Schema } = mongoose;


const chatSchema = new Schema({
  nickname: {type: String},
  mensajes: {type: [String]},
  de: {type: Schema.Types.ObjectId, ref: 'usuarios'}
});



module.exports = mongoose.model('chats', chatSchema);