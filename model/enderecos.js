const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const endereco = new Schema({
estados:[{sigla:{Type:String},nome:{Type:String},cidades:[]}]
})

module.exports = {
    endereco
}