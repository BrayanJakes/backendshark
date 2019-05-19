const express = require('express');
const router = express.Router();

// Controllers
const {index, img} = require('../controllers/home');
const image = require('../controllers/image');
const {login} = require('../controllers/login');
const {actualizar, agregar, lista, foto} = require('../controllers/usuario');

const { verifyToken } = require('../middlewares/verificacion')

module.exports = app => {

  router.get('/img/:id',verifyToken, img )
  router.get('/images',verifyToken ,index);
  router.get('/images/:image_id',verifyToken, image.index);
  router.get('/imagen/:id',verifyToken, image.imagen);
  router.put('/images/:image_id',verifyToken, image.update);
  router.post('/images',verifyToken , image.create);
  router.post('/images/:id/like',verifyToken, image.like);
  router.post('/images/:id/comment',verifyToken, image.comment);
  router.post('/comment', verifyToken, image.guardarComment)
  router.delete('/images/:image_id',verifyToken, image.remove);
  router.post('/login', login);
  router.post('/usuario', agregar);
  router.post('/usuario/:id', verifyToken, foto);
  router.get('/usuario/:id',verifyToken ,lista)
  router.put('/usuario/:id',verifyToken, actualizar);

  app.use(router);

};
