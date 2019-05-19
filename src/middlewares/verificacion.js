const jwt = require ('jsonwebtoken');  // JSON WEB TOKEN
const { SEED } = require('../config/config');

exports.verifyToken = async (req, res, next) => {
  let token = req.query.token;
  jwt.verify(token, SEED, (err, decoded) => {
    if (err){
      return res.json({
        ok: false,
        message: "Token incorrecto!",
        err
      });
    }
    req.user = decoded.user;
    next();
  });
}