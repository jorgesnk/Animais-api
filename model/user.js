const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    nome: { type: String },
    email: { type: String, require: true },
    cpf: { type: String },
    password: { type: String },
    endereco: {
        logadouro: { type: String },
        estado:{type:String},
        cidade: { type: String }, bairro: { type: String },
        cep: { type: String }, complemento: { type: String }
    },
    ativo: { type: Boolean },
    redefinirSenha: { type: Boolean },
    foto: { type: String }
})

module.exports = {
    User
}