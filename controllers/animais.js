const mongoose = require('mongoose')
const animaisSchema = require('../model/animais')
const Animais = mongoose.model('animal', animaisSchema.animal);

const create = function (req, res) {
    const params = req.body;
    if (!params.nome && params.proprietario) {
        res.status(404);
        const errorUser = {
            message: "Nome obrigatorio"
        }
        res.send(errorUser);
        return;
    }

    if (params.fotos.length > 5) {
        res.status(404);
        const erroFoto = {
            message: "Numero de fotos exedido"
        }
        res.send(erroFoto);
        return;

    }
    if (params.fotos.length < 1) {
        res.status(404);
        const ErroLengthFoto = {
            message: "insira ao menos uma foto"
        }
        res.send(erroFoto);
        return;

    }

    Animais.create(params).then(data => {
        const retorno = { _id: data._id }
        res.send(retorno);
        res.status(200);
    }).catch(err => {
        res.send(err),
            res.status(500);
    })

}
const find = function (req, res) {
    const id = req.params.id;
    Animais.findById(id, { nome: 1, proprietario: 1 }).then(data => {
        res.send(data)
        res.status(200);
    }).catch(err => {
        res.send(err);
        res.status(500);
    })
}
const findApproximate = function (req, res) {
    const params = req.body;
    if (params.filter.length > 2) {
        const tamonhoError = {
            messageErro: "Numero de variaveis exedidos"
        }

        res.send(tamonhoError);
        res.status(500);
        return;
    }


    var tojson = '{"' + params.filter[0] + '":{"$regex":' + '"' + params.filter[1] + '"}}'
    var transform = JSON.parse(tojson);

    // const trasnformJson = JSON.parse(toJson);

    Animais.find(transform, { nome: 1, proprietario: 1 }).then(data => {
        res.send(data);
        res.status(200);
    })
}

const update = function (req, res) {
    const params = req.body;
    console.log(params);
    Animais.update({ _id: params._id }, params).then(data => {
        res.send(data);
        res.status(200);
    }).catch(err => {
        res.send(err)
        res.status(500)
    })
}

const updateFoto = function (req, res) {
    const params = req.body;
    Animais.update({ 'fotos._id': params._id },
        { '$set': { 'fotos.$.foto': params.foto } }).then(data => {
            res.send(data);
            res.status(200);
        }).catch(err => {
            res.send(err);
            res.status(500);
        })
}

const addFoto = function (req, res) {
    const params = req.body;

    Animais.find({ _id: params._id }, { fotos: 1 }).then(buca => {
        if (buca[0].fotos.length >= 5) {
            const retorno = { message: 'numero maximo de fotos' }
            res.send(retorno);
            res.status(500);
            return
        }
        Animais.update({ _id: params._id }, {
            '$push': {
                'fotos': { foto: params.foto }
            }
        }).then(data => {
            res.send(data);
            res.status(200);
        }).catch(err => {
            res.send(err)
            res.status(500)
        }).catch(buscaErr => {
            res.send(buscaErr)
            res.status(500);
        })

    })






}

const removeFoto = function (req, res) {
    var params = req.body;
    Animais.update({ _id: params._id }, {
        '$pull': {
            'fotos': { _id: params.foto_id }
        }
    }).then(data => {
        res.send(data);
        res.status(200);
    }).catch(err => {
        res.send(err);
        res.status(500);
    })

}

const remove = function (req, res) {
    const params = req.params.id;
    Animais.remove({ _id: params }).then(data => {
        res.send(data);
        res.status(200);
    }).catch(err => {
        res.send(err);
        res.status(500)
    })
}


const findFoto = function (req, res) {
    const params = req.params.id;
    Animais.find({ 'fotos._id': params }, { 'fotos.$': params }).then(data => {
        res.send(data);
        res.status(200);
    }).catch(err => {
        res.send(err);
        res.status(500);

    })
}

const findAllFotosId = function (req, res) {
    var params = req.params.id
    Animais.findById(params, { 'fotos._id': 1 }).then(data => {
        res.send(data);
        res.status(200)
    }).catch(err => {
        res.send(err)
        res.status(500)
    })
}

module.exports = {
    create,
    find,
    findApproximate,
    update,
    updateFoto,
    addFoto,
    removeFoto,
    remove,
    findFoto,
    findAllFotosId
}