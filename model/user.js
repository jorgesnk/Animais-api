const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    nome:{type:String},
    cpf:{type:String},

})

module.exports={
    User
}