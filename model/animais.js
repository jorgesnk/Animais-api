const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const animal = new Schema({
    nome: { type: String },
    proprietario:{type:Schema.Types.ObjectId,ref:'Usuario'},
    fotos:[{ foto:{type: String}}],
    tipo:{type:String}
})

module.exports = {
    animal
}