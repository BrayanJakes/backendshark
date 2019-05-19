const usuarioModel = require('../models/usuario');  
const encrypt = require('bcryptjs');  
const jwt = require ('jsonwebtoken');  

const { SEED } = require('../config/config');

const LOGINCTRL = {};  // Create Object. We add Methods to it so We can use them OUTSIDE later

LOGINCTRL.login = async (req, res)=> {

  let body = req.body;

  usuarioModel.findOne({ email: body.email}, (err, user) => {

    if (err) {
      return res.json({
        ok: false,
        message: "Error al buscar usuario",
        err
      });
    }

    if (!user) {
      return res.json({
        ok: false,
        message: "Email Incorrecto",
        err
      });
    }

    if (!encrypt.compareSync(body.password, user.password)){
      return res.json({
        ok: false,
        message: "Contraseña invalida",
        err
      });
    }

    // Token
    user.password = null;
    let token = jwt.sign({user: user}, SEED, {expiresIn: 14400});  // 4 hours


    res.json({
      ok: true,
      message: 'Logeado',
      user,
      JWT: token
      
    });

  });
}


module.exports = LOGINCTRL;  // Exports the Object with all the Methods
