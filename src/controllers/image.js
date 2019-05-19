const fs = require('fs-extra');
const path = require('path');
const Crud = require('../config/crudmongo');


const ctrl = {};

const sidebar = require('../helpers/sidebar');
const { Image, Comment } = require('../models');
const usuarioModel = require('../models/usuario');

ctrl.index = async (req, res) => {
  let viewModel = { image: {}, comments: [] };
  const image = await Image.findOne({filename: { $regex: req.params.image_id }});
  if (image) {
    image.views = image.views + 1;
    viewModel.image = image;
    image.save();
    const comments = await Comment.find({image_id: image._id})
      .sort({'timestamp': 1});
    viewModel.comments = comments;
    viewModel = await sidebar(viewModel);
    // res.render('image', viewModel);
    res.json({
      ok: true,
      message: 'image index si existe una imagen'
    })
  } else {
   // res.redirect('/');
   res.json({
    ok: true,
    message: 'image index no existe una imagen'
  })
  }
};


ctrl.imagen = async (req, res) => {

  let id = req.params.id


  const listado =  await Image.findById(id).populate('usuario', 'nickname image')
  .exec({}, (err, imagen)=>{
     if(err){
         return res.json({
             ok:false,
             err
          })
     }
      return res.json({
         ok:true,
         imagen,
         
      })
  })
        
};

ctrl.create = async (req, res) => {
  
      let name = req.file.filename
      const imageTempPath = req.file.path;
      const ext = path.extname(req.file.originalname).toLowerCase();
      const targetPath = path.resolve(__dirname + `../../../../imgmegafr/appmega/src/assets/public/imagenes/${name}${ext}`);

      // Validate Extension
      if (ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif') {
        // you wil need the public/temp path or this will throw an error
        await fs.rename(imageTempPath, targetPath);
        const newImg = new Image({
          title: req.body.title,
          filename: name + ext,
          description: req.body.description,
          usuario: req.user._id
        });
        const imageSaved = await newImg.save();
        res.json({
          ok: true,
          message: 'image creada',
          usuario: req.user
        })
      } else {
        await fs.unlink(imageTempPath);
        res.json({ error: 'archivo no admitido' });
      }
     
    }


ctrl.update = async (req, res) => {

  let id = req.params.image_id;
  let body = req.body

  Crud.actualizar(usuario_model, id, body, req, res)

}

ctrl.like = async (req, res) => {
  let id = req.params.id
  const image = await Image.findById(id);
 
    if (!image.likes.includes({nickname: req.user.nickname})){
      image.likes.push({nickname: req.user.nickname, id: req.user._id});
      await image.save();
    }
    

      image.likes.sort()
  res.json({
        ok: true,
        message: 'like con exito',
        image
      })
};

ctrl.comment= async (req, res) => {
  let id = req.params.id
  const image = await Image.findById(id);
  const usuario = await usuarioModel.findById(req.user._id);

  image.comment.push({  usuario: usuario.nickname, img: usuario.image, comment: req.body.comment});
      await image.save();

    res.json({
      ok: true,
      message: 'comentario con exito',
      image,
      usuario
    })
 
};

ctrl.guardarComment = async (req, res) => {
  let body = new Comment({comment: req.body.comment,
  usuario: req.user._id});

  await body.save()

  res.json({
        ok: true,
        message: 'comentario guardado con exito',
      })

}

ctrl.remove = async (req, res) => {
  const image = await Image.findOne({filename: {$regex: req.params.image_id}});
  if (image) {
    await fs.unlink(path.resolve('./src/public/upload/' + image.filename));
    await Comment.deleteOne({image_id: image._id});
    await image.remove();
    res.json({
      ok: true,
      message: 'imagen eliminada'
    })
  } else {
    res.json({response: 'Bad Request.'})
  }
};

module.exports = ctrl;
