const mongoose = require('mongoose');
const UsuarioSchema = require('../model/user');
const User = mongoose.model('Usuario', UsuarioSchema.User);
const jwt = require('jsonwebtoken');
const cript = require('../midiaware/cript')



cadatro = function (req, res) {

    var params = req.body;
    params.password = cript.crip(params.password);

    const user = User.find({ email: params.email }).then(data => {
        if (data[0] != null) {
            const err = {
                errorMEssage: 'Usuario ja cadastrado'
            }
            res.status(200);
            res.send(err)
            return;
        }
        const save = User.create(params).then(usaurio => {
            usaurio.password = "";
            const token = jwt.sign(usaurio, 'segredo');
            const retorno = { token: token, user: usaurio };
            res.send(retorno);
            res.status(200);
            return;
        }).catch(errorSave => {
            res.send(errorSave);
            res.status(400);
        })
    }).catch(errror => {
        res.status(400);
        res.send(errror)
    })
}

singup = function (req, res) {
    var params = req.body;
    const returnError = {
        message: 'Usuario ou senha invalido'
    }

    User.findOne({ email: params.email }).then(data => {
        data;
        if (!data) {
            res.send(returnError)
           
            return;
        }
        var pass = cript.desc(params.password, data.password);

        if (!pass) {
            res.send(returnError)
            return;
        }

        data.password = "";
        const token = jwt.sign(data, 'segredo');

        const retorno = {
            user: data,
            token: token
        }
        res.send(retorno);
    }).catch(err => {
        res.status(err)
        return;
    });

}

edita = function (req, res) {
    const params = req.body;
    const erroEdit = {
        message: 'error!'
    }
    if (params.password) {
        res.status(401)
        res.send(erroEdit)
        return;
    }
    if (params.password == "") {
        res.status(401)
        res.send(erroEdit)
        return;
    }

    User.update({ _id: params._id }, params).then(data => {
        res.send(data);
        res.status(200);
    })
}

deleta = function (req, res) {
    const id = req.params.id;

    User.remove({ _id: id }).then(data => {
        res.send(data);
        res.status(200);
    }).catch(err => {
        res.send(err);
        res.status(401)
    })

}

find = function (req, res) {
    const id = req.params.id;
   
    User.findById(id).then(data => {
        delete data.password;
        res.send(data);
        res.status(200);
    }).catch(err => {
        res.send(err);
        res.status(401)
    });


}

module.exports = {
    cadatro,
    singup,
    edita,
    deleta,
    find
} 