
const http = require('http')
const express = require('express')
const db = require('./db')
const api = require('./const/api')
const body = require('body-parser')
const cors = require('cors')
const jwt = require('express-jwt')


const server = express()
const user = require('./controllers/user');
const animais = require('./controllers/animais')
const endereco= require('./controllers/endereco')
server.use(body.json({ limit: '50mb' }))


server.use(cors({
    origin: '*',
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
}))


//user routers
server.delete('/api/user/:id', user.deleta);
server.get('/api/user/:id', user.find);
server.post('/api/user/create', user.cadatro);
server.post('/api/user/singUp', user.singup);
server.put('/api/user', user.edita);

//animais routers
server.get('/api/animal/home',animais.findHome); //ok
server.patch('/api/animal/address',animais.findAddress); //ok
server.patch('/api/animal/foto', animais.removeFoto);//ok
server.post('/api/animal/foto', animais.addFoto);//ok
server.patch('/api/animal/find', animais.findApproximate); //ok
server.put('/api/animal/foto', animais.updateFoto);//ok
server.get('/api/animal/foto/:id', animais.findFoto);//ok
server.get('/api/animal/fotos/:id', animais.findAllFotosId); //ok
server.post('/api/animal', animais.create); //ok
server.put('/api/animal', animais.update);//ok
server.get('/api/animal/:id', animais.find);//ok
server.delete('/api/animal/:id', animais.remove);//ok

// endereco routers
server.get('/api/endereco',endereco.findEstados);
server.get('/api/endereco/:sigla',endereco.findCIdade);

server.use(jwt({ secret: 'segredo', }))


db.connection.on('connected', () => {
    server.listen(api.api, function () {
        console.log('servidor rodando na porta:' + api.api);
    });
})