const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req,res,nex)=>{
  res.json(
    {name:'server',port:3000}
  )
})

const login = require('./routes/login');

app.use('/api/login',login);

app.listen(process.env.PORT || 3000, ()=>{
  console.log('Listening from port 3000');
})
