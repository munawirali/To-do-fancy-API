const login = require('../models/login');

class Login {
  static login(req,res,next){
    login.login(req.body)
    .then(data=>{
      res.status(200).json(data);
    })
    .catch(err=>{
      res.status(400).json(err)
    })
  }
}

module.exports = Login
