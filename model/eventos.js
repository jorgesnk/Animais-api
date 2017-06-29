const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const evento = new Schema({
    nome: { type: String },
    observcoes: { type: String },
    proprietario:{type:Schema.Types.ObjectId,ref:'Usuario'},
    animal:[{type:Schema.Types.ObjectId,ref:'animal'}],
    foto:[{ type: String }],

})

module.exports = {
    evento
}