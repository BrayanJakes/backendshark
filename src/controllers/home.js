const sidebar = require('../helpers/sidebar');
const { Image } = require('../models');
const moment = require('moment');

const ctrl = {};

ctrl.index = async (req, res) => {
  const images = await Image
    .find().populate('usuario', 'nickname email')
    .sort({ timestamp: -1 });
  let viewModel = { images: [] };
  viewModel.images = images;
  viewModel = await sidebar(viewModel);

  res.json({
    ok:true,
    message: 'index',
    viewModel
  })
};

ctrl.img = async (req, res) => {
  let id = req.params.id;
  const images = await Image
  .find({usuario: id}).populate('usuario', 'nickname')
  .sort({ timestamp: -1 });


res.json({
  ok:true,
  message: 'usuarios con imagenes',
  images
})
}


module.exports = ctrl;
