const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const animal = new Schema({
    nome: { type: String },
    proprietario:{type:Schema.Types.ObjectId,ref:'Usuario'},
    foto:[{ type: String }]
})

module.exports = {
    animal
}