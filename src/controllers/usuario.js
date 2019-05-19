const jwt = require ('jsonwebtoken');  
const betcryp = require('bcryptjs');
const path = require('path');
const fs = require('fs-extra');
const crud = require('../config/crudmongo');
const usuario_model = require('../models/usuario');

const { SEED } = require('../config/config');

const ctrl = {};

const Crud = new crud();

ctrl.listar = async (req, res) => {
  

    let listado =  await modelo.find().skip(Number(req.query.desde || 0));
        
    await modelo.countDocuments({}, (err, count)=>{
       if(err){
           return res.json({
               ok:false,
               err
            })
       }
       listado.password = null;
        return res.json({
           ok:true,
           listado,
           contador: count
        })
    })
          
};

ctrl.lista = async (req, res) => {

    let id = req.params.id


    const listado =  await usuario_model.findById(id).exec({}, (err, solicitud)=>{
       if(err){
           return res.json({
               ok:false,
               err
            })
       }
        return res.json({
           ok:true,
           solicitud
        
           
        })
    })
          
};

ctrl.foto = async (req, res) => {
    let id = req.params.id

    let name = req.file.filename
    const imageTempPath = req.file.path;
    const ext = path.extname(req.file.originalname).toLowerCase();
    const targetPath = path.resolve(__dirname + `../../../../imgmegafr/appmega/src/assets/public/imgperfil/${name}${ext}`);

    // Validate Extension
    if (ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif') {
      // you wil need the public/temp path or this will throw an error
      await fs.rename(imageTempPath, targetPath);
      const usuario = await usuario_model.findById(id);
      let pathViejo = path.resolve(__dirname + `../../../../imgmegafr/appmega/src/assets/public/imgperfil/${usuario.image}`);
      if (fs.existsSync(pathViejo)) {
          await fs.unlink(pathViejo)
      }
      usuario.image = name + ext;
      
      await usuario.save();
      req.user.image = usuario.image;
      res.json({
        ok: true,
        message: 'image actualizada',
        usuario,
        imgUser: req.user.image
        
      })
    } else {
      await fs.unlink(imageTempPath);
      res.status(500).json({ error: 'archivo no admitido' });
    }

    
    //  if (usuario) {
  
        
    //  } else {
    //   res.json({
    //     ok: true,
    //     message: 'comentario sin exito'
    //   })
    //  }
  };

ctrl.agregar = async (req, res)=>{
  
    req.body.password = betcryp.hashSync(req.body.password, 10);

    const usuario = new usuario_model(req.body);

    Crud.agregar(usuario, req, res);
}


ctrl.actualizar = async (req, res)=> {
    if (req.body.password){
        req.body.password = betcryp.hashSync(req.body.password, 10);
    }
    
    let id = req.params.id;
    let body = req.body

    Crud.actualizar(usuario_model, id, body, req, res)
}

ctrl.eliminar = async (req, res)=>{
    let id = req.params.id;
    Crud.eliminar(usuario_model, id, req, res)
}


module.exports = ctrl