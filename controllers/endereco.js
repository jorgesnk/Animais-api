const mongoose = require('mongoose')
const enderecosSchema = require('../model/enderecos')
const Endereco = mongoose.model('endereco', enderecosSchema.endereco);


const findEstados = function (req, res) {
    Endereco.find({}, { "estados.sigla": 1 }).then(data => {
        res.send(data);
    })
}

const findCIdade = function (req, res) {
    const params = "'" + req.params.sigla + "'";
    var retorno;
    Endereco.find({ "estados.sigla": req.params.sigla }).then(data => {
        data[0].estados.forEach(function (element) {
            if (element.sigla == params) {
                retorno = element;
            }
        });

        res.send(retorno);
    })

}

module.exports = {
    findEstados,
    findCIdade
}