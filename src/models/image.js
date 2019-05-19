const mongoose = require('mongoose');
const { Schema } = mongoose;
const path = require('path');

const ImageSchema = new Schema({
  title: { type: String },
  description: { type: String },
  filename: { type: String },
  comment: { type: [Object]},
  likes: { type: [Object] },
  timestamp: { type: Date, default: Date.now },
  usuario: {type: Schema.Types.ObjectId, ref: 'usuarios'}
});

ImageSchema.virtual('uniqueId')
  .get(function () {
    return this.filename.replace(path.extname(this.filename), '');
  });

module.exports = mongoose.model('imagenes', ImageSchema);
