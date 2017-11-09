const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost/todo');
mongoose.connection.openUri(`${process.env.APPDB}`,(err)=>{
  if (err) {
    console.log(err);
  }
});

var Schema = mongoose.Schema;

var TodoSchema = new Schema({
    idUser      : {type: String},
    task        : {type: String},
    date        : {type: Date, default: Date.now },
    status      : {type: String, default: 'start'},
    // tags        : [{type: String}]
});

module.exports = mongoose.model('list', TodoSchema);
