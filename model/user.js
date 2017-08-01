const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    nome: { type: String,require: true },
    email: { type: String, require: true },
    password: { type: String ,require: true},
    endereco: {
        logadouro: { type: String ,require: true},
        estado:{type:String,require: true},
        cidade: { type: String,require: true }, bairro: { type: String,require: true },
        cep: { type: String,require: true }, complemento: { type: String }
    },
    ativo: { type: Boolean },
    redefinirSenha: { type: Boolean },
    foto: { type: String }
})

module.exports = {
    User
}