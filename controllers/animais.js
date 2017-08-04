const mongoose = require('mongoose')
const animaisSchema = require('../model/animais')
const UsuarioSchema = require('../model/user');
const User = mongoose.model('Usuario', UsuarioSchema.User);
const Animais = mongoose.model('animal', animaisSchema.animal);
const yields = require('express-yields');
const fs = require('fs');


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
const findAddress = function* (req, res) {
    const params = req.body;


    const user = yield User.find({ "endereco.estado": params.estado, "endereco.cidade": params.cidade }, { foto: 1, nome: 1, endereco: 1 })
    var retorno = [];

    for (var i = 0; i < user.length; i++) {

        var animal = yield Animais.find({ proprietario: user[i]._id, tipo: params.tipo }, { "fotos._id": 1, nome: 1 });
        var usuario = user[i]

        retorno.push({ animal, usuario: user[i] })

    }

    var saida = [];
    retorno.forEach(function (element) {
        if (element.animal[0]) {
            saida.push(element);
        }
    });



    res.send({ saida });



}
const findHome = function (req, res) {

    Animais.find({}, { _id: 1, proprietario: 1, 'fotos._id': 1, nome: 1, tipo: 1 })
        .populate('proprietario', 'nome foto endereco')
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.send(err);
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
    findAllFotosId,
    findHome,
    findAddress,
}