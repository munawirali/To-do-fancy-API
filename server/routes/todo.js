const express = require('express');
const router = express.Router();
const todo = require('../controller/todo');

router.get('/:token',todo.list);
router.post('/:token',todo.add);
router.put('/:token',todo.edit);
router.put('/done/:token',todo.setComplete);
router.delete('/:id',todo.delete);
// router.delete('/:token',(req,res)=>{
//   console.log('heehhshshs');
// });

module.exports = router;
