const mongoose =require('mongoose');
const UsuarioSchema=require('../model/user');
const User = mongoose.model('Usuario',UsuarioSchema.User);


cadatro=function(req,res){
    User.create(req.body).then(data=>{
        res.send(data);
    })
}


module.exports ={
    cadatro
} 