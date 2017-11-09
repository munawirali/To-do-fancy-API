const todo = require('../models/todo');
const jwt = require('jsonwebtoken');

class Todo {
  static list(req,res,next){
    let idUser = jwt.verify(req.params.token, process.env.APPSECRET);

    todo.find({
      idUser:idUser.id
    })
    .then(rows=>{
      // console.log(rows);
      res.status(200).json(rows);
    })
    .catch(err=>{
      res.status(400).json(err)
    })
  }
  static add(req,res,next){
    let idUser = jwt.verify(req.params.token, process.env.APPSECRET);
    // console.log('body====',req.body);
    todo.create({
      idUser:idUser.id,
      task:req.body.task,
      date:req.body.date
    })
    .then(rows=>{
      res.status(200).json(rows);
    })
    .catch(err=>{
      res.status(400).json(err)
    })
  }
  static edit(req,res,next){
    let idUser = jwt.verify(req.params.token, process.env.APPSECRET);
    todo.findOneAndUpdate({
      _id:req.body._id
    },{
      idUser:idUser.id,
      task:req.body.task,
      date:req.body.date,
    })
    // todo.findOne({
    //   _id:req.body._id
    // })
    .then(rows=>{
      console.log(rows);
      res.status(200).json({
        "message":"updating data succesfull",
        "data":rows
      });
    })
    .catch(err=>{
      res.status(400).json(err)
    })
  }
  static setComplete(req,res,next){
    let idUser = jwt.verify(req.params.token, process.env.APPSECRET);
    todo.findOneAndUpdate({
      _id:req.body._id
    },{
      status:req.body.status
    })
    .then(rows=>{
      res.status(200).json({
        "message":"updating data succesfull",
        "data":rows
      });
    })
    .catch(err=>{
      res.status(400).json(err)
    })
  }
  static delete(req,res,next){
    // console.log('masuk sini');
    todo.findOneAndRemove({_id:req.params.id})
    .then(rows=>{
      // console.log('masukk setelah remove');
      res.status(200).json({
        "message":"deleteting data succesfull",
        "data":rows
      });
    })
    .catch(err=>{
      res.status(400).json(err)
    })
  }
}

module.exports = Todo
